import { useParams, useNavigate } from 'react-router-dom';
import { mockVendors, portfolioReports, sampleReports } from '../data/mockVendors';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

function ReportViewer() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [isPortfolio, setIsPortfolio] = useState(false);

  useEffect(() => {
    const portfolioReport = portfolioReports.find(p => p.id === vendorId);
    if (portfolioReport) {
      setVendor(portfolioReport);
      setIsPortfolio(true);
      return;
    }

    const foundVendor = mockVendors.find(v => v.id === vendorId) || sampleReports.find(v => v.id === vendorId);
    if (foundVendor && foundVendor.fullReport) {
      setVendor(foundVendor);
      setIsPortfolio(false);
    } else {
      navigate('/portfolio');
    }
  }, [vendorId, navigate]);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-400">Loading report...</p>
        </div>
      </div>
    );
  }

  const displayName = isPortfolio ? vendor.clientName : vendor.name;
  const subtitle = isPortfolio ? 'Portfolio Intelligence Report' : 'Vendor Intelligence Report';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 sticky top-0 bg-white z-50">
        <div className="max-w-[1600px] mx-auto px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate('/portfolio')}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Portfolio
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <div>
              <div className="text-sm font-medium text-slate-900">{displayName}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">{subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-slate-600 border border-slate-200 hover:border-slate-900 hover:text-slate-900 transition-colors">
              Download PDF
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors">
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Report iframe */}
      <iframe
        src={vendor.reportUrl}
        title={`${displayName} - ${subtitle}`}
        className="w-full border-0"
        style={{ height: 'calc(100vh - 61px)' }}
      />
    </div>
  );
}

export default ReportViewer;
