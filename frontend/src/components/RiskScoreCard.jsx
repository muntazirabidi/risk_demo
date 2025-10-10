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

const getScoreGradient = (score) => {
  if (score >= 80) return 'from-green-400 to-green-600';
  if (score >= 60) return 'from-blue-400 to-blue-600';
  if (score >= 40) return 'from-yellow-400 to-orange-500';
  if (score >= 20) return 'from-orange-500 to-red-500';
  return 'from-red-500 to-red-700';
};

export default function RiskScoreCard({ assessment }) {
  const { overallRiskScore, riskLevel, executiveSummary, assessmentDate } = assessment;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (overallRiskScore / 100) * circumference;

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
                  '#3b82f6'
                } />
                <stop offset="100%" stopColor={
                  riskLevel === 'Critical' ? '#991b1b' :
                  riskLevel === 'High' ? '#c2410c' :
                  riskLevel === 'Medium' ? '#ca8a04' :
                  '#1d4ed8'
                } />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-black ${getRiskColor(riskLevel)} drop-shadow-sm`}>
              {overallRiskScore}
            </span>
            <span className="text-sm text-gray-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* Risk Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Risk Assessment</h2>
            <span className={getRiskBadgeClass(riskLevel) + ' px-4 py-1.5 text-sm shadow-md'}>
              {riskLevel} Risk
            </span>
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">
            {executiveSummary}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
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
              <span className="font-medium text-green-700">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
