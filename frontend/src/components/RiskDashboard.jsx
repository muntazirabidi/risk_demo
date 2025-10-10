import RiskScoreCard from './RiskScoreCard';
import FindingsGrid from './FindingsGrid';
import DetailedBreakdown from './DetailedBreakdown';
import UpgradeCard from './UpgradeCard';

export default function RiskDashboard({ assessment, metadata, onNewAssessment }) {
  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify({ assessment, metadata }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `risk-assessment-${metadata.companyName.replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleCopyJSON = () => {
    const dataStr = JSON.stringify({ assessment, metadata }, null, 2);
    navigator.clipboard.writeText(dataStr);
    alert('Assessment data copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header with Company Info */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
          {metadata.companyName}
        </h1>
        <div className="flex items-center justify-center gap-6 text-gray-600 text-sm font-medium">
          {metadata.industry !== 'Not specified' && (
            <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {metadata.industry}
            </span>
          )}
          {metadata.location !== 'Not specified' && (
            <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {metadata.location}
            </span>
          )}
          <span className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {metadata.processingTime}s
          </span>
        </div>
      </div>

      {/* Risk Score Card */}
      <div className="mb-8">
        <RiskScoreCard assessment={assessment} />
      </div>

      {/* Upgrade CTA */}
      <UpgradeCard
        companyName={metadata.companyName}
        riskScore={assessment.overallRiskScore}
        riskLevel={assessment.riskLevel}
      />

      {/* Key Findings Grid */}
      <FindingsGrid findings={assessment.findings} />

      {/* Detailed Breakdown */}
      <DetailedBreakdown findings={assessment.findings} />

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
        <button
          onClick={handleDownloadJSON}
          className="btn-secondary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download JSON
        </button>

        <button
          onClick={handleCopyJSON}
          className="btn-secondary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy to Clipboard
        </button>

        <button
          onClick={onNewAssessment}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Analyze Another Company
        </button>
      </div>
    </div>
  );
}
