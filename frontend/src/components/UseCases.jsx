const USE_CASES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Third-Party Risk Assessment",
    description: "Automated due diligence on vendors, suppliers, contractors, and service providers",
    metrics: ["Risk Scoring", "Compliance Status", "Continuous Monitoring"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Cybersecurity Risk",
    description: "Security posture assessment, breach history, and vulnerability exposure analysis",
    metrics: ["Security Incidents", "Threat Intelligence", "Attack Surface"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Vendor Financial Health",
    description: "Financial stability assessment to prevent supply chain disruptions",
    metrics: ["Credit Risk", "Payment Patterns", "Business Continuity"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Regulatory Compliance",
    description: "Track compliance with SEC, GDPR, SOX, DORA, and industry regulations",
    metrics: ["Compliance Status", "Regulatory Changes", "Audit Readiness"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Geopolitical Risk",
    description: "Sanctions screening, trade restrictions, and political instability monitoring",
    metrics: ["Sanctions Lists", "Trade Compliance", "Country Risk"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Supply Chain Disruption",
    description: "Real-time alerts on supplier operational risks and alternative sourcing",
    metrics: ["Disruption Events", "Dependency Analysis", "Risk Mitigation"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "ESG & Sustainability",
    description: "Environmental, social, and governance risk across your partner network",
    metrics: ["Carbon Footprint", "Labor Standards", "Ethics Violations"]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Continuous Monitoring",
    description: "Automated ongoing surveillance of all third-party relationships",
    metrics: ["Real-Time Alerts", "Risk Score Changes", "Portfolio View"]
  }
];

const INDUSTRIES = [
  "Manufacturing", "Technology", "Healthcare", "Financial Services",
  "Aerospace & Defense", "Energy", "Automotive", "Pharmaceuticals",
  "Retail", "Logistics"
];

export default function UseCases() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 animate-fade-in">
      {/* Divider */}
      <div className="relative mb-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Coverage
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          End-to-end risk assessment across all business relationships
        </p>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {USE_CASES.map((useCase, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="card hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl text-blue-700 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {useCase.icon}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {useCase.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {useCase.description}
            </p>
            <div className="space-y-1.5">
              {useCase.metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="font-medium">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Industries Section */}
      <div className="relative overflow-hidden card bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-100">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-4 border border-blue-200">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-bold text-blue-700">Industry Coverage</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Serving Critical Industries
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by leaders in high-stakes sectors where risk intelligence is mission-critical
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.03}s` }}
                className="px-4 py-2 bg-white/90 backdrop-blur border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 animate-fade-in"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
