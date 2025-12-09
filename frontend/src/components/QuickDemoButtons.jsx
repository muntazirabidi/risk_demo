// Featured companies with full reports available
const FEATURED_COMPANIES = [
  {
    name: 'Palantir Technologies',
    industry: 'Data Analytics & AI',
    location: 'United States',
    hasFullReport: true,
    reportUrl: '/reports/palantir-report.html',
    description: 'Complete 5-pillar due diligence report'
  },
  {
    name: 'Plug Power',
    industry: 'Clean Energy & Hydrogen',
    location: 'United States',
    hasFullReport: true,
    reportUrl: '/reports/plugpower-report.html',
    description: 'Supplier ecosystem & risk analysis'
  },
];

// Supplier/Vendor focused demo companies across key industries
const DEMO_COMPANIES = [
  { name: 'TSMC', industry: 'Semiconductor Manufacturing', location: 'Taiwan' },
  { name: 'Foxconn', industry: 'Electronics Manufacturing', location: 'Taiwan' },
  { name: 'Johnson & Johnson', industry: 'Pharmaceuticals & Medical Devices', location: 'United States' },
  { name: 'Siemens', industry: 'Industrial Manufacturing', location: 'Germany' },
  { name: 'BASF', industry: 'Chemicals & Materials', location: 'Germany' },
  { name: 'Caterpillar', industry: 'Heavy Equipment Manufacturing', location: 'United States' },
  { name: 'Honeywell', industry: 'Industrial Technology', location: 'United States' },
  { name: 'Accenture', industry: 'IT Services & Consulting', location: 'Ireland' },
];

export default function QuickDemoButtons({ onSelectCompany, isLoading }) {
  const handleViewFullReport = (reportUrl) => {
    window.open(reportUrl, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
      {/* Featured Companies with Full Reports */}
      <div className="mb-8">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-sm font-bold">FEATURED: Full Reports Available</span>
          </div>
          <p className="text-sm text-gray-500">See complete due diligence reports with all 5 pillars</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {FEATURED_COMPANIES.map((company, index) => (
            <div
              key={company.name}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 rounded-xl p-5 hover:shadow-xl hover:border-purple-400 transition-all duration-300 animate-fade-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{company.name}</h4>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                  <p className="text-xs text-gray-400">{company.location}</p>
                </div>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  Full Report
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-4">{company.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => onSelectCompany(company)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-700 transition-all disabled:opacity-50"
                >
                  Quick DD
                </button>
                <button
                  onClick={() => handleViewFullReport(company.reportUrl)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-bold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-4 text-sm text-gray-500">or try Quick Due Diligence on</span>
        </div>
      </div>

      {/* Regular Demo Companies */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Other Vendors
        </h3>
        <p className="text-sm text-gray-500">Run AI-powered quick assessment in ~30 seconds</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {DEMO_COMPANIES.map((company, index) => (
          <button
            key={company.name}
            onClick={() => onSelectCompany(company)}
            disabled={isLoading}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 disabled:hover:scale-100 animate-fade-in shadow-sm"
          >
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
}
