import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentForm from '../components/AssessmentForm';
import QuickDemoButtons from '../components/QuickDemoButtons';
import LoadingState from '../components/LoadingState';
import RiskDashboard from '../components/RiskDashboard';
import Logo from '../components/Logo';
import { sampleReports } from '../data/mockVendors';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const HERO_VENDORS = [
  { name: 'Siemens AG', score: 76, verdict: 'Conditional', industry: 'Industrial Automation', flag: 'ESG score impacted by Russia wind-down', id: 'siemens-featured' },
  { name: 'Microsoft Corp.', score: 62, verdict: 'Conditional', industry: 'Cloud & Software', flag: 'Critical cybersecurity concerns (39/100)', id: 'microsoft-featured' },
  { name: 'ABB Ltd', score: 75, verdict: 'Conditional', industry: 'Electrification', flag: 'Cybersecurity posture requires monitoring', id: 'abb-featured' },
  { name: 'OpenAI', score: 48, verdict: 'Monitoring', industry: 'AI Platform', flag: 'Active litigation and governance concerns', id: 'openai-featured' },
  { name: 'DocuSign, Inc.', score: 79, verdict: 'Conditional', industry: 'e-Signature & CLM', flag: 'Solid compliance posture, minor ESG gaps', id: 'docusign-featured' },
];

function HeroFeed({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % HERO_VENDORS.length);
        setIsTransitioning(false);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const active = HERO_VENDORS[activeIndex];
  const scoreColor = active.score >= 80 ? 'text-emerald-600' : active.score >= 60 ? 'text-amber-600' : 'text-orange-600';
  const verdictColor = active.verdict === 'Monitoring' ? 'text-orange-600' : 'text-amber-600';

  return (
    <div className="mt-8">
      {/* Active card */}
      <div
        className={`border border-slate-200 bg-white cursor-pointer hover:border-slate-400 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        onClick={() => onNavigate(active.id)}
      >
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Live Assessment</div>
            <div className="text-base font-semibold text-slate-900">{active.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">{active.industry}</div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-light font-mono ${scoreColor}`}>{active.score}</div>
            <div className={`text-[10px] font-medium uppercase tracking-wider ${verdictColor}`}>{active.verdict}</div>
          </div>
        </div>
        <div className="px-5 py-3 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 flex-shrink-0 ${active.score >= 80 ? 'bg-emerald-500' : active.score >= 60 ? 'bg-amber-500' : 'bg-orange-500'}`}></div>
            <span className="text-xs text-slate-600">{active.flag}</span>
            <span className="ml-auto text-xs text-slate-400 hover:text-slate-900">View report →</span>
          </div>
        </div>
      </div>

      {/* Queue — upcoming vendors */}
      <div className="mt-3 space-y-2">
        {HERO_VENDORS.filter((_, i) => i !== activeIndex).slice(0, 3).map((vendor) => (
          <div
            key={vendor.name}
            className="flex items-center justify-between px-4 py-2.5 border border-slate-100 bg-white hover:border-slate-300 cursor-pointer transition-colors"
            onClick={() => onNavigate(vendor.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 flex-shrink-0 ${vendor.score >= 80 ? 'bg-emerald-500' : vendor.score >= 60 ? 'bg-amber-500' : 'bg-orange-500'}`}></div>
              <span className="text-sm text-slate-700">{vendor.name}</span>
            </div>
            <span className={`text-sm font-mono ${vendor.score >= 80 ? 'text-emerald-600' : vendor.score >= 60 ? 'text-amber-600' : 'text-orange-600'}`}>{vendor.score}</span>
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div className="mt-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse"></div>
        <span className="text-xs text-slate-400">10 vendors assessed this week</span>
      </div>
    </div>
  );
}

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

      setState({ isLoading: false, error: null, assessment: result.data, metadata: result.metadata });

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
      if (existingIndex >= 0) existingVendors[existingIndex] = portfolioVendor;
      else existingVendors.unshift(portfolioVendor);
      localStorage.setItem('liveVendors', JSON.stringify(existingVendors));
    } catch (error) {
      console.error('Assessment error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.name === 'AbortError') errorMessage = 'Request timed out. Please try again.';
      else if (error.message.includes('Failed to fetch')) errorMessage = 'Cannot connect to the server. Please ensure the backend is running.';
      else if (error.message) errorMessage = error.message;
      setState({ isLoading: false, error: errorMessage, assessment: null, metadata: null });
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-emerald-700';
    if (score >= 70) return 'text-amber-700';
    return 'text-orange-700';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => navigate('/portfolio')}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Portfolio
            </button>
            {state.assessment && (
              <button
                onClick={() => { setState({ isLoading: false, error: null, assessment: null, metadata: null }); setSelectedCompany(null); }}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                New Assessment
              </button>
            )}
            <button className="px-5 py-2.5 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
              Book a Demo
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main>
        {!state.isLoading && !state.assessment && (
          <>
            {/* ─── Hero ─── */}
            <section className="max-w-[1200px] mx-auto px-8 pt-24 pb-20">
              <div className="grid grid-cols-2 gap-16 items-start">
                {/* Left: copy */}
                <div>
                  <h1 className="text-5xl md:text-6xl font-light text-slate-900 leading-[1.08] tracking-tight mb-6">
                    Vendor intelligence<br />
                    that <em className="not-italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', color: '#2563eb' }}>protects</em> your<br />
                    supply chain.
                  </h1>
                  <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
                    Autonomous AI agents that onboard, assess, monitor, and remediate vendor risk — replacing months of manual due diligence with decision-ready intelligence.
                  </p>
                  <div className="flex items-center gap-4 mb-16">
                    <button
                      onClick={() => navigate('/portfolio')}
                      className="px-6 py-3 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      Explore platform
                    </button>
                    <a href="#try-it" className="px-6 py-3 text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-900 transition-colors">
                      Try live assessment
                    </a>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-12">
                    <div>
                      <div className="text-3xl font-light text-slate-900 tracking-tight">30 min</div>
                      <div className="text-sm text-slate-400 mt-1">vs. 90+ days traditional</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div>
                      <div className="text-3xl font-light text-slate-900 tracking-tight">6 pillars</div>
                      <div className="text-sm text-slate-400 mt-1">End-to-end risk coverage</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div>
                      <div className="text-3xl font-light text-slate-900 tracking-tight">24/7</div>
                      <div className="text-sm text-slate-400 mt-1">Continuous monitoring</div>
                    </div>
                  </div>
                </div>

                {/* Right: live assessment feed */}
                <HeroFeed onNavigate={(id) => navigate(`/report/${id}`)} />
              </div>
            </section>

            {/* ─── What we cover ─── */}
            <section className="border-t border-slate-100">
              <div className="max-w-[1200px] mx-auto px-8 py-20">
                <div className="mb-12">
                  <p className="text-sm text-slate-400 uppercase tracking-widest mb-3">Intelligence across every dimension</p>
                  <h2 className="text-3xl font-light text-slate-900 tracking-tight">Six pillars of autonomous due diligence.</h2>
                </div>
                <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                  {[
                    { name: 'Financial Health', desc: 'Cash flow analysis, Altman Z-scores, bankruptcy prediction, and liquidity ratios.' },
                    { name: 'ESG & Sustainability', desc: 'Environmental compliance, CSRD readiness, and supply chain sustainability tracking.' },
                    { name: 'Human Rights & Ethics', desc: 'Modern slavery screening, labor practices, UFLPA compliance, and ethical sourcing.' },
                    { name: 'Sanctions & Anti-Bribery', desc: 'OFAC/UN/EU sanctions screening, FCPA compliance, and corruption risk indicators.' },
                    { name: 'Cybersecurity', desc: 'Security posture assessment, breach history, and SOC2/ISO27001 certification verification.' },
                    { name: 'Operational Resilience', desc: 'Business continuity, supply chain concentration, geopolitical exposure, and key person risk.' },
                  ].map((pillar) => (
                    <div key={pillar.name}>
                      <h3 className="text-base font-semibold text-slate-900 mb-2">{pillar.name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Sample Reports ─── */}
            <section className="border-t border-slate-100 bg-slate-50/50">
              <div className="max-w-[1200px] mx-auto px-8 py-20">
                <div className="mb-12">
                  <p className="text-sm text-slate-400 uppercase tracking-widest mb-3">Sample reports</p>
                  <h2 className="text-3xl font-light text-slate-900 tracking-tight">See what you receive.</h2>
                  <p className="text-base text-slate-500 mt-3 max-w-lg">
                    Not just risk scores — a strategy your risk committee can defend. Each report includes CAPA plans and contract clause recommendations.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {sampleReports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-white border border-slate-200 hover:border-slate-400 transition-all cursor-pointer group"
                      onClick={() => navigate(`/report/${report.id}`)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-5">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors">
                              {report.name}
                            </h3>
                            <p className="text-sm text-slate-500">{report.industry}</p>
                          </div>
                          <div className={`text-3xl font-light ${getRiskColor(report.riskScore)}`}>
                            {report.riskScore}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>Financial {report.keyMetrics.financial}</span>
                          <span className="text-slate-300">|</span>
                          <span>ESG {report.keyMetrics.esg}</span>
                          <span className="text-slate-300">|</span>
                          <span>Cyber {report.keyMetrics.cybersecurity}</span>
                          <span className="ml-auto text-slate-900 font-medium group-hover:underline">View report →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Platform lifecycle ─── */}
            <section className="border-t border-slate-100">
              <div className="max-w-[1200px] mx-auto px-8 py-20">
                <div className="mb-12">
                  <p className="text-sm text-slate-400 uppercase tracking-widest mb-3">Platform</p>
                  <h2 className="text-3xl font-light text-slate-900 tracking-tight">The system of record for vendor risk.</h2>
                  <p className="text-base text-slate-500 mt-3 max-w-2xl">
                    Not a report generator — an autonomous intelligence layer for the entire supplier lifecycle. Every assessment makes the next one smarter.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {[
                    { stage: '01', name: 'Onboard', desc: 'Any vendor, any geography. Agentic research and structured risk profiling in 30 minutes.', live: false },
                    { stage: '02', name: 'Assess', desc: 'Institutional-grade due diligence. Ownership mapping, sanctions screening, audit-ready evidence.', live: true },
                    { stage: '03', name: 'Monitor', desc: 'Continuous intelligence. Real-time alerts on litigation, sanctions, ESG controversies, and leadership changes.', live: false },
                    { stage: '04', name: 'Remediate', desc: 'Structured workflows. CAPA plans, contract amendments, re-assessment scheduling with full audit trails.', live: false },
                  ].map((item) => (
                    <div key={item.stage} className="border border-slate-200 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-mono text-slate-400">{item.stage}</span>
                        {item.live && <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium uppercase tracking-wider">Live</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-8 mt-8 pt-8 border-t border-slate-100">
                  {['Procurement', 'Finance', 'Compliance', 'Supply Chain'].map((persona) => (
                    <span key={persona} className="text-sm text-slate-400">{persona}</span>
                  ))}
                  <span className="ml-auto text-sm text-slate-400 italic">Every report builds the proprietary knowledge graph.</span>
                </div>
              </div>
            </section>

            {/* ─── Regulatory pressure ─── */}
            <section className="bg-slate-900">
              <div className="max-w-[1200px] mx-auto px-8 py-16">
                <p className="text-sm text-slate-500 uppercase tracking-widest mb-3">Why now</p>
                <h2 className="text-3xl font-light text-white tracking-tight mb-10">The regulatory pressure is live.</h2>
                <div className="grid grid-cols-4 gap-8">
                  {[
                    { label: 'German LkSG', stat: '2%', desc: 'of global turnover in fines for supply chain due diligence failures' },
                    { label: 'EU CSRD', stat: '50K+', desc: 'companies now required to report value-chain ESG data' },
                    { label: 'UFLPA', stat: '$1.34B', desc: 'merchandise detained at US border, 4,000+ seizures' },
                    { label: 'Vendor Breaches', stat: '61%', desc: 'of organizations breached via a third-party vendor in 2024' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-sm text-slate-500 mb-3">{item.label}</div>
                      <div className="text-3xl font-light text-white tracking-tight mb-2">{item.stat}</div>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Try it ─── */}
            <section id="try-it" className="border-t border-slate-100">
              <div className="max-w-[1200px] mx-auto px-8 py-20">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-light text-slate-900 tracking-tight mb-3">Try it live.</h2>
                    <p className="text-base text-slate-500">
                      Enter any company name to see our assessment engine in action.
                    </p>
                  </div>

                  <QuickDemoButtons
                    onSelectCompany={(company) => setSelectedCompany(company)}
                    isLoading={state.isLoading}
                  />

                  <AssessmentForm
                    onSubmit={(formData) => assessCompanyRisk(formData)}
                    isLoading={state.isLoading}
                    initialData={selectedCompany}
                  />

                  {state.error && (
                    <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
                      <h3 className="text-red-800 font-semibold text-sm mb-1">Assessment Error</h3>
                      <p className="text-red-700 text-sm">{state.error}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Loading State */}
        {state.isLoading && (
          <div className="max-w-[1200px] mx-auto px-8 py-20">
            <LoadingState companyName={loadingCompanyName} />
          </div>
        )}

        {/* Results */}
        {state.assessment && state.metadata && (
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <RiskDashboard
              assessment={state.assessment}
              metadata={state.metadata}
              onNewAssessment={() => { setState({ isLoading: false, error: null, assessment: null, metadata: null }); setSelectedCompany(null); }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <Logo />
              <p className="text-sm text-slate-400 mt-2">Lower risk. Faster onboarding. Higher confidence.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>Evidence-based analysis</span>
              <span>Audit-ready documentation</span>
              <span>CSRD / LkSG / UFLPA</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Spectrum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
