export default function SampleReports() {
  const sampleReports = [
    {
      company: "TSMC",
      industry: "Semiconductor Manufacturing",
      location: "Taiwan",
      date: "January 2025",
      highlights: [
        "15 detailed incident reports with timelines",
        "Safety violations and regulatory penalties",
        "Supply chain dependency analysis",
        "Geopolitical risk assessment (Taiwan Strait)"
      ],
      findings: "8 regulatory violations • 4 safety incidents • 3 supply chain risks",
      pages: 47
    },
    {
      company: "Bosch GmbH",
      industry: "Automotive Supplier",
      location: "Germany",
      date: "December 2024",
      highlights: [
        "18 detailed incident reports with timelines",
        "Labor relations and workplace safety issues",
        "Product safety recalls and timeline reconstruction",
        "Regulatory compliance across multiple markets"
      ],
      findings: "5 labor incidents • 4 product recalls • 6 regulatory issues",
      pages: 52
    },
    {
      company: "Maersk",
      industry: "Logistics & Shipping",
      location: "Denmark",
      date: "November 2024",
      highlights: [
        "14 detailed incident reports with timelines",
        "Maritime safety violations and penalties",
        "Operational disruptions and timeline analysis",
        "Cybersecurity incidents (NotPetya impact)"
      ],
      findings: "6 safety violations • 3 cyber incidents • 4 operational disruptions",
      pages: 43
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-bold text-blue-700">SAMPLE REPORTS</span>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          See What You Get
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real comprehensive reports we've generated for major global companies
        </p>
      </div>

      {/* Sample Reports Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {sampleReports.map((report, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6">
              <h3 className="text-2xl font-black mb-2">{report.company}</h3>
              <p className="text-sm text-blue-100">{report.industry}</p>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {report.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {report.date}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Report Highlights</h4>
                <ul className="space-y-2">
                  {report.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">KEY FINDINGS</p>
                <p className="text-sm text-gray-700 mb-4">{report.findings}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">{report.pages} pages</span>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                    ✓ Delivered in 1hr
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <button className="w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 group-hover:underline">
                View Sample Excerpt
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-8 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">What Makes Our Reports Different</h3>
          <p className="text-gray-600">Enterprise-grade vendor due diligence at scale</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Timeline Reconstruction</h4>
            <p className="text-sm text-gray-600">We connect the dots others miss - showing how incidents evolve over years</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Multi-Source Verification</h4>
            <p className="text-sm text-gray-600">Every finding cross-referenced across regulatory, legal, news, and ESG databases</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Comprehensive Coverage</h4>
            <p className="text-sm text-gray-600">Financial, regulatory, operational, and reputational risks in one report</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-4">
            <strong className="text-gray-900">Used by:</strong> Procurement teams at F500 companies • Private equity due diligence • Risk management departments
          </p>
          <a
            href="#assessment-form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Your Report
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
