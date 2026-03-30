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

  useEffect(() => {
    const loadData = () => {
      const storedLive = localStorage.getItem('liveVendors');
      if (storedLive) setLiveVendors(JSON.parse(storedLive));
      const storedHidden = localStorage.getItem('hiddenMockVendors');
      if (storedHidden) setHiddenMockVendors(JSON.parse(storedHidden));
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const removeLiveVendor = (vendorId) => {
    const updated = liveVendors.filter(v => v.id !== vendorId);
    setLiveVendors(updated);
    localStorage.setItem('liveVendors', JSON.stringify(updated));
  };

  const hideMockVendor = (vendorId) => {
    if (!hiddenMockVendors.includes(vendorId)) {
      const updated = [...hiddenMockVendors, vendorId];
      setHiddenMockVendors(updated);
      localStorage.setItem('hiddenMockVendors', JSON.stringify(updated));
    }
  };

  const restoreMockVendor = (vendorId) => {
    const updated = hiddenMockVendors.filter(id => id !== vendorId);
    setHiddenMockVendors(updated);
    localStorage.setItem('hiddenMockVendors', JSON.stringify(updated));
  };

  const visibleMockVendors = mockVendors.filter(v => !hiddenMockVendors.includes(v.id));
  const hiddenVendorsList = mockVendors.filter(v => hiddenMockVendors.includes(v.id));

  const allVendors = [...liveVendors, ...visibleMockVendors].sort((a, b) => {
    if (a.fullReport && !b.fullReport) return -1;
    if (!a.fullReport && b.fullReport) return 1;
    if (a.isLiveAssessment && !b.isLiveAssessment) return -1;
    if (!a.isLiveAssessment && b.isLiveAssessment) return 1;
    return new Date(b.lastAssessment || b.assessmentDate) - new Date(a.lastAssessment || a.assessmentDate);
  });

  const featuredVendors = visibleMockVendors.filter(v => v.fullReport === true);
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
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-6">
            <button onClick={() => navigate('/')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </button>
            <button onClick={() => navigate('/')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              New Assessment
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
              Book a Demo
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="max-w-[1200px] mx-auto px-8 pt-16 pb-12">
        <p className="text-sm text-slate-400 uppercase tracking-widest mb-3">Supplier Portfolio</p>
        <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-3">
          {featuredVendors.length} vendors assessed. <span className="text-slate-400">Decision-ready intelligence.</span>
        </h1>
        <p className="text-base text-slate-500 max-w-2xl">
          Each supplier assessed across Financial Stability, ESG, Regulatory & Legal, Cybersecurity, Operational Resilience, and Reputational Intelligence.
        </p>
      </section>

      {/* ─── Portfolio Report Banner ─── */}
      <section className="max-w-[1200px] mx-auto px-8 pb-12">
        <div
          className="bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer group"
          onClick={() => navigate('/report/encevo-portfolio')}
        >
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Portfolio Report</div>
              <div className="text-lg font-medium text-white">Aggregated Risk Intelligence</div>
              <div className="text-sm text-slate-400 mt-1">Cross-portfolio analysis with concentration risks, systemic flags, and remediation priorities</div>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-center">
                <div className="text-3xl font-light font-mono text-amber-400">{portfolioReport.portfolioScore}</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light font-mono text-white">{portfolioReport.suppliersAssessed}</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light font-mono text-amber-400">{portfolioReport.highlights.conditional}</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Conditional</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light font-mono text-red-400">{portfolioReport.highlights.criticalFlags}</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Flags</div>
              </div>
              <div className="text-sm text-slate-500 group-hover:text-white transition-colors whitespace-nowrap">View report →</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Vendor Cards ─── */}
      <section className="border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <p className="text-sm text-slate-400 uppercase tracking-widest mb-6">Individual Assessments</p>
          <div className="grid grid-cols-5 gap-4">
            {featuredVendors.map((vendor) => {
              const borderColor = vendor.riskScore >= 80 ? 'border-l-emerald-500' :
                                  vendor.riskScore >= 70 ? 'border-l-amber-500' :
                                  vendor.riskScore >= 60 ? 'border-l-orange-500' : 'border-l-red-500';
              return (
                <div
                  key={vendor.id}
                  className={`border border-slate-200 border-l-[3px] ${borderColor} hover:border-slate-400 hover:border-l-[3px] ${borderColor} transition-all cursor-pointer group`}
                  onClick={() => navigate(`/report/${vendor.id}`)}
                >
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-slate-900 leading-tight group-hover:text-slate-700 transition-colors">
                        {vendor.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{vendor.industry}</p>
                    </div>

                    <div className={`text-2xl font-mono mb-2 ${getRiskColor(vendor.riskScore)}`}>
                      {vendor.riskScore}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-medium uppercase tracking-wider ${
                        vendor.status === 'monitoring' ? 'text-orange-600' : vendor.status === 'qualified' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {vendor.status}
                      </span>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-900 transition-colors">View →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="grid grid-cols-6 gap-8">
            {[
              { value: stats.total, label: 'Total vendors', color: 'text-slate-900' },
              { value: stats.qualified, label: 'Qualified', color: 'text-emerald-600' },
              { value: stats.conditional, label: 'Conditional', color: 'text-amber-600' },
              { value: stats.monitoring, label: 'Monitoring', color: 'text-orange-600' },
              { value: stats.capaOverdue, label: 'Actions overdue', color: 'text-red-600', urgent: true },
              { value: stats.avgRiskScore, label: 'Avg score', color: getRiskColor(stats.avgRiskScore) },
            ].map((stat) => (
              <div key={stat.label} className={stat.urgent ? 'bg-red-50 -m-3 p-3 border border-red-100' : ''}>
                <div className={`text-4xl font-light font-mono ${stat.color}`}>{stat.value}</div>
                <div className={`text-sm mt-1 ${stat.urgent ? 'text-red-600 font-medium' : 'text-slate-400'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vendor Table ─── */}
      <section className="border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6">
              {[
                { key: 'all', label: 'All', count: stats.total, color: 'text-slate-900' },
                { key: 'qualified', label: 'Qualified', count: stats.qualified, color: 'text-emerald-700' },
                { key: 'conditional', label: 'Conditional', count: stats.conditional, color: 'text-amber-700' },
                { key: 'monitoring', label: 'Monitoring', count: stats.monitoring, color: 'text-orange-700' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`text-sm transition-colors ${
                    filterStatus === f.key ? f.color + ' font-medium' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {f.label} <span className="text-xs">({f.count})</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 px-3 py-2 text-sm border border-slate-200 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          {/* Table */}
          <div className="border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-3 text-left text-[10px] font-medium text-slate-400 uppercase tracking-widest">Vendor</th>
                  <th className="px-5 py-3 text-left text-[10px] font-medium text-slate-400 uppercase tracking-widest">Industry</th>
                  <th className="px-5 py-3 text-right text-[10px] font-medium text-slate-400 uppercase tracking-widest">Score</th>
                  <th className="px-5 py-3 text-center text-[10px] font-medium text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-5 py-3 text-center text-[10px] font-medium text-slate-400 uppercase tracking-widest">CAPA</th>
                  <th className="px-5 py-3 text-left text-[10px] font-medium text-slate-400 uppercase tracking-widest">Last Review</th>
                  <th className="px-5 py-3 text-right text-[10px] font-medium text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => vendor.fullReport ? navigate(`/report/${vendor.id}`) : navigate(`/portfolio/${vendor.id}`)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{vendor.name}</div>
                          <div className="text-xs text-slate-400">{vendor.location}</div>
                        </div>
                        {vendor.fullReport && (
                          <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[8px] font-medium uppercase tracking-wider">Report</span>
                        )}
                        {vendor.isLiveAssessment && (
                          <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[8px] font-medium uppercase tracking-wider">Live</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{vendor.industry}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`text-lg font-light font-mono ${getRiskColor(vendor.riskScore)}`}>{vendor.riskScore}</span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 text-[9px] font-medium border uppercase tracking-wider ${getStatusStyle(vendor.status)}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {vendor.capaCount > 0 ? (
                        <div>
                          <span className="text-sm font-mono text-slate-900">{vendor.capaCount}</span>
                          {vendor.capaDue > 0 && (
                            <span className="text-[9px] text-red-600 ml-1">{vendor.capaDue} due</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">
                      {new Date(vendor.lastAssessment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {vendor.fullReport ? 'View report →' : 'View →'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="border border-slate-200 border-t-0 p-12 text-center">
              <p className="text-sm text-slate-500 mb-2">No vendors match your filters.</p>
              <button onClick={() => { setFilterStatus('all'); setSearchQuery(''); }} className="text-sm text-slate-900 hover:underline">
                Clear filters
              </button>
            </div>
          )}

          {/* Hidden vendors */}
          {hiddenVendorsList.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => setShowHidden(!showHidden)}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showHidden ? 'Hide' : 'Show'} {hiddenVendorsList.length} hidden vendor{hiddenVendorsList.length > 1 ? 's' : ''}
              </button>

              {showHidden && (
                <div className="mt-4 border border-slate-200">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-100">
                      {hiddenVendorsList.map((vendor) => (
                        <tr key={vendor.id} className="text-slate-400">
                          <td className="px-5 py-3 text-sm">{vendor.name}</td>
                          <td className="px-5 py-3 text-xs">{vendor.industry}</td>
                          <td className="px-5 py-3 text-right font-mono">{vendor.riskScore}</td>
                          <td className="px-5 py-3 text-right">
                            <button onClick={() => restoreMockVendor(vendor.id)} className="text-xs text-emerald-600 hover:text-emerald-800">
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
      </section>
    </div>
  );
}

export default VendorPortfolio;
