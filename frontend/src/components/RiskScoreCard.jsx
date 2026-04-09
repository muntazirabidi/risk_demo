import { useState, useEffect } from 'react';

const getRiskColor = (riskLevel) => {
  const colors = {
    Critical: 'text-red-700',
    High: 'text-orange-700',
    Medium: 'text-amber-700',
    Low: 'text-emerald-700',
  };
  return colors[riskLevel] || 'text-slate-600';
};

const useAnimatedCounter = (targetValue, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.round(easeOutQuart * targetValue);
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [targetValue, duration]);

  return count;
};

const getApprovalStatusStyle = (status) => {
  if (!status) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' };
  if (status.includes('Preferred')) return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800' };
  if (status.includes('Standard')) return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' };
  if (status.includes('CONDITIONAL')) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' };
  if (status.includes('CAUTION')) return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' };
  return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' };
};

const getScoreStrokeColor = (riskLevel) => {
  const colors = {
    Critical: '#dc2626',
    High: '#ea580c',
    Medium: '#d97706',
    Low: '#059669',
  };
  return colors[riskLevel] || '#64748b';
};

export default function RiskScoreCard({ assessment }) {
  const { overallRiskScore, riskLevel, executiveSummary, assessmentDate, vendorApprovalStatus, procurementRecommendation, keyMetrics } = assessment;
  const circumference = 2 * Math.PI * 70;
  const animatedScore = useAnimatedCounter(overallRiskScore, 1800);
  const animatedStrokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const approvalStyle = getApprovalStatusStyle(vendorApprovalStatus);

  return (
    <div className="bg-white border border-slate-200 p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Circular Score Display */}
        <div className="relative flex-shrink-0">
          <svg className="transform -rotate-90 w-44 h-44">
            <circle cx="88" cy="88" r="74" stroke="#f1f5f9" strokeWidth="14" fill="none" />
            <circle
              cx="88" cy="88" r="74"
              stroke={getScoreStrokeColor(riskLevel)}
              strokeWidth="14"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={animatedStrokeDashoffset}
              strokeLinecap="square"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Viability</span>
            <span className={`text-5xl font-light font-mono ${getRiskColor(riskLevel)} tabular-nums`}>
              {animatedScore}
            </span>
            <span className="text-sm text-slate-400 font-mono">/ 100</span>
          </div>
        </div>

        {/* Risk Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mb-4">
            <h2 className="text-2xl font-light text-slate-900 tracking-tight">Vendor Viability Score</h2>
            {vendorApprovalStatus && (
              <span className={`${approvalStyle.bg} ${approvalStyle.border} ${approvalStyle.text} border px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-2`}>
                {vendorApprovalStatus.includes('APPROVED') && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {vendorApprovalStatus.includes('NOT RECOMMENDED') && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {vendorApprovalStatus}
              </span>
            )}
          </div>

          <p className="text-slate-600 text-base mb-4 leading-relaxed">
            {executiveSummary}
          </p>

          {/* Procurement Recommendation */}
          {procurementRecommendation && (
            <div className="bg-blue-50 border-l-[3px] border-blue-600 p-4 mb-4">
              <p className="text-[10px] font-medium text-blue-800 uppercase tracking-widest mb-1">Procurement Recommendation</p>
              <p className="text-sm text-blue-900">{procurementRecommendation}</p>
            </div>
          )}

          {/* Key Metrics */}
          {keyMetrics && (
            <div className="mb-4">
              {keyMetrics.estimatedAltmanZScore && (
                <div className={`mb-3 p-4 border-l-[3px] ${
                  keyMetrics.estimatedAltmanZScore.includes('Safe')
                    ? 'bg-emerald-50 border-emerald-600'
                    : keyMetrics.estimatedAltmanZScore.includes('Grey')
                    ? 'bg-amber-50 border-amber-600'
                    : 'bg-red-50 border-red-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Altman Z-Score (Bankruptcy Predictor)</p>
                      <p className={`text-lg font-semibold font-mono ${
                        keyMetrics.estimatedAltmanZScore.includes('Safe') ? 'text-emerald-700' :
                        keyMetrics.estimatedAltmanZScore.includes('Grey') ? 'text-amber-700' : 'text-red-700'
                      }`}>{keyMetrics.estimatedAltmanZScore}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Industry Standard</p>
                      <p className="text-[10px] text-slate-400 font-mono">&gt;2.99 Safe | 1.81-2.99 Grey | &lt;1.81 Distress</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                {keyMetrics.paymentRiskLevel && (
                  <div className={`p-3 text-center border ${
                    keyMetrics.paymentRiskLevel === 'Low' ? 'bg-emerald-50 border-emerald-200' :
                    keyMetrics.paymentRiskLevel === 'Medium' ? 'bg-amber-50 border-amber-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Payment Risk</p>
                    <p className={`text-sm font-semibold ${
                      keyMetrics.paymentRiskLevel === 'Low' ? 'text-emerald-700' :
                      keyMetrics.paymentRiskLevel === 'Medium' ? 'text-amber-700' : 'text-red-700'
                    }`}>{keyMetrics.paymentRiskLevel}</p>
                  </div>
                )}
                {keyMetrics.supplyDisruptionRisk && (
                  <div className={`p-3 text-center border ${
                    keyMetrics.supplyDisruptionRisk === 'Low' ? 'bg-emerald-50 border-emerald-200' :
                    keyMetrics.supplyDisruptionRisk === 'Medium' ? 'bg-amber-50 border-amber-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Supply Risk</p>
                    <p className={`text-sm font-semibold ${
                      keyMetrics.supplyDisruptionRisk === 'Low' ? 'text-emerald-700' :
                      keyMetrics.supplyDisruptionRisk === 'Medium' ? 'text-amber-700' : 'text-red-700'
                    }`}>{keyMetrics.supplyDisruptionRisk}</p>
                  </div>
                )}
                {keyMetrics.recommendedContractTerms && (
                  <div className="bg-slate-50 border border-slate-200 p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Contract Terms</p>
                    <p className="text-sm font-semibold text-slate-800">{keyMetrics.recommendedContractTerms}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">{assessmentDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2">
              <div className="w-1.5 h-1.5 bg-emerald-500"></div>
              <span className="text-xs font-medium text-slate-600">Autonomous Due Diligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
