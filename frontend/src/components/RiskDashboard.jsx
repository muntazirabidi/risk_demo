import { useState } from 'react';
import RiskScoreCard from './RiskScoreCard';
import FivePillars from './FivePillars';
import FindingsGrid from './FindingsGrid';
import DetailedBreakdown from './DetailedBreakdown';
import UpgradeCard from './UpgradeCard';
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center">
            <span className="text-2xl font-black text-white">
              {metadata.companyName.charAt(0)}
            </span>
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
          {metadata.companyName}
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-6">Vendor Due Diligence Report</p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {metadata.industry !== 'Not specified' && (
            <span className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 px-4 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700">{metadata.industry}</span>
            </span>
          )}
          {metadata.location !== 'Not specified' && (
            <span className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 px-4 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
              <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700">{metadata.location}</span>
            </span>
          )}
          <span className="group relative flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 px-4 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
            <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-green-700">Quick Due Diligence</span>
            <span className="text-xs text-green-600 font-bold">• {metadata.processingTime}s</span>
          </span>
        </div>
      </div>

      {/* Risk Score Card */}
      <div className="mb-8">
        <RiskScoreCard assessment={assessment} />
      </div>

      {/* 5 Pillars of Intelligence */}
      <FivePillars findings={assessment.findings} />

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
        {/* Primary Action - Most Important */}
        <button
          onClick={onNewAssessment}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-6 h-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="relative z-10">Assess Another Vendor</span>
        </button>

        {/* Secondary Actions */}
        <button
          onClick={handleDownloadExcel}
          className="group relative px-8 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="relative z-10">Download Excel Report</span>
        </button>

        <button
          onClick={handleDownloadJSON}
          className="group px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download JSON
        </button>

        <button
          onClick={handleCopyJSON}
          className="group px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-500 hover:text-green-700 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
