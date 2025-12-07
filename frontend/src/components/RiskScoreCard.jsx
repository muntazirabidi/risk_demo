const getRiskColor = (riskLevel) => {
  const colors = {
    Critical: 'text-risk-critical',
    High: 'text-risk-high',
    Medium: 'text-risk-medium',
    Low: 'text-risk-low',
  };
  return colors[riskLevel] || 'text-gray-600';
};

const getRiskBadgeClass = (riskLevel) => {
  const classes = {
    Critical: 'badge-critical',
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
  };
  return classes[riskLevel] || 'badge-low';
};

const getApprovalStatusStyle = (status) => {
  if (!status) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'text-blue-600' };

  if (status.includes('Preferred')) {
    return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', icon: 'text-green-600' };
  } else if (status.includes('Standard')) {
    return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: 'text-blue-600' };
  } else if (status.includes('CONDITIONAL')) {
    return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', icon: 'text-yellow-600' };
  } else if (status.includes('CAUTION')) {
    return { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800', icon: 'text-orange-600' };
  } else {
    return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', icon: 'text-red-600' };
  }
};

const getScoreGradient = (score) => {
  if (score >= 80) return 'from-green-400 to-green-600';
  if (score >= 60) return 'from-blue-400 to-blue-600';
  if (score >= 40) return 'from-yellow-400 to-orange-500';
  if (score >= 20) return 'from-orange-500 to-red-500';
  return 'from-red-500 to-red-700';
};

export default function RiskScoreCard({ assessment }) {
  const { overallRiskScore, riskLevel, executiveSummary, assessmentDate, vendorApprovalStatus, procurementRecommendation, keyMetrics } = assessment;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (overallRiskScore / 100) * circumference;
  const approvalStyle = getApprovalStatusStyle(vendorApprovalStatus);

  return (
    <div className="card bg-gradient-to-br from-white via-gray-50 to-white animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Circular Score Display */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-30"></div>
          <svg className="transform -rotate-90 w-44 h-44 relative z-10">
            {/* Background circle */}
            <circle
              cx="88"
              cy="88"
              r="74"
              stroke="currentColor"
              strokeWidth="14"
              fill="none"
              className="text-gray-100"
            />
            {/* Progress circle with gradient */}
            <circle
              cx="88"
              cy="88"
              r="74"
              stroke="url(#scoreGradient)"
              strokeWidth="14"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out drop-shadow-lg"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={
                  riskLevel === 'Critical' ? '#dc2626' :
                  riskLevel === 'High' ? '#ea580c' :
                  riskLevel === 'Medium' ? '#eab308' :
                  '#22c55e'
                } />
                <stop offset="100%" stopColor={
                  riskLevel === 'Critical' ? '#991b1b' :
                  riskLevel === 'High' ? '#c2410c' :
                  riskLevel === 'Medium' ? '#ca8a04' :
                  '#15803d'
                } />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Viability</span>
            <span className={`text-5xl font-black ${getRiskColor(riskLevel)} drop-shadow-sm`}>
              {overallRiskScore}
            </span>
            <span className="text-sm text-gray-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* Risk Details */}
        <div className="flex-1 text-center md:text-left">
          {/* Title and Approval Status */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Vendor Viability Score</h2>
            {vendorApprovalStatus && (
              <span className={`${approvalStyle.bg} ${approvalStyle.border} ${approvalStyle.text} border-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2`}>
                {vendorApprovalStatus.includes('APPROVED') && (
                  <svg className={`w-4 h-4 ${approvalStyle.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {vendorApprovalStatus.includes('NOT RECOMMENDED') && (
                  <svg className={`w-4 h-4 ${approvalStyle.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {vendorApprovalStatus}
              </span>
            )}
          </div>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed font-medium">
            {executiveSummary}
          </p>

          {/* Procurement Recommendation Box */}
          {procurementRecommendation && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-600 rounded-lg flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">Procurement Recommendation</p>
                  <p className="text-sm text-blue-900 font-medium">{procurementRecommendation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          {keyMetrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {keyMetrics.estimatedAltmanZScore && (
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">Altman Z-Score</p>
                  <p className={`text-sm font-bold ${keyMetrics.estimatedAltmanZScore.includes('Safe') ? 'text-green-700' : keyMetrics.estimatedAltmanZScore.includes('Grey') ? 'text-yellow-700' : 'text-red-700'}`}>
                    {keyMetrics.estimatedAltmanZScore.split(' ')[0]} {keyMetrics.estimatedAltmanZScore.split(' ')[1]}
                  </p>
                </div>
              )}
              {keyMetrics.paymentRiskLevel && (
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">Payment Risk</p>
                  <p className={`text-sm font-bold ${keyMetrics.paymentRiskLevel === 'Low' ? 'text-green-700' : keyMetrics.paymentRiskLevel === 'Medium' ? 'text-yellow-700' : 'text-red-700'}`}>
                    {keyMetrics.paymentRiskLevel}
                  </p>
                </div>
              )}
              {keyMetrics.supplyDisruptionRisk && (
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">Supply Risk</p>
                  <p className={`text-sm font-bold ${keyMetrics.supplyDisruptionRisk === 'Low' ? 'text-green-700' : keyMetrics.supplyDisruptionRisk === 'Medium' ? 'text-yellow-700' : 'text-red-700'}`}>
                    {keyMetrics.supplyDisruptionRisk}
                  </p>
                </div>
              )}
              {keyMetrics.recommendedContractTerms && (
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">Contract Terms</p>
                  <p className="text-sm font-bold text-gray-800">
                    {keyMetrics.recommendedContractTerms}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{assessmentDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-700">AI-Powered Due Diligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
