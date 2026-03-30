import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVendors, portfolioReports } from '../data/mockVendors';
import Logo from './Logo';

function VendorPortfolio() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveVendors, setLiveVendors] = useState([]);
  const [hiddenMockVendors, setHiddenMockVendors] = useState([]);
  const [showHidden, setShowHidden] = useState(false);

  // Load live vendors and hidden mock vendors from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      const storedLive = localStorage.getItem('liveVendors');
      if (storedLive) {
        setLiveVendors(JSON.parse(storedLive));
      }

      const storedHidden = localStorage.getItem('hiddenMockVendors');
      if (storedHidden) {
        setHiddenMockVendors(JSON.parse(storedHidden));
      }
    };
    loadData();

    // Listen for storage changes (if multiple tabs)
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Remove a live vendor from portfolio
  const removeLiveVendor = (vendorId) => {
    const updated = liveVendors.filter(v => v.id !== vendorId);
    setLiveVendors(updated);
    localStorage.setItem('liveVendors', JSON.stringify(updated));
  };

  // Hide a mock vendor
  const hideMockVendor = (vendorId) => {
    if (!hiddenMockVendors.includes(vendorId)) {
      const updated = [...hiddenMockVendors, vendorId];
      setHiddenMockVendors(updated);
      localStorage.setItem('hiddenMockVendors', JSON.stringify(updated));
    }
  };

  // Restore a hidden mock vendor
  const restoreMockVendor = (vendorId) => {
    const updated = hiddenMockVendors.filter(id => id !== vendorId);
    setHiddenMockVendors(updated);
    localStorage.setItem('hiddenMockVendors', JSON.stringify(updated));
  };

  // Filter out hidden mock vendors
  const visibleMockVendors = mockVendors.filter(v => !hiddenMockVendors.includes(v.id));
  const hiddenVendorsList = mockVendors.filter(v => hiddenMockVendors.includes(v.id));

  // Combine and sort vendors: Full Reports first, then Recently Assessed, then Samples
  const allVendors = [...liveVendors, ...visibleMockVendors].sort((a, b) => {
    // Priority 1: Full Report vendors (highest priority)
    if (a.fullReport && !b.fullReport) return -1;
    if (!a.fullReport && b.fullReport) return 1;

    // Priority 2: Recently Assessed vendors (second priority)
    if (a.isLiveAssessment && !b.isLiveAssessment) return -1;
    if (!a.isLiveAssessment && b.isLiveAssessment) return 1;

    // Priority 3: Within same type, sort by date (newest first)
    const dateA = new Date(a.lastAssessment || a.assessmentDate);
    const dateB = new Date(b.lastAssessment || b.assessmentDate);
    return dateB - dateA;
  });

  // Separate featured vendors (with full reports)
  const featuredVendors = visibleMockVendors.filter(vendor => vendor.fullReport === true);
  const sampleVendors = visibleMockVendors.filter(vendor => !vendor.fullReport);
  const portfolioReport = portfolioReports[0];

  const filteredVendors = allVendors.filter(vendor => {
    const matchesStatus = filterStatus === 'all' || vendor.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: allVendors.length,
    qualified: allVendors.filter(v => v.status === 'Qualified' || v.status === 'qualified').length,
    conditional: allVendors.filter(v => v.status === 'Conditional' || v.status === 'conditional').length,
    monitoring: allVendors.filter(v => v.status === 'Monitoring' || v.status === 'monitoring').length,
    capaOverdue: allVendors.reduce((sum, v) => sum + (v.capaDue || 0), 0),
    avgRiskScore: Math.round(allVendors.reduce((sum, v) => sum + v.riskScore, 0) / allVendors.length)
  };

  const getStatusStyle = (status) => {
    const styles = {
      qualified: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      conditional: 'text-amber-700 bg-amber-50 border-amber-200',
      monitoring: 'text-orange-700 bg-orange-50 border-orange-200'
    };
    return styles[status] || styles.qualified;
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-emerald-700';
    if (score >= 70) return 'text-amber-700';
    return 'text-orange-700';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Ultra-minimal header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Vendor Intelligence</div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-medium text-gray-700 hover:text-black transition-colors uppercase tracking-wider"
            >
              New Assessment
            </button>
            <button className="px-4 py-1.5 text-xs font-medium bg-black text-white hover:bg-gray-900 transition-colors uppercase tracking-wider">
              Contact
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Value Proposition Hero */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-black tracking-tight mb-3">
            Autonomous Vendor Due Diligence
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Transform 90-day vendor assessments into 30-minute decision-ready intelligence
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-600"></div>
              <span className="text-gray-700">Comprehensive 5-pillar analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-600"></div>
              <span className="text-gray-700">Actionable CAPA recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-600"></div>
              <span className="text-gray-700">Risk-based contract playbooks</span>
            </div>
          </div>
        </div>

        {/* ═══ CLIENT PORTFOLIO SHOWCASE: ENCEVO ═══ */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider">Client Portfolio Intelligence</span>
            </div>
            <h2 className="text-2xl font-light text-black tracking-tight mb-2">Supplier Portfolio Assessment</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              10 strategic suppliers assessed across Financial Stability, ESG & Sustainability, Regulatory & Legal,
              Cybersecurity, Operational Resilience, and Reputational Intelligence
            </p>
          </div>

          {/* Portfolio Summary Card */}
          <div
            className="border-2 border-black mb-8 cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => navigate('/report/encevo-portfolio')}
          >
            <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium uppercase tracking-wider">Portfolio Risk Report</span>
              </div>
              <span className="text-xs opacity-75 group-hover:opacity-100 transition-opacity">View Full Report →</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-5 gap-6">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Portfolio Score</div>
                  <div className={`text-3xl font-light ${getRiskColor(portfolioReport.portfolioScore)}`}>
                    {portfolioReport.portfolioScore}<span className="text-sm text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Suppliers Assessed</div>
                  <div className="text-3xl font-light text-black">{portfolioReport.suppliersAssessed}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Conditional</div>
                  <div className="text-3xl font-light text-amber-700">{portfolioReport.highlights.conditional}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Monitoring</div>
                  <div className="text-3xl font-light text-orange-700">{portfolioReport.highlights.monitoring}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Critical Flags</div>
                  <div className="text-3xl font-light text-red-700">{portfolioReport.highlights.criticalFlags}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Supplier Report Cards - 5x2 Grid */}
          <div className="grid grid-cols-5 gap-4 mb-12">
            {featuredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white border border-gray-200 hover:border-black hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => navigate(`/report/${vendor.id}`)}
              >
                {/* Status indicator bar */}
                <div className={`h-1 ${
                  vendor.status === 'qualified' ? 'bg-emerald-500' :
                  vendor.status === 'monitoring' ? 'bg-orange-500' :
                  'bg-amber-500'
                }`}></div>

                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-black mb-0.5 group-hover:text-gray-700 transition-colors leading-tight">
                      {vendor.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-tight">{vendor.industry}</p>
                    <p className="text-[10px] text-gray-400">{vendor.location}</p>
                  </div>

                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className={`text-2xl font-light ${getRiskColor(vendor.riskScore)}`}>
                        {vendor.riskScore}
                      </div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wider">Score</div>
                    </div>
                    <span className={`inline-flex px-1.5 py-0.5 text-[9px] font-medium border uppercase tracking-wider ${getStatusStyle(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500">Financial</span>
                      <span className={`font-medium ${getRiskColor(vendor.keyMetrics.financial)}`}>{vendor.keyMetrics.financial}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500">ESG</span>
                      <span className={`font-medium ${getRiskColor(vendor.keyMetrics.esg)}`}>{vendor.keyMetrics.esg}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500">Cyber</span>
                      <span className={`font-medium ${getRiskColor(vendor.keyMetrics.cybersecurity)}`}>{vendor.keyMetrics.cybersecurity}</span>
                    </div>
                  </div>

                  <button
                    className="w-full py-1.5 text-[10px] font-medium bg-black text-white group-hover:bg-gray-900 transition-colors uppercase tracking-wider"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/report/${vendor.id}`);
                    }}
                  >
                    View Report →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-slate-50 border-y border-gray-200 py-12 -mx-8 px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-light text-black text-center mb-8">How Spectrum Works</h3>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">1</div>
                <h4 className="text-sm font-medium text-black mb-2">Send Vendor Names</h4>
                <p className="text-xs text-gray-600">Share your supplier list via email, spreadsheet, or API integration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">2</div>
                <h4 className="text-sm font-medium text-black mb-2">AI Analysis Engine</h4>
                <p className="text-xs text-gray-600">Multi-agent AI autonomously gathers data and performs comprehensive risk analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">3</div>
                <h4 className="text-sm font-medium text-black mb-2">Receive Reports</h4>
                <p className="text-xs text-gray-600">Get decision-ready intelligence reports with CAPA plans and contract recommendations</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Turnaround:</span> 24-48 hours vs. 90+ days manual process
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-12">
          <h3 className="text-lg font-light text-black text-center mb-6">Active Vendor Portfolio</h3>
          <p className="text-xs text-gray-500 text-center mb-8">Continuous monitoring and risk tracking for your existing suppliers</p>
        </div>

        {/* Data-forward stats */}
        <div className="grid grid-cols-6 gap-px bg-gray-200 border border-gray-200 mb-12">
          <div className="bg-white p-6">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Total</div>
            <div className="text-3xl font-light text-black">{stats.total}</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Qualified</div>
            <div className="text-3xl font-light text-emerald-700">{stats.qualified}</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Conditional</div>
            <div className="text-3xl font-light text-amber-700">{stats.conditional}</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Monitoring</div>
            <div className="text-3xl font-light text-orange-700">{stats.monitoring}</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Actions Due</div>
            <div className="text-3xl font-light text-red-700">{stats.capaOverdue}</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Avg Score</div>
            <div className="text-3xl font-light text-black">{stats.avgRiskScore}</div>
          </div>
        </div>

        {/* Minimal filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4 text-xs uppercase tracking-wider">
            <button
              onClick={() => setFilterStatus('all')}
              className={`font-medium transition-colors ${
                filterStatus === 'all' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('qualified')}
              className={`font-medium transition-colors ${
                filterStatus === 'qualified' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Qualified ({stats.qualified})
            </button>
            <button
              onClick={() => setFilterStatus('conditional')}
              className={`font-medium transition-colors ${
                filterStatus === 'conditional' ? 'text-amber-700' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Conditional ({stats.conditional})
            </button>
            <button
              onClick={() => setFilterStatus('monitoring')}
              className={`font-medium transition-colors ${
                filterStatus === 'monitoring' ? 'text-orange-700' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Monitoring ({stats.monitoring})
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-3 py-1.5 text-xs border border-gray-300 focus:outline-none focus:border-black transition-colors"
            />
            <svg
              className="absolute right-3 top-2 w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Data table - Bloomberg style */}
        <div className="border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Last Review
                </th>
                <th className="px-6 py-3 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => {
                    if (vendor.fullReport) {
                      navigate(`/report/${vendor.id}`);
                    } else {
                      navigate(`/portfolio/${vendor.id}`);
                    }
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-sm text-black">{vendor.name}</div>
                        <div className="text-xs text-gray-500">{vendor.location}</div>
                      </div>
                      {vendor.fullReport && (
                        <span className="px-1.5 py-0.5 bg-black text-white text-[9px] font-medium uppercase tracking-wider">
                          Full Report
                        </span>
                      )}
                      {vendor.isLiveAssessment && (
                        <span className="px-1.5 py-0.5 bg-green-600 text-white text-[9px] font-medium uppercase tracking-wider">
                          Recently Assessed
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-700">{vendor.industry}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`text-2xl font-light ${getRiskColor(vendor.riskScore)}`}>
                      {vendor.riskScore}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium border uppercase tracking-wider ${getStatusStyle(vendor.status)}`}>
                        {vendor.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {vendor.capaCount > 0 ? (
                      <div>
                        <div className="text-sm font-medium text-black">{vendor.capaCount}</div>
                        {vendor.capaDue > 0 && (
                          <div className="text-[10px] text-red-700 uppercase tracking-wider">
                            {vendor.capaDue} overdue
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`text-[10px] font-medium uppercase tracking-wider ${
                        vendor.criticality === 'High' ? 'text-red-700' :
                        vendor.criticality === 'Medium' ? 'text-amber-700' :
                        'text-gray-500'
                      }`}>
                        {vendor.criticality}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-600">
                      {new Date(vendor.lastAssessment).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {vendor.isLiveAssessment ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Remove ${vendor.name} from portfolio?`)) {
                            removeLiveVendor(vendor.id);
                          }
                        }}
                        className="px-2 py-1 text-[10px] font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100"
                        title="Remove from portfolio"
                      >
                        Remove ×
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            hideMockVendor(vendor.id);
                          }}
                          className="px-2 py-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors uppercase tracking-wider opacity-0 group-hover:opacity-100"
                          title="Hide from portfolio"
                        >
                          Hide
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (vendor.fullReport) {
                              navigate(`/report/${vendor.id}`);
                            } else {
                              navigate(`/portfolio/${vendor.id}`);
                            }
                          }}
                          className="text-[10px] font-medium text-black opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider"
                        >
                          {vendor.fullReport ? 'View Full Report →' : 'View →'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVendors.length === 0 && (
          <div className="border border-gray-200 p-16 text-center">
            <div className="text-sm text-gray-500 mb-2">No vendors found</div>
            <button
              onClick={() => {
                setFilterStatus('all');
                setSearchQuery('');
              }}
              className="text-xs text-black hover:text-gray-600 uppercase tracking-wider"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Hidden Vendors Section */}
        {hiddenVendorsList.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowHidden(!showHidden)}
              className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-700 uppercase tracking-wider mb-4"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showHidden ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Hidden Vendors ({hiddenVendorsList.length})
            </button>

            {showHidden && (
              <div className="border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Industry
                      </th>
                      <th className="px-6 py-3 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Risk
                      </th>
                      <th className="px-6 py-3 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {hiddenVendorsList.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium text-sm text-gray-400">{vendor.name}</div>
                              <div className="text-xs text-gray-400">{vendor.location}</div>
                            </div>
                            {vendor.fullReport && (
                              <span className="px-1.5 py-0.5 bg-gray-300 text-gray-600 text-[9px] font-medium uppercase tracking-wider">
                                Full Report
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-400">{vendor.industry}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-2xl font-light text-gray-400">
                            {vendor.riskScore}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className="inline-flex px-2 py-0.5 text-[10px] font-medium border uppercase tracking-wider text-gray-400 bg-gray-50 border-gray-200">
                              {vendor.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => restoreMockVendor(vendor.id)}
                            className="px-2 py-1 text-[10px] font-medium text-green-600 hover:text-green-800 hover:bg-green-50 transition-colors uppercase tracking-wider"
                            title="Restore to portfolio"
                          >
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorPortfolio;
