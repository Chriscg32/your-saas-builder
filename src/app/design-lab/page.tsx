"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample design templates
const designTemplates = [
  {
    id: 1,
    name: "Modern Minimalist",
    category: "T-Shirt",
    thumbnail: "/modern-minimalist-thumb.jpg",
    preview: "/modern-minimalist-preview.jpg",
    variants: [
      { color: "Black", hex: "#000000", preview: "/modern-minimalist-black.jpg" },
      { color: "White", hex: "#FFFFFF", preview: "/modern-minimalist-white.jpg" },
      { color: "Navy", hex: "#000080", preview: "/modern-minimalist-navy.jpg" }
    ]
  },
  {
    id: 2,
    name: "Ocean Conservation",
    category: "T-Shirt",
    thumbnail: "/ocean-conservation-thumb.jpg",
    preview: "/ocean-conservation-preview.jpg",
    variants: [
      { color: "Blue", hex: "#0077b6", preview: "/ocean-conservation-blue.jpg" },
      { color: "Teal", hex: "#20b2aa", preview: "/ocean-conservation-teal.jpg" }
    ]
  },
  {
    id: 3,
    name: "Eco Warrior",
    category: "Hoodie",
    thumbnail: "/eco-warrior-thumb.jpg",
    preview: "/eco-warrior-preview.jpg",
    variants: [
      { color: "Green", hex: "#2e8b57", preview: "/eco-warrior-green.jpg" },
      { color: "Brown", hex: "#8b4513", preview: "/eco-warrior-brown.jpg" }
    ]
  },
  {
    id: 4,
    name: "Tech Conference",
    category: "Cap",
    thumbnail: "/tech-conference-thumb.jpg",
    preview: "/tech-conference-preview.jpg",
    variants: [
      { color: "Black", hex: "#000000", preview: "/tech-conference-black.jpg" },
      { color: "Gray", hex: "#808080", preview: "/tech-conference-gray.jpg" }
    ]
  }
];

// Design categories
const categories = [
  "All", "T-Shirt", "Hoodie", "Cap", "Bag", "Mug"
];

export default function DesignLab() {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [customizationText, setCustomizationText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [designRequest, setDesignRequest] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [designResults, setDesignResults] = useState(null);
  const [showLegalReview, setShowLegalReview] = useState(false);
  const [legalReviewComplete, setLegalReviewComplete] = useState(false);
  const [legalIssues, setLegalIssues] = useState(null);
  
  const fileInputRef = useRef(null);
  
  const filteredTemplates = activeCategory === "All" 
    ? designTemplates 
    : designTemplates.filter(template => template.category === activeCategory);
    
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedVariant(template.variants[0]);
  };
  
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const processDesignRequest = () => {
    if (!designRequest.trim()) return;
    
    setIsProcessing(true);
    setProcessingStep(0);
    setProcessingComplete(false);
    
    // Simulate processing steps
    const timer1 = setTimeout(() => {
      setProcessingStep(1);
      
      const timer2 = setTimeout(() => {
        setProcessingStep(2);
        
        const timer3 = setTimeout(() => {
          setProcessingStep(3);
          
          const timer4 = setTimeout(() => {
            setProcessingComplete(true);
            setDesignResults({
              requestId: "REQ-" + Math.floor(Math.random() * 10000),
              concepts: [
                {
                  id: "CONCEPT-1",
                  name: "Concept 1: Eco-Minimalist",
                  description: "A clean, minimalist design emphasizing environmental themes with subtle earth tones.",
                  preview: "/concept-1-preview.jpg"
                },
                {
                  id: "CONCEPT-2",
                  name: "Concept 2: Bold Statement",
                  description: "High contrast design with powerful typography and striking imagery.",
                  preview: "/concept-2-preview.jpg"
                },
                {
                  id: "CONCEPT-3",
                  name: "Concept 3: Artistic Approach",
                  description: "Watercolor-inspired aesthetic with flowing organic shapes and gradients.",
                  preview: "/concept-3-preview.jpg"
                }
              ]
            });
          }, 2000);
          
          return () => clearTimeout(timer4);
        }, 3000);
        
        return () => clearTimeout(timer3);
      }, 2000);
      
      return () => clearTimeout(timer2);
    }, 2000);
    
    return () => clearTimeout(timer1);
  };
  
  const runLegalReview = () => {
    setShowLegalReview(true);
    setLegalReviewComplete(false);
    
    // Simulate legal review process
    setTimeout(() => {
      setLegalReviewComplete(true);
      setLegalIssues([
        {
          severity: "medium",
          element: "Wave Logo",
          issue: "Similar to registered trademark of Ocean Conservation Inc.",
          recommendation: "Modify wave pattern to increase uniqueness"
        }
      ]);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Design Lab Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Design Lab</h1>
              <p className="text-blue-100">Create, customize, and validate your designs</p>
            </div>
          </div>
          
          {/* Design Lab Navigation Tabs */}
          <div className="mt-8 flex space-x-2 overflow-x-auto pb-1">
            <TabButton active={activeTab === "create"} onClick={() => setActiveTab("create")}>
              Create Design
            </TabButton>
            <TabButton active={activeTab === "templates"} onClick={() => setActiveTab("templates")}>
              Templates
            </TabButton>
            <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")}>
              Upload Design
            </TabButton>
            <TabButton active={activeTab === "history"} onClick={() => setActiveTab("history")}>
              Design History
            </TabButton>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "create" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">AI-Powered Design Creation</h2>
              <p className="text-gray-600 mb-6">
                Describe your design needs, and our AI agents will collaborate to create custom design concepts.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="designRequest" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe your design needs in detail
                  </label>
                  <textarea
                    id="designRequest"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={designRequest}
                    onChange={(e) => setDesignRequest(e.target.value)}
                    placeholder="E.g., I need a t-shirt design for an ocean conservation campaign targeted at young adults. The design should include wave imagery and use blue and teal colors. The message should emphasize ocean protection."
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={processDesignRequest}
                    disabled={isProcessing || !designRequest.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : "Generate Design Concepts"}
                  </button>
                </div>
              </div>
              
              {isProcessing && !processingComplete && (
                <div className="mt-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-bold text-lg mb-4">Processing Design Request</h3>
                  
                  <div className="space-y-4">
                    <ProcessingStep
                      step={1}
                      title="Business Analysis"
                      description="CEO Agent is evaluating business opportunity and strategic alignment"
                      active={processingStep >= 1}
                      completed={processingStep > 1}
                    />
                    <ProcessingStep
                      step={2}
                      title="Design Parameter Generation"
                      description="Design Analysis Agent is creating parameters based on your request"
                      active={processingStep >= 2}
                      completed={processingStep > 2}
                    />
                    <ProcessingStep
                      step={3}
                      title="Concept Creation"
                      description="Creating initial design concepts based on parameters"
                      active={processingStep >= 3}
                      completed={processingStep > 3}
                    />
                  </div>
                </div>
              )}
              
              {processingComplete && designResults && (
                <div className="mt-8">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="font-bold text-xl">Design Concepts</h3>
                    <p className="text-gray-600">Request ID: {designResults.requestId}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {designResults.concepts.map((concept) => (
                      <div key={concept.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="h-64 bg-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold">{concept.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{concept.description}</p>
                          <div className="mt-4 flex justify-between">
                            <button 
                              onClick={runLegalReview}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              Legal Review
                            </button>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                              Select & Customize
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === "templates" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Design Templates</h2>
              
              <div className="flex space-x-2 overflow-x-auto pb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                      activeCategory === category 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    onClick={() => handleTemplateSelect(template)}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id 
                        ? "border-blue-600 shadow-md" 
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedTemplate && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Customize Template</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center relative">
                      <div className="text-gray-400 flex flex-col items-center">
                        <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>Design Preview</p>
                      </div>
                      
                      {customizationText && (
                        <div 
                          className="absolute text-2xl font-bold text-white drop-shadow-lg"
                          style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                        >
                          {customizationText}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color Variants
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {selectedTemplate.variants.map((variant) => (
                            <button
                              key={variant.color}
                              onClick={() => setSelectedVariant(variant)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                selectedVariant?.color === variant.color 
                                  ? "border-blue-600" 
                                  : "border-transparent"
                              }`}
                              style={{ backgroundColor: variant.hex }}
                              title={variant.color}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="customText" className="block text-sm font-medium text-gray-700 mb-1">
                          Custom Text
                        </label>
                        <input
                          type="text"
                          id="customText"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={customizationText}
                          onChange={(e) => setCustomizationText(e.target.value)}
                          placeholder="Add your custom text"
                        />
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-bold mb-2">Additional Options</h3>
                        <div className="space-y-2">
                          <button 
                            onClick={runLegalReview}
                            className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            <span className="font-medium">Run Legal Review</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <button className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                            <span className="font-medium">Export to Production</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "upload" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Upload Your Design</h2>
              <p className="text-gray-600 mb-6">
                Upload your own design for legal review and production planning.
              </p>
              
              <div 
                onClick={handleFileUpload}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={() => runLegalReview()}
                />
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={runLegalReview}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Run Legal Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legal Review Modal */}
      {showLegalReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Legal Review</h2>
                <button 
                  onClick={() => setShowLegalReview(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {!legalReviewComplete ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-700">Legal Agent is analyzing your design...</p>
                  <p className="text-sm text-gray-500 mt-2">Checking for intellectual property issues, trademark conflicts, and content compliance.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Legal Review Complete</h3>
                      <p className="text-gray-500">1 potential issue found</p>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-3">Identified Issues</h4>
                  <div className="space-y-4 mb-6">
                    {legalIssues.map((issue, index) => (
                      <div 
                        key={index} 
                        className={`border-l-4 pl-4 py-2 ${
                          issue.severity === 'high' 
                            ? 'border-red-500 bg-red-50' 
                            : issue.severity === 'medium'
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex justify-between">
                          <h5 className="font-bold">{issue.element}</h5>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            issue.severity === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : issue.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{issue.issue}</p>
                        <div className="mt-2 bg-white p-2 rounded border border-gray-200">
                          <p className="text-sm font-medium text-gray-800">Recommendation:</p>
                          <p className="text-sm text-gray-600">{issue.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setShowLegalReview(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Apply Recommendations
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Tab Button Component
function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-md whitespace-nowrap transition-colors ${
        active 
          ? "bg-white text-blue-600" 
          : "text-white/80 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

// Processing Step Component
function ProcessingStep({ step, title, description, active, completed }) {
  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
        completed 
          ? "bg-green-500" 
          : active 
            ? "bg-blue-500" 
            : "bg-gray-300"
      }`}>
        {completed ? (
          <svg className="h-
# Continue creating the Design Lab component
$designLabContent += @'
5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className="text-white text-sm font-medium">{step}</span>
        )}
      </div>
      <div>
        <h4 className={`font-medium ${active ? "text-gray-900" : "text-gray-500"}`}>{title}</h4>
        <p className={`text-sm ${active ? "text-gray-600" : "text-gray-400"}`}>{description}</p>
      </div>
    </div>
  );
}
