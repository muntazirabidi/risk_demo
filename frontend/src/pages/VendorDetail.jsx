import { useParams, useNavigate } from 'react-router-dom';
import { mockVendors } from '../data/mockVendors';
import RiskDashboard from '../components/RiskDashboard';

function VendorDetail() {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  // Try to find vendor in mock data first
  let vendor = mockVendors.find(v => v.id === vendorId);
  let isLiveVendor = false;

  // If not found in mock data, check localStorage for live vendors
  if (!vendor) {
    const liveVendors = JSON.parse(localStorage.getItem('liveVendors') || '[]');
    vendor = liveVendors.find(v => v.id === vendorId);
    isLiveVendor = !!vendor;
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Vendor Not Found</h2>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  // Generate mock assessment data based on vendor
  const generateMockAssessment = (vendor) => {
    const findings = [
      {
        category: 'Financial Health',
        riskLevel: vendor.keyMetrics.financial >= 80 ? 'low' : vendor.keyMetrics.financial >= 70 ? 'medium' : 'high',
        score: vendor.keyMetrics.financial,
        details: vendor.keyMetrics.financial >= 80
          ? 'Strong financial position with stable revenue growth and healthy profit margins. Liquidity ratios within acceptable ranges.'
          : 'Financial health requires monitoring. Some liquidity concerns identified. Recommend quarterly financial reviews.'
      },
      {
        category: 'ESG & Sustainability',
        riskLevel: vendor.keyMetrics.esg >= 80 ? 'low' : vendor.keyMetrics.esg >= 70 ? 'medium' : 'high',
        score: vendor.keyMetrics.esg,
        details: vendor.keyMetrics.esg >= 80
          ? 'Comprehensive ESG programs in place with strong carbon reduction initiatives and transparent reporting.'
          : 'ESG tracking needs improvement. Scope 3 emissions not fully tracked. Recommend enhanced sustainability programs.'
      },
      {
        category: 'Human Rights & Labor',
        riskLevel: vendor.keyMetrics.humanRights >= 80 ? 'low' : vendor.keyMetrics.humanRights >= 70 ? 'medium' : 'high',
        score: vendor.keyMetrics.humanRights,
        details: vendor.keyMetrics.humanRights >= 80
          ? 'Strong labor practices with no indicators of forced labor or human rights violations. Comprehensive supplier code of conduct.'
          : 'Supply chain traceability gaps identified. Tier 3 mapping incomplete. Some sourcing from high-risk regions requires enhanced due diligence.'
      },
      {
        category: 'Sanctions & Compliance',
        riskLevel: vendor.keyMetrics.sanctions >= 85 ? 'low' : 'medium',
        score: vendor.keyMetrics.sanctions,
        details: vendor.keyMetrics.sanctions >= 85
          ? 'No sanctions hits or compliance violations. Strong anti-corruption policies and comprehensive compliance training.'
          : 'Minor conflict minerals validation gaps. Some smelters require RMI certification. Overall compliance posture acceptable.'
      },
      {
        category: 'Cybersecurity',
        riskLevel: vendor.keyMetrics.cybersecurity >= 80 ? 'low' : vendor.keyMetrics.cybersecurity >= 70 ? 'medium' : 'high',
        score: vendor.keyMetrics.cybersecurity,
        details: vendor.keyMetrics.cybersecurity >= 80
          ? 'Robust cybersecurity controls with ISO 27001 certification. Regular penetration testing and incident response procedures.'
          : 'Cybersecurity posture requires strengthening. SOC 2 certification recommended. Enhanced monitoring and controls needed.'
      }
    ];

    return {
      overallRiskScore: vendor.riskScore,
      riskLevel: vendor.status === 'qualified' ? 'low' : vendor.status === 'conditional' ? 'medium' : 'high',
      findings: findings,
      summary: vendor.summary
    };
  };

  const generateMockMetadata = (vendor) => {
    return {
      companyName: vendor.name,
      industry: vendor.industry,
      location: vendor.location,
      processingTime: '28',
      timestamp: new Date().toISOString(),
      assessmentId: vendor.id
    };
  };

  // Use actual assessment data for live vendors, generate mock for sample vendors
  const assessment = isLiveVendor ? {
    overallRiskScore: vendor.riskScore,
    riskLevel: vendor.riskLevel,
    findings: vendor.findings || [],
    executiveSummary: vendor.executiveSummary || '',
    assessmentDate: vendor.assessmentDate
  } : generateMockAssessment(vendor);

  const metadata = isLiveVendor ? {
    companyName: vendor.name,
    industry: vendor.industry,
    location: vendor.location,
    processingTime: vendor.cached ? '2' : '28',
    timestamp: vendor.lastAssessment,
    assessmentId: vendor.id,
    cached: vendor.cached || false
  } : generateMockMetadata(vendor);

  const handleNewAssessment = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/portfolio')}
                className="p-1.5 hover:bg-slate-100 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Spectrum</h1>
                <p className="text-xs text-slate-500 font-medium">Vendor Due Diligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/portfolio')}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                ← Back to Portfolio
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                + New Assessment
              </button>
              <button className="px-5 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Vendor Status Banner */}
      <div className={`${
        vendor.status.toLowerCase() === 'qualified' ? 'bg-emerald-50 border-emerald-200' :
        vendor.status.toLowerCase() === 'conditional' ? 'bg-amber-50 border-amber-200' :
        'bg-orange-50 border-orange-200'
      } border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                vendor.status.toLowerCase() === 'qualified' ? 'bg-emerald-600 text-white' :
                vendor.status.toLowerCase() === 'conditional' ? 'bg-amber-600 text-white' :
                'bg-orange-600 text-white'
              }`}>
                {vendor.status.toUpperCase()}
              </span>
              {isLiveVendor && (
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium uppercase tracking-wider">
                  Live Assessment
                </span>
              )}
              <div>
                <div className="text-sm font-medium text-slate-600">Vendor Status</div>
                <div className="text-lg font-bold text-slate-900">
                  {isLiveVendor
                    ? `Risk Score: ${vendor.riskScore}/100`
                    : `${vendor.tier} • ${vendor.annualSpend} Annual Spend`
                  }
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-600">Last Assessment</div>
              <div className="text-sm text-slate-900">
                {new Date(vendor.lastAssessment || vendor.assessmentDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <RiskDashboard
          assessment={assessment}
          metadata={metadata}
          onNewAssessment={handleNewAssessment}
        />
      </main>
    </div>
  );
}

export default VendorDetail;
