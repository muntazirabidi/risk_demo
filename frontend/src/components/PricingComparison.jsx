export default function PricingComparison() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Choose Your Assessment Level
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start with a free quick screen or get comprehensive due diligence
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Quick Screen */}
        <div className="card border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Screen</h3>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-black text-blue-600">Free</span>
            </div>
            <p className="text-sm text-gray-500">60 seconds • Lead generation</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Overall risk score (0-100)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">6-10 key risk findings</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Basic source citations</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">JSON export</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-400 line-through">Timeline reconstruction</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-400 line-through">ESG framework analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-400 line-through">PDF/Excel reports</span>
            </li>
          </ul>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-600">Use the form above to try it</p>
          </div>
        </div>

        {/* Comprehensive Report */}
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-500 relative hover:shadow-2xl transition-all duration-300">
          {/* Recommended Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              MOST POPULAR
            </span>
          </div>

          <div className="text-center mb-6 pt-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Comprehensive Report</h3>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-black text-blue-600">Custom</span>
            </div>
            <p className="text-sm text-gray-600">1 hour delivery • Enterprise-grade</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-900 font-semibold">Everything in Quick Screen, plus:</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong className="text-gray-900">10-20 detailed incident reports</strong> with full context</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong className="text-gray-900">Timeline reconstruction</strong> (2015 incident → 2024 fine)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong className="text-gray-900">Financial + Regulatory + Operational risks</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong className="text-gray-900">Multi-source verification</strong> (regulatory, legal, news, court records)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong className="text-gray-900">Professional report</strong> (PDF + Excel, 30-50 pages)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong className="text-gray-900">1 hour delivery</strong> (vs 2-4 weeks traditional)</span>
            </li>
          </ul>

          <div className="text-center pt-6 border-t border-blue-200">
            <p className="text-sm font-semibold text-blue-700">Scroll down to request a report</p>
          </div>
        </div>
      </div>

      {/* Value Comparison */}
      <div className="mt-12 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 max-w-3xl">
          <p className="text-sm text-gray-600 mb-2">Traditional vendor due diligence takes</p>
          <p className="text-3xl font-black text-gray-400 line-through mb-2">2-4 weeks</p>
          <p className="text-sm text-gray-600 mb-2">and costs $10,000 - $15,000</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-bold text-gray-900">
              Our comprehensive report: <span className="text-blue-600">1 hour delivery</span> at <span className="text-blue-600">95% lower cost</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
