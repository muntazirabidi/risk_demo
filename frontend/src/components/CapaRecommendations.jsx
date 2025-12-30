import { useState } from 'react';

function CapaRecommendations({ findings, companyName }) {
  const [expandedCapa, setExpandedCapa] = useState(null);

  // Generate CAPA recommendations based on findings
  const generateCapas = () => {
    const capas = [];
    let capaId = 1;

    findings.forEach((finding) => {
      const riskLevel = (finding.riskLevel || '').toLowerCase();

      // Generate CAPAs for High, Critical, and Medium risks
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

  const getPriorityConfig = (priority) => {
    const configs = {
      HIGH: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
        dotColor: 'bg-red-500'
      },
      MEDIUM: {
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-300',
        dotColor: 'bg-amber-500'
      }
    };
    return configs[priority] || configs.MEDIUM;
  };

  const capas = generateCapas();

  if (capas.length === 0) {
    return (
      <div className="mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">No Corrective Actions Required</h3>
          <p className="text-emerald-700">
            {companyName} demonstrates strong performance across all risk dimensions with no critical findings requiring immediate action.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Corrective Action Plan (CAPA)</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Required actions to address identified risks. All CAPAs must be completed by specified deadlines.
          </p>
        </div>

        {/* CAPA List */}
        <div className="divide-y divide-slate-200">
          {capas.map((capa, index) => {
            const isExpanded = expandedCapa === capa.id;
            const priorityConfig = getPriorityConfig(capa.priority);

            return (
              <div key={capa.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Priority Badge */}
                  <div className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-bold border-2 ${priorityConfig.bgColor} ${priorityConfig.textColor} ${priorityConfig.borderColor}`}>
                    {capa.priority}
                  </div>

                  {/* CAPA Content */}
                  <div className="flex-1">
                    {/* Title Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{capa.id}: {capa.title}</h4>
                        <p className="text-sm text-slate-600">{capa.description}</p>
                      </div>
                      <button
                        onClick={() => setExpandedCapa(isExpanded ? null : capa.id)}
                        className="ml-4 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'Show More'} →
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-slate-600">Owner: <span className="font-semibold text-slate-900">{capa.owner}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-600">Due: <span className="font-semibold text-red-700">{capa.dueDate}</span></span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 space-y-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div>
                          <h5 className="text-sm font-bold text-slate-900 mb-2">Recommended Actions:</h5>
                          <p className="text-sm text-slate-700 leading-relaxed">{capa.recommendation}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900 mb-2">Verification Criteria:</h5>
                          <ul className="space-y-1">
                            {capa.verificationCriteria.map((criteria, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                <svg className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <div className="bg-slate-50 p-4 border-t border-slate-200">
          <p className="text-xs text-slate-600 text-center">
            All CAPAs must be completed by specified deadlines. Monthly progress reviews required for HIGH priority items.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CapaRecommendations;
