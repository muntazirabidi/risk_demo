import { useState } from 'react';
import RiskScoreCard from './RiskScoreCard';
import FivePillars from './FivePillars';
import FindingsGrid from './FindingsGrid';
import DetailedBreakdown from './DetailedBreakdown';
import UpgradeCard from './UpgradeCard';
import CapaRecommendations from './CapaRecommendations';
import ContractPlaybook from './ContractPlaybook';
import Toast from './Toast';
import { downloadExcelReport } from '../utils/excelExport';

export default function RiskDashboard({ assessment, metadata, onNewAssessment }) {
  const [toast, setToast] = useState(null);

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify({ assessment, metadata }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `risk-assessment-${metadata.companyName.replace(/\s+/g, '-')}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setToast({ message: 'Assessment downloaded successfully!', type: 'success' });
  };

  const handleCopyJSON = () => {
    const dataStr = JSON.stringify({ assessment, metadata }, null, 2);
    navigator.clipboard.writeText(dataStr);
    setToast({ message: 'Assessment data copied to clipboard!', type: 'success' });
  };

  const handleDownloadExcel = async () => {
    try {
      setToast({ message: 'Generating Excel report...', type: 'info' });
      const result = await downloadExcelReport(assessment, metadata);
      if (result.success) {
        setToast({ 
          message: `Excel report downloaded: ${result.filename}`, 
          type: 'success' 
        });
      } else {
        setToast({ 
          message: `Export failed: ${result.error}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      setToast({ 
        message: `Export failed: ${error.message}`, 
        type: 'error' 
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header with Company Info */}
      <div className="mb-10 text-center">
        {/* Company Avatar/Logo Placeholder */}
        <div className="inline-flex mb-4">
          <div className="w-16 h-16 bg-slate-900 rounded-lg shadow-sm flex items-center justify-center">
            <span className="text-2xl font-black text-white">
              {metadata.companyName.charAt(0)}
            </span>
          </div>
        </div>

        <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">
          {metadata.companyName}
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-6">Vendor Due Diligence Report</p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {metadata.industry !== 'Not specified' && (
            <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg">
              <div className="p-1.5 bg-slate-600 rounded">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700">{metadata.industry}</span>
            </span>
          )}
          {metadata.location !== 'Not specified' && (
            <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg">
              <div className="p-1.5 bg-slate-700 rounded">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700">{metadata.location}</span>
            </span>
          )}
          <span className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2.5 rounded-lg">
            <div className="p-1.5 bg-green-600 rounded">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-green-700">Quick Due Diligence</span>
            <span className="text-xs text-green-600 font-bold">• {metadata.processingTime}s</span>
          </span>
          {metadata.cached && (
            <span className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-lg">
              <div className="p-1.5 bg-amber-600 rounded">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="font-semibold text-amber-700">Cached Result</span>
              <span className="text-xs text-amber-600 font-bold" title={metadata.originalAssessmentDate}>
                • From Today
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Risk Score Card */}
      <div className="mb-8">
        <RiskScoreCard assessment={assessment} />
      </div>

      {/* 5 Pillars of Intelligence */}
      <FivePillars findings={assessment.findings} />

      {/* Key Findings Grid - SHOW RESULTS FIRST */}
      <FindingsGrid findings={assessment.findings} />

      {/* Detailed Breakdown */}
      <DetailedBreakdown findings={assessment.findings} />

      {/* CAPA Recommendations - THEN show what actions to take */}
      <CapaRecommendations findings={assessment.findings} companyName={metadata.companyName} />

      {/* Contract Playbook - THEN show contract recommendations */}
      <ContractPlaybook assessment={assessment} companyName={metadata.companyName} />

      {/* Upgrade CTA */}
      <UpgradeCard
        companyName={metadata.companyName}
        riskScore={assessment.overallRiskScore}
        riskLevel={assessment.riskLevel}
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
        {/* Primary Action - Most Important */}
        <button
          onClick={onNewAssessment}
          className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold text-base shadow-sm hover:bg-slate-800 hover:shadow-md transition-all duration-200 flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Assess Another Vendor</span>
        </button>

        {/* Secondary Actions */}
        <button
          onClick={handleDownloadExcel}
          className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-base shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200 flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Excel Report</span>
        </button>

        <button
          onClick={handleDownloadJSON}
          className="px-6 py-4 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-900 hover:text-slate-900 hover:shadow-sm transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download JSON
        </button>

        <button
          onClick={handleCopyJSON}
          className="px-6 py-4 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-900 hover:text-slate-900 hover:shadow-sm transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy to Clipboard
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
