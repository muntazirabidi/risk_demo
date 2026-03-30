import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentForm from '../components/AssessmentForm';
import QuickDemoButtons from '../components/QuickDemoButtons';
import LoadingState from '../components/LoadingState';
import RiskDashboard from '../components/RiskDashboard';
import Logo from '../components/Logo';
import { sampleReports } from '../data/mockVendors';

// Use environment variable for API URL with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

function LandingPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    assessment: null,
    metadata: null,
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loadingCompanyName, setLoadingCompanyName] = useState('');

  const assessCompanyRisk = async (formData) => {
    setLoadingCompanyName(formData.companyName);
    setState({ isLoading: true, error: null, assessment: null, metadata: null });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 150000);

      const response = await fetch(`${API_BASE_URL}/assess-risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Risk assessment failed');
      }

      setState({
        isLoading: false,
        error: null,
        assessment: result.data,
        metadata: result.metadata,
      });

      // Save to localStorage for portfolio integration
      const portfolioVendor = {
        id: `live-${Date.now()}`,
        name: result.metadata.companyName,
        industry: result.metadata.industry || 'Not specified',
        location: result.metadata.location || 'Not specified',
        riskScore: result.data.overallRiskScore,
        riskLevel: result.data.riskLevel,
        status: result.data.overallRiskScore >= 80 ? 'Qualified' :
                result.data.overallRiskScore >= 70 ? 'Conditional' : 'Monitoring',
        lastAssessment: result.metadata.timestamp || new Date().toISOString(),
        assessmentDate: result.data.assessmentDate,
        criticality: result.data.overallRiskScore >= 80 ? 'Low' :
                     result.data.overallRiskScore >= 65 ? 'Medium' : 'High',
        isLiveAssessment: true,
        findings: result.data.findings,
        executiveSummary: result.data.executiveSummary,
        cached: result.metadata.cached || false,
      };

      const existingVendors = JSON.parse(localStorage.getItem('liveVendors') || '[]');
      const existingIndex = existingVendors.findIndex(v =>
        v.name.toLowerCase() === portfolioVendor.name.toLowerCase()
      );

      if (existingIndex >= 0) {
        existingVendors[existingIndex] = portfolioVendor;
      } else {
        existingVendors.unshift(portfolioVendor);
      }

      localStorage.setItem('liveVendors', JSON.stringify(existingVendors));
    } catch (error) {
      console.error('Assessment error:', error);

      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. The assessment is taking longer than expected. Please try again.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to the server. Please ensure the backend is running on port 3001.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setState({ isLoading: false, error: errorMessage, assessment: null, metadata: null });
    }
  };

  const handleFormSubmit = (formData) => assessCompanyRisk(formData);
  const handleQuickDemo = (company) => setSelectedCompany(company);
  const handleNewAssessment = () => {
    setState({ isLoading: false, error: null, assessment: null, metadata: null });
    setSelectedCompany(null);
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-emerald-700';
    if (score >= 70) return 'text-amber-700';
    return 'text-orange-700';
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo />
              <div className="border-l border-slate-200 pl-3">
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.15em]">Vendor Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/portfolio')}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors uppercase tracking-wider"
              >
                View Portfolio
              </button>
              {state.assessment && (
                <button
                  onClick={handleNewAssessment}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors uppercase tracking-wider"
                >
                  + New Assessment
                </button>
              )}
              <button className="px-5 py-2 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors uppercase tracking-wider">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {!state.isLoading && !state.assessment && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-black leading-[1.1]">
                Autonomous Vendor Intelligence<br />
                <span className="text-slate-500">for the Entire Supplier Lifecycle</span>
              </h1>
              <p className="text-base text-slate-600 max-w-2xl mx-auto mb-2">
                Spectrum is an agent-native platform that autonomously onboards, assesses, monitors, and
                remediates vendor risk — replacing manual processes across procurement, finance, compliance, and supply chain.
              </p>
              <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
                Try the live assessment engine — enter any company name below
              </p>

              {/* Key metrics strip */}
              <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto mb-2">
                <div className="text-center">
                  <div className="text-2xl font-light text-black tracking-tight">30 min</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">vs. 90+ days traditional</div>
                </div>
                <div className="w-px h-10 bg-slate-200 self-center"></div>
                <div className="text-center">
                  <div className="text-2xl font-light text-black tracking-tight">6 pillars</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">End-to-end coverage</div>
                </div>
                <div className="w-px h-10 bg-slate-200 self-center"></div>
                <div className="text-center">
                  <div className="text-2xl font-light text-black tracking-tight">24/7</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Continuous monitoring</div>
                </div>
              </div>
            </div>

            {/* Quick Demo Buttons */}
            <QuickDemoButtons
              onSelectCompany={handleQuickDemo}
              isLoading={state.isLoading}
            />

            {/* Assessment Form */}
            <AssessmentForm
              onSubmit={handleFormSubmit}
              isLoading={state.isLoading}
              initialData={selectedCompany}
            />

            {/* Error Display */}
            {state.error && (
              <div className="max-w-3xl mx-auto mt-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-red-800 font-semibold text-sm mb-1">Assessment Error</h3>
                      <p className="text-red-700 text-sm">{state.error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sample Reports Section */}
            <div className="max-w-5xl mx-auto mt-20 mb-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em]">Sample Intelligence Reports</span>
                </div>
                <h2 className="text-2xl font-light text-black tracking-tight mb-2">See What You Receive</h2>
                <p className="text-sm text-slate-500 max-w-xl mx-auto">
                  Not just risk scores — a strategy your risk committee can defend.
                  Each report includes CAPA plans and contract clause recommendations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {sampleReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                    onClick={() => navigate(`/report/${report.id}`)}
                  >
                    <div className="absolute top-0 right-0 bg-slate-900 text-white text-[9px] font-medium px-2.5 py-1 uppercase tracking-wider">
                      Full Report
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-base font-semibold text-black mb-1 group-hover:text-slate-700 transition-colors">
                          {report.name}
                        </h3>
                        <p className="text-xs text-slate-500">{report.industry}</p>
                        <p className="text-xs text-slate-400">{report.location}</p>
                      </div>

                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Risk Score</div>
                          <div className={`text-3xl font-light ${getRiskColor(report.riskScore)}`}>
                            {report.riskScore}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Status</div>
                          <span className="inline-flex px-2 py-0.5 text-[10px] font-medium border uppercase tracking-wider text-emerald-700 bg-emerald-50 border-emerald-200">
                            {report.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Financial Health</span>
                          <span className="font-medium text-slate-800">{report.keyMetrics.financial}/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">ESG & Sustainability</span>
                          <span className="font-medium text-slate-800">{report.keyMetrics.esg}/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Cybersecurity</span>
                          <span className="font-medium text-slate-800">{report.keyMetrics.cybersecurity}/100</span>
                        </div>
                      </div>

                      <button
                        className="w-full py-2 text-xs font-medium bg-slate-900 text-white group-hover:bg-slate-800 transition-colors uppercase tracking-wider"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/report/${report.id}`);
                        }}
                      >
                        View Full Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Inside a Report */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="border border-slate-200">
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                  <h3 className="text-lg font-light text-black tracking-tight">What Every Report Delivers</h3>
                  <p className="text-xs text-slate-500 mt-1">Actionable intelligence, not just data</p>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-200">
                  <div className="p-6">
                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-3">Analysis</div>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">01</span>
                        <span>Financial forensics with peer benchmarking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">02</span>
                        <span>ESG controversy screening & CSRD/LkSG alignment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">03</span>
                        <span>Sanctions, PEP, and beneficial ownership checks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">04</span>
                        <span>Cybersecurity posture & breach history</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-3">Strategy</div>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">05</span>
                        <span>Contract playbook with clause recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">06</span>
                        <span>CAPA plans tied to specific risk findings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">07</span>
                        <span>Monitoring KRIs with threshold alerts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">08</span>
                        <span>Full audit trail with numbered source citations</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-3">Compliance</div>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">09</span>
                        <span>CSRD & CSDDD value-chain reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">10</span>
                        <span>German LkSG supply chain due diligence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">11</span>
                        <span>UK/Australia Modern Slavery Act screening</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1 text-xs">12</span>
                        <span>UFLPA forced labor import compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Traditional vs Spectrum */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-slate-50 border border-slate-200 p-8">
                <h3 className="text-lg font-light text-black text-center mb-8 tracking-tight">The Old Way vs. Spectrum</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-medium text-red-600 uppercase tracking-[0.15em] mb-4">Legacy Process</div>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span><strong className="text-slate-900">3-4 months</strong> per vendor assessment, $15K-$20K each</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span>Data scattered across emails, PDFs, and disconnected portals</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span>Point-in-time snapshots blind to emerging risks</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-red-400 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                        <span>Subjective scores that regulators can't audit</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-emerald-600 uppercase tracking-[0.15em] mb-4">With Spectrum</div>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span><strong className="text-slate-900">30-minute</strong> comprehensive reports, fixed per-report pricing</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>AI aggregates data from 100+ verified public sources</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>Continuous monitoring with real-time risk drift alerts</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>Every finding evidence-cited with full audit trail</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory urgency strip */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-slate-900 text-white p-8">
                <h3 className="text-lg font-light tracking-tight mb-6">The Regulatory Pressure Is Live</h3>
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">German LkSG</div>
                    <p className="text-sm text-slate-300">Supply chain due diligence with fines up to <strong className="text-white">2% of global turnover</strong></p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">EU CSRD</div>
                    <p className="text-sm text-slate-300">Value-chain ESG reporting now required for <strong className="text-white">50,000+ companies</strong></p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">UFLPA</div>
                    <p className="text-sm text-slate-300"><strong className="text-white">$1.34B merchandise detained</strong> at US border, 4,000+ seizures</p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Breach Risk</div>
                    <p className="text-sm text-slate-300"><strong className="text-white">61% of organizations</strong> breached via a vendor in 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Vision — Full Lifecycle */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-slate-900 text-white p-8">
                <div className="mb-8">
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-2">Agent-Native Platform</div>
                  <h3 className="text-xl font-light tracking-tight mb-2">The System of Record for Vendor Risk</h3>
                  <p className="text-sm text-slate-400 max-w-3xl">
                    Spectrum is not a report generator. It's the autonomous intelligence layer for the entire supplier risk lifecycle — where every assessment makes the next one smarter. 20+ specialized AI agents replace what today requires teams of analysts, months of manual research, and $15-20K per vendor.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-px bg-slate-700">
                  <div className="bg-slate-900 p-5">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.15em] mb-1">Stage 1</div>
                    <h4 className="text-sm font-semibold text-white mb-2">Onboard</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Any vendor, any geography. Agentic web research, document extraction, and structured risk profiling in 30 minutes.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">Supplier intake</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">Qualification</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-5">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.15em] mb-1">Stage 2</div>
                    <h4 className="text-sm font-semibold text-white mb-2">Assess</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Deep institutional-grade due diligence. Ownership mapping, sanctions screening, financial distress signals, audit-ready evidence trails.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 bg-emerald-900/50 text-emerald-400 uppercase tracking-wider border border-emerald-800">Live today</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">Deep DD</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-5">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.15em] mb-1">Stage 3</div>
                    <h4 className="text-sm font-semibold text-white mb-2">Monitor</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Continuous risk intelligence. Real-time alerts on litigation, sanctions changes, leadership turnover, and ESG controversies.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">24/7 watch</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">Drift alerts</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-5">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.15em] mb-1">Stage 4</div>
                    <h4 className="text-sm font-semibold text-white mb-2">Remediate</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Structured remediation workflows. CAPA plans, contract clause amendments, re-assessment scheduling. Full audit trail: risk found → action taken → outcome.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">CAPA</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 uppercase tracking-wider">Workflows</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-600"></div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Procurement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-600"></div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Finance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-600"></div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Compliance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-600"></div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Supply Chain</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-600 italic">Every report builds the proprietary knowledge graph. Network effects compound with scale.</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Loading State */}
        {state.isLoading && <LoadingState companyName={loadingCompanyName} />}

        {/* Results Dashboard */}
        {state.assessment && state.metadata && (
          <RiskDashboard
            assessment={state.assessment}
            metadata={state.metadata}
            onNewAssessment={handleNewAssessment}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <img
                src="/spectrum-logo.png"
                alt="Spectrum"
                style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p className="text-sm font-medium text-slate-900 mb-1">
              Lower Risk. Faster Onboarding. Higher Confidence.
            </p>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Autonomous vendor intelligence for procurement, finance, compliance, and supply chain teams.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-1.5 h-1.5 bg-slate-900"></div>
              <span>Evidence-Based Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-1.5 h-1.5 bg-slate-900"></div>
              <span>Audit-Ready Documentation</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-1.5 h-1.5 bg-slate-900"></div>
              <span>CSRD / LkSG / UFLPA Compliant</span>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              &copy; {new Date().getFullYear()} Spectrum. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
