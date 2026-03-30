// Vendor portfolio data
// Includes real PoC reports (Encevo supplier portfolio) and sample vendors

export const mockVendors = [
  // ═══════════════════════════════════════════════════════════════
  // ENCEVO SUPPLIER PORTFOLIO — Real PoC Reports (10 suppliers)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'abb-featured',
    name: 'ABB Ltd',
    industry: 'Electrification & Industrial Automation',
    location: 'Zurich, Switzerland',
    riskScore: 75,
    status: 'conditional',
    tier: 'Tier 1 Strategic',
    annualSpend: '$9.4M',
    relationship: '12 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 3,
    capaDue: 1,
    keyMetrics: {
      financial: 80,
      esg: 79,
      humanRights: 77,
      sanctions: 86,
      cybersecurity: 46
    },
    summary: 'Global electrification leader with strong financials and ESG profile. Cybersecurity posture flagged for enhanced monitoring.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/individual/abb_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'amprion-featured',
    name: 'Amprion GmbH',
    industry: 'Electricity Transmission (TSO)',
    location: 'Dortmund, Germany',
    riskScore: 76,
    status: 'conditional',
    tier: 'Tier 1 Strategic',
    annualSpend: '$14.2M',
    relationship: '10 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 2,
    capaDue: 1,
    keyMetrics: {
      financial: 82,
      esg: 88,
      humanRights: 87,
      sanctions: 72,
      cybersecurity: 62
    },
    summary: 'Regulated German TSO with strong ESG credentials and critical energy infrastructure role. Elevated leverage from €36.4B grid investment programme warrants monitoring.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/individual/amprion_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'comarch-featured',
    name: 'Comarch S.A.',
    industry: 'IT Systems & Enterprise Software',
    location: 'Krakow, Poland',
    riskScore: 76,
    status: 'conditional',
    tier: 'Tier 2',
    annualSpend: '$2.8M',
    relationship: '6 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 2,
    capaDue: 0,
    keyMetrics: {
      financial: 60,
      esg: 69,
      humanRights: 100,
      sanctions: 73,
      cybersecurity: 78
    },
    summary: 'Polish IT systems integrator with clean regulatory record. Financial visibility limited by founder-controlled structure.',
    criticality: 'Medium',
    fullReport: true,
    reportUrl: '/reports/individual/comarch_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'docusign-featured',
    name: 'DocuSign, Inc.',
    industry: 'e-Signature & Contract Management',
    location: 'San Francisco, California, USA',
    riskScore: 79,
    status: 'conditional',
    tier: 'Tier 1',
    annualSpend: '$1.6M',
    relationship: '5 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 1,
    capaDue: 0,
    keyMetrics: {
      financial: 74,
      esg: 77,
      humanRights: 88,
      sanctions: 76,
      cybersecurity: 87
    },
    summary: 'Leading e-signature platform with strong cybersecurity and compliance posture. Solid SaaS vendor for contract lifecycle management.',
    criticality: 'Medium',
    fullReport: true,
    reportUrl: '/reports/individual/docusign_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'global-facilities-featured',
    name: 'Global Facilities S.A.',
    industry: 'Facilities Management Services',
    location: 'Luxembourg',
    riskScore: 60,
    status: 'conditional',
    tier: 'Tier 2',
    annualSpend: '$3.1M',
    relationship: '8 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 4,
    capaDue: 2,
    keyMetrics: {
      financial: 39,
      esg: 42,
      humanRights: 92,
      sanctions: 70,
      cybersecurity: 55
    },
    summary: 'Local FM provider with 25-year track record and clean regulatory record. Limited financial transparency as private subsidiary requires enhanced monitoring.',
    criticality: 'Medium',
    fullReport: true,
    reportUrl: '/reports/individual/global_facilities_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'gorgetti-featured',
    name: 'Félix Giorgetti Sàrl',
    industry: 'Construction & Facilities Management',
    location: 'Luxembourg',
    riskScore: 67,
    status: 'conditional',
    tier: 'Tier 2',
    annualSpend: '$4.5M',
    relationship: '7 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 3,
    capaDue: 1,
    keyMetrics: {
      financial: 44,
      esg: 51,
      humanRights: 100,
      sanctions: 82,
      cybersecurity: 55
    },
    summary: 'Luxembourg\'s largest family-owned construction and FM company. Financial opacity as a private Sàrl and sector-level construction crisis exposure are primary concerns.',
    criticality: 'Medium',
    fullReport: true,
    reportUrl: '/reports/individual/gorgetti_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'microsoft-featured',
    name: 'Microsoft Corporation',
    industry: 'Cloud, Software & AI',
    location: 'Redmond, Washington, USA',
    riskScore: 62,
    status: 'conditional',
    tier: 'Tier 1 Strategic',
    annualSpend: '$18.7M',
    relationship: '15 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 5,
    capaDue: 2,
    keyMetrics: {
      financial: 88,
      esg: 66,
      humanRights: 56,
      sanctions: 70,
      cybersecurity: 39
    },
    summary: 'Hyperscaler with exceptional financial strength. Critical cybersecurity concerns (39/100) driven by recent breach history and CSRB findings require immediate attention.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/individual/microsoft_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'openai-featured',
    name: 'OpenAI',
    industry: 'Artificial Intelligence Platform',
    location: 'San Francisco, California, USA',
    riskScore: 48,
    status: 'monitoring',
    tier: 'Tier 2',
    annualSpend: '$1.2M',
    relationship: '2 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-05-29',
    capaCount: 6,
    capaDue: 3,
    keyMetrics: {
      financial: 51,
      esg: 15,
      humanRights: 68,
      sanctions: 50,
      cybersecurity: 58
    },
    summary: 'Leading AI platform with material governance and ESG concerns. Active litigation, corporate restructuring, and low ESG score (15/100) place this vendor under enhanced monitoring.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/individual/openai_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'schneider-it-featured',
    name: 'Schneider Electric IT Corporation',
    industry: 'Energy Management & IT Infrastructure',
    location: 'West Kingston, Rhode Island, USA',
    riskScore: 73,
    status: 'conditional',
    tier: 'Tier 1',
    annualSpend: '$6.3M',
    relationship: '9 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 3,
    capaDue: 1,
    keyMetrics: {
      financial: 83,
      esg: 85,
      humanRights: 70,
      sanctions: 77,
      cybersecurity: 37
    },
    summary: 'Schneider Electric subsidiary (APC brand) with strong parent financials and ESG leadership. Critical cybersecurity gap (37/100) requires immediate remediation.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/individual/schneider_it_report.html',
    clientPortfolio: 'encevo'
  },
  {
    id: 'siemens-featured',
    name: 'Siemens AG',
    industry: 'Industrial Automation & Digitalization',
    location: 'Munich, Germany',
    riskScore: 76,
    status: 'conditional',
    tier: 'Tier 1 Strategic',
    annualSpend: '$11.8M',
    relationship: '14 Years',
    lastAssessment: '2026-03-29',
    nextReview: '2026-06-29',
    capaCount: 3,
    capaDue: 1,
    keyMetrics: {
      financial: 70,
      esg: 64,
      humanRights: 86,
      sanctions: 84,
      cybersecurity: 80
    },
    summary: 'Industrial conglomerate with diversified portfolio across automation, smart infrastructure, and rail mobility. ESG score impacted by historical Russia exposure wind-down.',
    criticality: 'High',
    fullReport: true,
    reportUrl: '/reports/individual/siemens_report.html',
    clientPortfolio: 'encevo'
  },

];

// Portfolio report data
export const portfolioReports = [
  {
    id: 'encevo-portfolio',
    clientName: 'Portfolio Intelligence',
    industry: 'Energy Utility',
    location: 'Luxembourg',
    suppliersAssessed: 10,
    portfolioScore: 69,
    riskLevel: 'Medium',
    reportUrl: '/reports/portfolio/encevo_portfolio_report.html',
    assessmentDate: '2026-03-29',
    highlights: {
      qualified: 0,
      conditional: 9,
      monitoring: 1,
      criticalFlags: 3
    }
  }
];

// Sample reports for landing page showcase
export const sampleReports = [
  {
    id: 'palantir-featured',
    name: 'Palantir Technologies Inc.',
    industry: 'Software & Data Analytics',
    location: 'Denver, Colorado, USA',
    riskScore: 82,
    status: 'qualified',
    keyMetrics: {
      financial: 85,
      esg: 78,
      cybersecurity: 88
    },
    summary: 'Leading data analytics platform provider with strong government contracts and robust security infrastructure.',
    fullReport: true,
    reportUrl: '/reports/palantir-report.html'
  },
  {
    id: 'servicenow-featured',
    name: 'ServiceNow, Inc.',
    industry: 'Enterprise Software & Cloud Services',
    location: 'Santa Clara, California, USA',
    riskScore: 78,
    status: 'qualified',
    keyMetrics: {
      financial: 80,
      esg: 75,
      cybersecurity: 82
    },
    summary: 'Leading enterprise cloud platform provider with strong financial health, comprehensive security controls, and solid ESG practices.',
    fullReport: true,
    reportUrl: '/reports/servicenow-report.html'
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
