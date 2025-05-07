#!/usr/bin/env bash
set -e

# 1) Install required dev-deps
npm install --save-dev @cloudflare/next-on-pages wrangler

# 2) Patch src/app/dashboard/page.tsx: add interface + strongly-typed useState
PATCH_DASHBOARD=$(cat <<'EOF'
*** Begin Patch
*** Update File: src/app/dashboard/page.tsx
@@
-const [assessmentResults, setAssessmentResults] = useState(null);
+// 1) Define the shape of your results
+interface AssessmentResult {
+  timestamp: string;
+  riskScore: number;
+  issues: { title: string; description: string }[];
+}
+
+// 2) Strongly-type your state
+const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
*** End Patch
EOF
)
echo "$PATCH_DASHBOARD" | patch -p0

# 3) Patch package.json scripts
PATCH_PKG=$(cat <<'EOF'
*** Begin Patch
*** Update File: package.json
@@ "scripts": {
-   "dev": "next dev",
-   "build": "next build",
-   "deploy": "npx @cloudflare/next-on-pages@latest",
+   "dev": "next dev",
+   "build": "next build",
+   "deploy": "next-on-pages",
+   "deploy:cf": "wrangler pages deploy . --project-name=your-saas-builder --branch=main",
*** End Patch
EOF
)
echo "$PATCH_PKG" | patch -p0

# 4) Patch wrangler.toml to include pages_build_output_dir
PATCH_WRANGLER=$(cat <<'EOF'
*** Begin Patch
*** Update File: wrangler.toml
@@ [site]
-  entry-point = "workers-site"
+entry-point = "workers-site"
+
+# tell Pages where your static build lives:
+pages_build_output_dir = ".vercel/output/static"
*** End Patch
EOF
)
echo "$PATCH_WRANGLER" | patch -p0

# 5) Install & rebuild
npm ci
npm run build

echo
echo "✅ Patches applied. You can now deploy with:"
echo "   npm run deploy     # uses next-on-pages"
echo "   npm run deploy:cf  # wraps wrangler pages deploy"
