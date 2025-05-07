"use client";

import React, { useState, FormEvent } from 'react';

// --- 1. Define your Insights interface ---
interface Insights {
  businessSummary: string;
  opportunityScore: number;
  strategies: {
    title: string;
    description: string;
    recommendations: string[];
  }[];
  executionPlan: {
    phase1: string;
    phase2: string;
    phase3: string;
  };
  competitiveAdvantage: string;
  marketTrends: string[];
}

// Business strategy categories
const STRATEGY_CATEGORIES = [
  "Market Disruption",
  "Vertical Integration",
  "First Principles Thinking",
  "Ambitious Goal Setting",
  "Capital Allocation",
  "Talent Acquisition",
  "Risk Management"
];

export default function BusinessAdvisor() {
  const [businessDescription, setBusinessDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [loading, setLoading] = useState(false);

  // --- 2. Typed state for results ---
  const [results, setResults] = useState<Insights | null>(null);

  // --- 3. Typed submit handler ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Generate strategic insights based on input
      const insights = generateStrategicInsights(businessDescription, industry, challenge);
      setResults(insights);
      setLoading(false);
    }, 2000);
  };

  // --- 4. Typed insights generator ---
  const generateStrategicInsights = (
    business: string,
    industry: string,
    challenge: string
  ): Insights => {
    // Select 3 random strategy categories
    const selectedCategories = [...STRATEGY_CATEGORIES]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Static strategy definitions (same as before)
    const strategiesMap: Record<string, Insights['strategies'][number]> = {
      "Market Disruption": {
        title: "Market Disruption Strategy",
        description: "Identify and exploit inefficiencies in the current market structure.",
        recommendations: [
          `Analyze ${industry} supply chain for inefficiencies that can be eliminated through technology`,
          "Consider vertical integration to control key components of your value chain",
          "Invest heavily in R&D to create products that make current solutions obsolete"
        ]
      },
      "Vertical Integration": {
        title: "Vertical Integration Strategy",
        description: "Control multiple stages of your industry's value chain to increase efficiency and quality.",
        recommendations: [
          "Identify critical dependencies in your supply chain that create bottlenecks",
          "Acquire or develop in-house capabilities for key components",
          "Streamline operations by eliminating intermediaries between you and your customers"
        ]
      },
      "First Principles Thinking": {
        title: "First Principles Approach",
        description: "Break down complex problems into their fundamental elements and rebuild from scratch.",
        recommendations: [
          `Question all assumptions about how ${industry} 'should' operate`,
          "Calculate the theoretical limits of what's physically possible in your domain",
          "Design solutions from the ground up rather than iterating on existing approaches"
        ]
      },
      "Ambitious Goal Setting": {
        title: "Ambitious Goal Framework",
        description: "Set seemingly impossible targets to drive innovation and breakthrough thinking.",
        recommendations: [
          "Establish a 10-year vision that seems almost unattainable",
          "Break down long-term goals into concrete 3-month objectives",
          "Create public commitments to ambitious timelines to create productive pressure"
        ]
      },
      "Capital Allocation": {
        title: "Strategic Capital Allocation",
        description: "Prioritize resources toward high-leverage opportunities with exponential return potential.",
        recommendations: [
          "Identify the 20% of initiatives that will drive 80% of future value",
          "Ruthlessly defund projects that don't align with core strategic objectives",
          "Maintain significant cash reserves for opportunistic acquisitions during market downturns"
        ]
      },
      "Talent Acquisition": {
        title: "Elite Talent Strategy",
        description: "Build teams of exceptional individuals who can execute at extraordinary levels.",
        recommendations: [
          "Implement rigorous hiring processes that filter for problem-solving ability",
          "Create compensation structures that heavily reward exceptional performance",
          "Eliminate bureaucratic layers that slow down decision-making"
        ]
      },
      "Risk Management": {
        title: "Calculated Risk Approach",
        description: "Take significant but carefully calculated risks to achieve outsized returns.",
        recommendations: [
          "Identify existential risks and implement robust mitigation strategies",
          "Allocate 10-20% of resources to high-risk, high-reward initiatives",
          "Create fast feedback loops to quickly detect and correct course when risks materialize"
        ]
      }
    };

    const opportunityScore = 65 + Math.floor(Math.random() * 25);

    return {
      businessSummary: `Analysis for ${business} in the ${industry} industry, facing challenges around "${challenge}"`,
      opportunityScore,
      strategies: selectedCategories.map(cat => strategiesMap[cat]),
      executionPlan: {
        phase1: "Foundation Building (Months 1-3)",
        phase2: "Accelerated Implementation (Months 4-9)",
        phase3: "Market Dominance Strategy (Months 10-18)"
      },
      competitiveAdvantage: `Your unique position in the ${industry} market can be leveraged by focusing on technological innovation and operational efficiency, creating a sustainable competitive advantage that's difficult for incumbents to replicate.`,
      marketTrends: [
        "Increasing consumer demand for sustainable products",
        "Shift toward digital-first business models",
        "Growing importance of direct-to-consumer channels",
        "Rising emphasis on data-driven decision making"
      ]
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* …the rest of your JSX (unchanged)… */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* … */}
      </form>

      {results && (
        // render based on results: now fully typed
        <pre>{JSON.stringify(results, null, 2)}</pre>
      )}
    </div>
  );
}
