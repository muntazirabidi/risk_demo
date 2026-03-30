import { useState } from 'react';
import RiskScoreCard from './RiskScoreCard';
import FivePillars from './FivePillars';
import FindingsGrid from './FindingsGrid';
import DetailedBreakdown from './DetailedBreakdown';
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
        setToast({ message: `Excel report downloaded: ${result.filename}`, type: 'success' });
      } else {
        setToast({ message: `Export failed: ${result.error}`, type: 'error' });
      }
    } catch (error) {
      setToast({ message: `Export failed: ${error.message}`, type: 'error' });
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-emerald-700';
    if (score >= 60) return 'text-amber-700';
    return 'text-orange-700';
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      {/* ─── Report Header ─── */}
      <div className="bg-slate-900 text-white px-8 py-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Vendor Intelligence Report</div>
            <h1 className="text-3xl font-light tracking-tight mb-1">{metadata.companyName}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
              {metadata.industry !== 'Not specified' && <span>{metadata.industry}</span>}
              {metadata.location !== 'Not specified' && (
                <>
                  <span className="text-slate-600">|</span>
                  <span>{metadata.location}</span>
                </>
              )}
              <span className="text-slate-600">|</span>
              <span>{assessment.assessmentDate}</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400">{metadata.processingTime}s</span>
              {metadata.cached && <span className="text-amber-400 text-xs">(cached)</span>}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-light font-mono ${
              assessment.overallRiskScore >= 80 ? 'text-emerald-400' :
              assessment.overallRiskScore >= 60 ? 'text-amber-400' : 'text-orange-400'
            }`}>
              {assessment.overallRiskScore}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              {assessment.riskLevel} Risk
            </div>
          </div>
        </div>
      </div>

      {/* ─── Executive Summary ─── */}
      <div className="px-8 mb-8">
        <div className="border border-slate-200 p-6">
          <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Executive Summary</div>
          <p className="text-base text-slate-700 leading-relaxed">{assessment.executiveSummary}</p>
          {assessment.procurementRecommendation && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Procurement Recommendation</div>
              <p className="text-sm text-slate-600 leading-relaxed">{assessment.procurementRecommendation}</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Key Metrics ─── */}
      {assessment.keyMetrics && (
        <div className="px-8 mb-8">
          <div className="grid grid-cols-4 gap-4">
            {assessment.keyMetrics.estimatedAltmanZScore && (
              <div className={`border p-4 ${
                assessment.keyMetrics.estimatedAltmanZScore.includes('Safe') ? 'border-emerald-200 bg-emerald-50/50' :
                assessment.keyMetrics.estimatedAltmanZScore.includes('Grey') ? 'border-amber-200 bg-amber-50/50' :
                'border-red-200 bg-red-50/50'
              }`}>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Altman Z-Score</div>
                <div className={`text-sm font-semibold ${
                  assessment.keyMetrics.estimatedAltmanZScore.includes('Safe') ? 'text-emerald-700' :
                  assessment.keyMetrics.estimatedAltmanZScore.includes('Grey') ? 'text-amber-700' : 'text-red-700'
                }`}>{assessment.keyMetrics.estimatedAltmanZScore}</div>
              </div>
            )}
            {assessment.keyMetrics.paymentRiskLevel && (
              <div className="border border-slate-200 p-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Payment Risk</div>
                <div className={`text-sm font-semibold ${
                  assessment.keyMetrics.paymentRiskLevel === 'Low' ? 'text-emerald-700' :
                  assessment.keyMetrics.paymentRiskLevel === 'Medium' ? 'text-amber-700' : 'text-red-700'
                }`}>{assessment.keyMetrics.paymentRiskLevel}</div>
              </div>
            )}
            {assessment.keyMetrics.supplyDisruptionRisk && (
              <div className="border border-slate-200 p-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Supply Disruption</div>
                <div className={`text-sm font-semibold ${
                  assessment.keyMetrics.supplyDisruptionRisk === 'Low' ? 'text-emerald-700' :
                  assessment.keyMetrics.supplyDisruptionRisk === 'Medium' ? 'text-amber-700' : 'text-red-700'
                }`}>{assessment.keyMetrics.supplyDisruptionRisk}</div>
              </div>
            )}
            {assessment.keyMetrics.recommendedContractTerms && (
              <div className="border border-slate-200 p-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Contract Terms</div>
                <div className="text-sm font-semibold text-slate-900">{assessment.keyMetrics.recommendedContractTerms}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Risk Score + Pillars ─── */}
      <div className="px-8 mb-8">
        <FivePillars findings={assessment.findings} />
      </div>

      {/* ─── Findings ─── */}
      <div className="px-8 mb-8">
        <FindingsGrid findings={assessment.findings} />
      </div>

      {/* ─── Detailed Breakdown ─── */}
      <div className="px-8 mb-8">
        <DetailedBreakdown findings={assessment.findings} />
      </div>

      {/* ─── CAPA ─── */}
      <div className="px-8 mb-8">
        <CapaRecommendations findings={assessment.findings} companyName={metadata.companyName} />
      </div>

      {/* ─── Contract Playbook ─── */}
      <div className="px-8 mb-8">
        <ContractPlaybook assessment={assessment} companyName={metadata.companyName} />
      </div>

      {/* ─── Actions ─── */}
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3">
          <button
            onClick={onNewAssessment}
            className="px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Assess Another Vendor
          </button>
          <button
            onClick={handleDownloadExcel}
            className="px-6 py-3 bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            Download Excel
          </button>
          <button
            onClick={handleDownloadJSON}
            className="px-6 py-3 border border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-900 transition-colors"
          >
            Download JSON
          </button>
          <button
            onClick={handleCopyJSON}
            className="px-6 py-3 border border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-900 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
