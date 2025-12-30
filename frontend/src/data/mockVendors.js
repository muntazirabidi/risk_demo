// Mock vendor portfolio data for demo
// Focused on Saudi Arabia and regional suppliers

export const mockVendors = [
  // FEATURED VENDORS - These have full comprehensive reports
  {
    id: 'palantir-featured',
    name: 'Palantir Technologies Inc.',
    industry: 'Software & Data Analytics',
    location: 'Denver, Colorado, USA',
    riskScore: 82,
    status: 'qualified',
    tier: 'Tier 1 Strategic',
    annualSpend: '$8.2M',
    relationship: '4 Years',
    lastAssessment: '2025-12-20',
    nextReview: '2026-03-20',
    capaCount: 2,
    capaDue: 0,
    keyMetrics: {
      financial: 85,
      esg: 78,
      humanRights: 82,
      sanctions: 90,
      cybersecurity: 88
    },
    summary: 'Leading data analytics platform provider with strong government contracts and robust security infrastructure.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/palantir-report.html'
  },
  {
    id: 'plugpower-featured',
    name: 'Plug Power Inc.',
    industry: 'Clean Energy & Hydrogen',
    location: 'Latham, New York, USA',
    riskScore: 74,
    status: 'conditional',
    tier: 'Tier 1',
    annualSpend: '$6.5M',
    relationship: '3 Years',
    lastAssessment: '2025-12-18',
    nextReview: '2026-02-18',
    capaCount: 4,
    capaDue: 2,
    keyMetrics: {
      financial: 68,
      esg: 82,
      humanRights: 76,
      sanctions: 88,
      cybersecurity: 70
    },
    summary: 'Hydrogen fuel cell systems provider with strong ESG commitment. Supply chain concentration risks and financial monitoring required.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/plugpower-report.html'
  },
  {
    id: 'servicenow-featured',
    name: 'ServiceNow, Inc.',
    industry: 'Enterprise Software & Cloud Services',
    location: 'Santa Clara, California, USA',
    riskScore: 78,
    status: 'qualified',
    tier: 'Tier 1',
    annualSpend: '$5.8M',
    relationship: '5 Years',
    lastAssessment: '2025-12-22',
    nextReview: '2026-03-22',
    capaCount: 1,
    capaDue: 0,
    keyMetrics: {
      financial: 80,
      esg: 75,
      humanRights: 78,
      sanctions: 85,
      cybersecurity: 82
    },
    summary: 'Leading enterprise cloud platform provider with strong financial health, comprehensive security controls, and solid ESG practices.',
    criticality: 'Medium',
    fullReport: true,
    reportUrl: '/reports/servicenow-report.html'
  },

  // SAMPLE VENDORS - Mock data for demo purposes
  {
    id: 'sabic-001',
    name: 'Saudi Basic Industries Corporation (SABIC)',
    industry: 'Chemicals & Petrochemicals',
    location: 'Riyadh, Saudi Arabia',
    riskScore: 82,
    status: 'qualified',
    tier: 'Tier 1 Strategic',
    annualSpend: '$12.4M',
    relationship: '8 Years',
    lastAssessment: '2025-11-15',
    nextReview: '2026-02-15',
    capaCount: 0,
    capaDue: 0,
    keyMetrics: {
      financial: 88,
      esg: 85,
      humanRights: 82,
      sanctions: 92,
      cybersecurity: 78
    },
    summary: 'Leading petrochemical manufacturer with strong financial position and comprehensive ESG programs.',
    criticality: 'High'
  },
  {
    id: 'zamil-002',
    name: 'Al Zamil Group',
    industry: 'Industrial Manufacturing',
    location: 'Dammam, Saudi Arabia',
    riskScore: 76,
    status: 'conditional',
    tier: 'Tier 1',
    annualSpend: '$4.8M',
    relationship: '6 Years',
    lastAssessment: '2025-12-10',
    nextReview: '2026-01-10',
    capaCount: 3,
    capaDue: 2,
    keyMetrics: {
      financial: 78,
      esg: 68,
      humanRights: 75,
      sanctions: 88,
      cybersecurity: 72
    },
    summary: 'Established industrial supplier with strong operational capabilities. Requires improvements in ESG tracking and workplace safety.',
    criticality: 'Medium'
  },
  {
    id: 'mepco-003',
    name: 'Middle East Paper Company (MEPCO)',
    industry: 'Packaging Materials',
    location: 'Jeddah, Saudi Arabia',
    riskScore: 71,
    status: 'conditional',
    tier: 'Tier 2',
    annualSpend: '$2.1M',
    relationship: '4 Years',
    lastAssessment: '2025-12-01',
    nextReview: '2026-03-01',
    capaCount: 4,
    capaDue: 4,
    keyMetrics: {
      financial: 72,
      esg: 65,
      humanRights: 68,
      sanctions: 85,
      cybersecurity: 75
    },
    summary: 'Reliable packaging supplier. Supply chain traceability gaps and carbon footprint disclosure needed.',
    criticality: 'Medium'
  },
  {
    id: 'tasnee-004',
    name: 'National Industrialization Company (Tasnee)',
    industry: 'Metals & Industrial',
    location: 'Jubail, Saudi Arabia',
    riskScore: 84,
    status: 'qualified',
    tier: 'Tier 1',
    annualSpend: '$8.6M',
    relationship: '10 Years',
    lastAssessment: '2025-10-22',
    nextReview: '2026-01-22',
    capaCount: 1,
    capaDue: 0,
    keyMetrics: {
      financial: 86,
      esg: 82,
      humanRights: 84,
      sanctions: 90,
      cybersecurity: 80
    },
    summary: 'Well-established metals supplier with excellent quality record and strong compliance programs.',
    criticality: 'High'
  },
  {
    id: 'hashim-005',
    name: 'Abdullah Hashim Industrial Gases',
    industry: 'Industrial Gases',
    location: 'Riyadh, Saudi Arabia',
    riskScore: 79,
    status: 'qualified',
    tier: 'Tier 2',
    annualSpend: '$3.2M',
    relationship: '5 Years',
    lastAssessment: '2025-11-28',
    nextReview: '2026-02-28',
    capaCount: 1,
    capaDue: 1,
    keyMetrics: {
      financial: 82,
      esg: 76,
      humanRights: 78,
      sanctions: 88,
      cybersecurity: 74
    },
    summary: 'Specialized industrial gas supplier with good safety record. Minor cybersecurity improvements needed.',
    criticality: 'Medium'
  },
  {
    id: 'advanced-006',
    name: 'Advanced Petrochemical Company',
    industry: 'Petrochemicals',
    location: 'Jubail, Saudi Arabia',
    riskScore: 88,
    status: 'qualified',
    tier: 'Tier 1 Strategic',
    annualSpend: '$15.8M',
    relationship: '12 Years',
    lastAssessment: '2025-12-05',
    nextReview: '2026-03-05',
    capaCount: 0,
    capaDue: 0,
    keyMetrics: {
      financial: 90,
      esg: 88,
      humanRights: 86,
      sanctions: 92,
      cybersecurity: 85
    },
    summary: 'Premier petrochemical supplier with industry-leading ESG performance and robust financial health.',
    criticality: 'High'
  },
  {
    id: 'almarai-007',
    name: 'Almarai Company',
    industry: 'Food & Packaging',
    location: 'Riyadh, Saudi Arabia',
    riskScore: 80,
    status: 'qualified',
    tier: 'Tier 2',
    annualSpend: '$1.9M',
    relationship: '3 Years',
    lastAssessment: '2025-12-12',
    nextReview: '2026-03-12',
    capaCount: 0,
    capaDue: 0,
    keyMetrics: {
      financial: 84,
      esg: 78,
      humanRights: 80,
      sanctions: 85,
      cybersecurity: 76
    },
    summary: 'Leading food and packaging supplier with strong quality management systems and stable operations.',
    criticality: 'Low'
  },
  {
    id: 'gulf-008',
    name: 'Gulf International Logistics',
    industry: 'Logistics & Transportation',
    location: 'Dammam, Saudi Arabia',
    riskScore: 68,
    status: 'monitoring',
    tier: 'Tier 2',
    annualSpend: '$5.3M',
    relationship: '7 Years',
    lastAssessment: '2025-12-15',
    nextReview: '2026-01-15',
    capaCount: 5,
    capaDue: 3,
    keyMetrics: {
      financial: 70,
      esg: 62,
      humanRights: 65,
      sanctions: 82,
      cybersecurity: 68
    },
    summary: 'Critical logistics partner requiring immediate attention on labor practices and ESG compliance. Enhanced due diligence in progress.',
    criticality: 'High'
  }
];

// Helper function to get status badge styling
export const getStatusConfig = (status) => {
  const configs = {
    qualified: {
      label: 'Qualified',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      dotColor: 'bg-emerald-500'
    },
    conditional: {
      label: 'Conditional',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      dotColor: 'bg-amber-500'
    },
    monitoring: {
      label: 'Monitoring',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      dotColor: 'bg-orange-500'
    }
  };
  return configs[status] || configs.qualified;
};

// Helper function to get risk score styling
export const getRiskScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-orange-600';
};

// Helper function to get criticality badge styling
export const getCriticalityConfig = (criticality) => {
  const configs = {
    High: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200'
    },
    Medium: {
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200'
    },
    Low: {
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-200'
    }
  };
  return configs[criticality] || configs.Medium;
};
