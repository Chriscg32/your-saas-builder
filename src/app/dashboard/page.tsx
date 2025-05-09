// src/app/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// --- 1) Define proper Assessment types ---
interface AssessmentIssue {
  id: string;
  severity: "high" | "medium" | "low";
  description: string;
  recommendation: string;
  zerobudgetSolution: string;
}

interface AssessmentResult {
  timestamp: string;
  riskScore: number;
  issues: AssessmentIssue[];
}

// Sample data for agents
const agents = [
  { id: 1, name: "Legal Agent", status: "active", icon: "/legal-agent.png", lastActivity: "Completed risk assessment (2 mins ago)", taskCount: 42, efficiency: 97 },
  { id: 2, name: "Business Advisor", status: "active", icon: "/ceo-agent.png", lastActivity: "Market analysis for eco-friendly trends (5 mins ago)", taskCount: 28, efficiency: 94 },
  { id: 3, name: "Design Analysis Agent", status: "active", icon: "/design-agent.png", lastActivity: "Generated design parameters for Acme Corp (1 min ago)", taskCount: 67, efficiency: 91 },
  { id: 4, name: "Production Planning Agent", status: "idle", icon: "/production-agent.png", lastActivity: "Optimized production workflow for batch #2234 (15 mins ago)", taskCount: 53, efficiency: 89 }
];

// Recent activities
const recentActivities = [
  { id: 1, agent: "Legal Agent", action: "Risk Assessment Completed", details: "Identified 2 potential compliance issues with recent marketing materials.", timestamp: "Today, 10:23 AM", severity: "medium" },
  { id: 2, agent: "Business Advisor", action: "Strategy Recommendation", details: "Suggested focusing on premium product tier based on market analysis.", timestamp: "Today, 9:45 AM", severity: "low" },
  { id: 3, agent: "Design Analysis Agent", action: "New Design Created", details: "Generated 3 concepts for Acme Corp's eco-friendly t-shirt campaign.", timestamp: "Today, 9:32 AM", severity: "none" },
  { id: 4, agent: "Legal Agent", action: "IP Conflict Detected", details: "Potential trademark issue identified in design #RT-7829. Suggested modifications provided.", timestamp: "Today, 9:17 AM", severity: "high" },
  { id: 5, agent: "Production Planning Agent", action: "Production Schedule Optimized", details: "Rearranged production queue for 15% improvement in throughput.", timestamp: "Today, 8:50 AM", severity: "none" }
];

// Active design projects
const activeProjects = [
  { id: "PRJ-2301", client: "Acme Corporation", title: "Eco-friendly Corporate T-shirts", status: "In Production", progress: 75, thumbnail: "/acme-tshirt-preview.jpg", dueDate: "Jun 15, 2025" },
  { id: "PRJ-2302", client: "Green Earth Foundation", title: "Ocean Conservation Campaign", status: "Design Review", progress: 40, thumbnail: "/green-earth-preview.jpg", dueDate: "Jun 20, 2025" },
  { id: "PRJ-2303", client: "Tech Innovators Inc", title: "Annual Conference Merchandise", status: "Legal Review", progress: 25, thumbnail: "/tech-innovators-preview.jpg", dueDate: "Jun 30, 2025" }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showRiskAssessment, setShowRiskAssessment] = useState<boolean>(false);
  const [assessmentProgress, setAssessmentProgress] = useState<number>(0);
  // --- 2) Typed state hook ---
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const runRiskAssessment = () => {
    setShowRiskAssessment(true);
    setAssessmentProgress(0);
    const interval = setInterval(() => {
      setAssessmentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAssessmentResults({
            timestamp: new Date().toISOString(),
            riskScore: 78,
            issues: [
              { id: "IP-001", severity: "high", description: "Potential trademark infringement in design #RT-7829", recommendation: "Modify wave pattern to increase uniqueness", zerobudgetSolution: "Use free alternative design elements from public domain sources" },
              { id: "DP-002", severity: "medium", description: "Customer data handling procedures may not comply with GDPR", recommendation: "Update privacy policy and data processing workflows", zerobudgetSolution: "Implement free GDPR compliance templates" },
              { id: "SC-003", severity: "low", description: "Website cookie consent mechanism is outdated", recommendation: "Implement new cookie consent UI", zerobudgetSolution: "Use open-source cookie consent solution" }
            ]
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ... rest of header and tabs unchanged ... */}
      {/* Risk Assessment Modal */}
      {showRiskAssessment && (
        <RiskModal
          progress={assessmentProgress}
          results={assessmentResults}
          onClose={() => setShowRiskAssessment(false)}
        />
      )}
      {/* Main content: metrics, overview, agents, designs, etc. */}
    </div>
  );
}

// Extracted RiskModal, TabButton, MetricCard components below...

function RiskModal({ progress, results, onClose }: { progress: number; results: AssessmentResult | null; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* ... modal contents using `progress` and `results` ... */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-md whitespace-nowrap transition-colors ${
        active ? "bg-white text-blue-600" : "text-white/80 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function MetricCard({ title, value, change, description, icon, color }: { title: string; value: string; change: string; description: string; icon: string; color: string }) {
  // ... same as before but ensure type definitions ...
  return <div className="bg-white rounded-xl shadow-sm p-6">{/* ... */}</div>;
}
