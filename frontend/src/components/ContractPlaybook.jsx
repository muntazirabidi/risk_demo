import { useState } from 'react';

function ContractPlaybook({ assessment, companyName }) {
  const [expandedSection, setExpandedSection] = useState(null);

  // Generate contract recommendations based on risk assessment
  const generatePlaybook = () => {
    const riskScore = assessment.overallRiskScore;
    const findings = assessment.findings;

    // Determine contract strategy based on risk level
    let strategy = 'Standard';
    let strategyColor = 'emerald';
    if (riskScore < 70) {
      strategy = 'Enhanced Protections';
      strategyColor = 'red';
    } else if (riskScore < 80) {
      strategy = 'Moderate Safeguards';
      strategyColor = 'amber';
    }

    const sections = [
      {
        id: 'term-termination',
        title: 'Term & Termination Rights',
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        ),
        clauses: [
          {
            title: 'Initial Term',
            recommendation: riskScore < 70 ? '12 months with quarterly reviews' : '24-36 months with annual reviews',
            rationale: riskScore < 70 ? 'Shorter term allows for more frequent re-evaluation due to identified risks' : 'Standard term appropriate for stable risk profile'
          },
          {
            title: 'Termination for Convenience',
            recommendation: riskScore < 70 ? '30 days notice without penalty' : '60 days notice',
            rationale: 'Maintain flexibility to exit relationship if risks materialize'
          },
          {
            title: 'Termination for Cause',
            recommendation: 'Immediate termination upon material breach, including: (a) sanctions violations, (b) ESG policy breaches, (c) cybersecurity incidents affecting client data',
            rationale: 'Protect against emerging risks identified in assessment'
          }
        ]
      },
      {
        id: 'performance-sla',
        title: 'Performance & SLAs',
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        ),
        clauses: [
          {
            title: 'Quality Standards',
            recommendation: 'First-pass yield ≥98%, PPM defects ≤500, zero critical defects',
            rationale: 'Industry-standard quality requirements with robust monitoring'
          },
          {
            title: 'Delivery Performance',
            recommendation: 'On-time, in-full (OTIF) ≥95%, with penalties for underperformance',
            rationale: 'Ensure supply continuity and business reliability'
          },
          {
            title: 'Service Level Credits',
            recommendation: '2% credit per percentage point below SLA threshold, max 10% per quarter',
            rationale: 'Financial incentive for performance maintenance'
          }
        ]
      },
      {
        id: 'compliance-audit',
        title: 'Compliance & Audit Rights',
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        ),
        clauses: [
          {
            title: 'Audit Rights',
            recommendation: riskScore < 70 ? 'Quarterly audits (announced), annual surprise audits' : 'Annual audits with 30 days notice',
            rationale: riskScore < 70 ? 'Enhanced monitoring due to risk factors' : 'Standard oversight provisions'
          },
          {
            title: 'Compliance Certifications',
            recommendation: 'Maintain ISO 9001, IATF 16949, ISO 14001, ISO 45001. Provide updated certificates annually.',
            rationale: 'Ensure ongoing compliance with quality, environmental, and safety standards'
          },
          {
            title: 'Sanctions Compliance',
            recommendation: 'Quarterly sanctions screening. Immediate notification of any hits. Supplier must maintain OFAC/UN/EU sanctions compliance.',
            rationale: 'Critical for regulatory compliance and reputational protection'
          }
        ]
      },
      {
        id: 'data-security',
        title: 'Data Security & IP Protection',
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        ),
        clauses: [
          {
            title: 'Cybersecurity Requirements',
            recommendation: riskScore < 75 ? 'SOC 2 Type II certification required within 12 months. Annual penetration testing.' : 'Maintain ISO 27001 certification. Annual security audits.',
            rationale: 'Protect sensitive data and intellectual property'
          },
          {
            title: 'Data Residency',
            recommendation: 'Client data must be stored in approved jurisdictions only. No data transfer to high-risk countries without written approval.',
            rationale: 'Compliance with data protection regulations'
          },
          {
            title: 'Breach Notification',
            recommendation: '24-hour notification of any security incident affecting client data or systems',
            rationale: 'Enable rapid incident response and mitigation'
          }
        ]
      },
      {
        id: 'esg-sustainability',
        title: 'ESG & Sustainability',
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
        clauses: [
          {
            title: 'ESG Commitments',
            recommendation: 'Supplier must track Scope 1, 2, and 3 emissions. Set science-based reduction targets within 12 months. Increase renewable energy to 30% by end of contract year.',
            rationale: 'Alignment with corporate sustainability goals and regulatory requirements'
          },
          {
            title: 'Human Rights Due Diligence',
            recommendation: 'Complete Tier 2 and Tier 3 supply chain mapping. No sourcing from regions with forced labor concerns without documented due diligence.',
            rationale: 'Compliance with human rights standards and reputational protection'
          },
          {
            title: 'Conflict Minerals',
            recommendation: 'Annual CMRT submission. All smelters must be RMI-validated. Alternative sourcing plan for non-compliant smelters.',
            rationale: 'Regulatory compliance (Dodd-Frank, EU regulations)'
          }
        ]
      },
      {
        id: 'liability-insurance',
        title: 'Liability & Insurance',
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
        clauses: [
          {
            title: 'Liability Cap',
            recommendation: riskScore < 70 ? 'Unlimited liability for gross negligence, willful misconduct, IP infringement, data breaches' : 'Standard liability cap at 12 months fees, unlimited for specific breaches',
            rationale: 'Appropriate risk allocation based on supplier profile'
          },
          {
            title: 'Insurance Requirements',
            recommendation: `General Liability: $${riskScore < 70 ? '5M' : '3M'}, Professional Liability: $${riskScore < 70 ? '3M' : '2M'}, Cyber Insurance: $${riskScore < 75 ? '5M' : '2M'}`,
            rationale: 'Adequate coverage for potential risks'
          },
          {
            title: 'Indemnification',
            recommendation: 'Supplier indemnifies client for: (a) third-party IP claims, (b) supplier negligence/misconduct, (c) regulatory penalties arising from supplier non-compliance',
            rationale: 'Protection against supplier-caused losses'
          }
        ]
      }
    ];

    return { strategy, strategyColor, sections };
  };

  const playbook = generatePlaybook();

  return (
    <div className="mb-8">
      <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 backdrop-blur rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Contract Playbook</h3>
          </div>
          <p className="text-indigo-100 text-sm mb-4">
            Risk-based contract recommendations tailored to {companyName}'s risk profile
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-lg border-2 border-white/20`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-bold">Recommended Strategy: {playbook.strategy}</span>
          </div>
        </div>

        {/* Contract Sections */}
        <div className="divide-y divide-slate-200">
          {playbook.sections.map((section) => {
            const isExpanded = expandedSection === section.id;

            return (
              <div key={section.id} className="p-6 hover:bg-slate-50 transition-colors">
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {section.icon}
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {section.title}
                    </h4>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {section.clauses.map((clause, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h5 className="text-sm font-bold text-slate-900 mb-2">{clause.title}</h5>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-semibold text-indigo-600 mb-1">RECOMMENDED CLAUSE:</p>
                            <p className="text-sm text-slate-800 leading-relaxed">{clause.recommendation}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-1">RATIONALE:</p>
                            <p className="text-xs text-slate-600 leading-relaxed italic">{clause.rationale}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200">
          <p className="text-xs text-slate-600 text-center">
            These recommendations should be reviewed by legal counsel and adapted to specific jurisdictional requirements and business needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContractPlaybook;
