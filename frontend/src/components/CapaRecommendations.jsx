import { useState } from 'react';

function CapaRecommendations({ findings, companyName }) {
  const [expandedCapa, setExpandedCapa] = useState(null);

  const generateCapas = () => {
    const capas = [];
    let capaId = 1;

    findings.forEach((finding) => {
      const riskLevel = (finding.riskLevel || '').toLowerCase();
      if (riskLevel === 'high' || riskLevel === 'critical' || riskLevel === 'medium') {
        const capa = {
          id: `CAPA-${String(capaId).padStart(3, '0')}`,
          priority: riskLevel === 'critical' ? 'HIGH' : riskLevel.toUpperCase(),
          title: `Address ${finding.category} Concerns`,
          description: finding.details || finding.description,
          recommendation: generateRecommendation(finding),
          owner: assignOwner(finding.category),
          dueDate: calculateDueDate(riskLevel),
          verificationCriteria: generateVerification(finding.category),
          category: finding.category
        };
        capas.push(capa);
        capaId++;
      }
    });

    return capas;
  };

  const generateRecommendation = (finding) => {
    const recommendations = {
      'Financial Health': 'Conduct quarterly financial reviews and establish minimum liquidity requirements. Request updated financial statements and credit ratings. Consider implementing milestone-based payments.',
      'ESG & Sustainability': 'Implement Scope 3 emissions tracking system. Set science-based reduction targets aligned with 1.5°C pathway. Increase renewable energy usage to 30% by end of year. Engage suppliers on emissions reduction.',
      'Human Rights & Labor': 'Complete Tier 3 supply chain mapping for critical materials. Conduct due diligence on high-risk suppliers. Implement supplier code of conduct cascade requirements. Provide alternative sourcing plan for high-risk regions.',
      'Sanctions & Compliance': 'Validate all smelters through RMI Responsible Minerals Assurance Process. Work with suppliers to ensure RMI validation. Qualify alternative RMI-validated smelters if needed. Update CMRT documentation.',
      'Cybersecurity': 'Implement enhanced cybersecurity controls including SOC 2 Type II certification. Conduct annual penetration testing. Establish incident response protocol with 24-hour notification requirement. Provide quarterly security updates.'
    };
    return recommendations[finding.category] || 'Implement corrective actions to address identified risks and provide evidence of compliance.';
  };

  const assignOwner = (category) => {
    const owners = {
      'Financial Health': 'CFO / Finance Director',
      'ESG & Sustainability': 'Sustainability Manager',
      'Human Rights & Labor': 'Supply Chain Director',
      'Sanctions & Compliance': 'Compliance Officer',
      'Cybersecurity': 'IT Security Manager'
    };
    return owners[category] || 'Operations Director';
  };

  const calculateDueDate = (riskLevel) => {
    const today = new Date();
    const level = (riskLevel || '').toLowerCase();
    const daysToAdd = (level === 'high' || level === 'critical') ? 30 : 90;
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + daysToAdd);
    return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const generateVerification = (category) => {
    const verifications = {
      'Financial Health': ['Updated financial statements', 'Credit rating report', 'Payment history documentation'],
      'ESG & Sustainability': ['Scope 3 inventory report', 'SBT commitment letter', 'Renewable energy utilization report'],
      'Human Rights & Labor': ['Supplier mapping report', 'Risk assessment documentation', 'Alternative sourcing plan'],
      'Sanctions & Compliance': ['Updated CMRT with RMI certificates', 'Smelter validation documentation', 'Compliance audit report'],
      'Cybersecurity': ['SOC 2 Type II certificate', 'Penetration test results', 'Incident response plan documentation']
    };
    return verifications[category] || ['Documentation of corrective actions', 'Evidence of compliance'];
  };

  const getPriorityStyle = (priority) => {
    if (priority === 'HIGH') return { badge: 'bg-red-50 text-red-800 border-red-200', dot: 'bg-red-500' };
    return { badge: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
  };

  const capas = generateCapas();

  if (capas.length === 0) {
    return (
      <div className="mb-8">
        <div className="bg-emerald-50 border border-emerald-200 p-8 text-center">
          <div className="w-10 h-10 bg-emerald-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">No Corrective Actions Required</h3>
          <p className="text-sm text-emerald-700">
            {companyName} demonstrates strong performance across all risk dimensions with no critical findings requiring immediate action.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5">
          <h3 className="text-lg font-light text-white tracking-tight">Corrective Action Plan (CAPA)</h3>
          <p className="text-sm text-slate-400 mt-1">
            Required actions to address identified risks. All CAPAs must be completed by specified deadlines.
          </p>
        </div>

        {/* CAPA List */}
        <div className="divide-y divide-slate-200">
          {capas.map((capa) => {
            const isExpanded = expandedCapa === capa.id;
            const priorityStyle = getPriorityStyle(capa.priority);

            return (
              <div key={capa.id} className="px-6 py-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Priority Badge */}
                  <span className={`flex-shrink-0 px-2.5 py-0.5 text-[10px] font-semibold border uppercase tracking-wider ${priorityStyle.badge}`}>
                    {capa.priority}
                  </span>

                  {/* CAPA Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">
                          <span className="font-mono text-slate-500">{capa.id}</span> {capa.title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{capa.description}</p>
                      </div>
                      <button
                        onClick={() => setExpandedCapa(isExpanded ? null : capa.id)}
                        className="ml-4 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
                      >
                        {isExpanded ? 'Collapse' : 'Expand'} →
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Owner: <span className="font-medium text-slate-900">{capa.owner}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Due: <span className="font-medium text-red-700">{capa.dueDate}</span></span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 space-y-4 bg-slate-50 border border-slate-200 p-4">
                        <div>
                          <h5 className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Recommended Actions</h5>
                          <p className="text-sm text-slate-700 leading-relaxed">{capa.recommendation}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Verification Criteria</h5>
                          <ul className="space-y-1.5">
                            {capa.verificationCriteria.map((criteria, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                <svg className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider text-center">
            All CAPAs must be completed by specified deadlines. Monthly progress reviews required for HIGH priority items.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CapaRecommendations;
