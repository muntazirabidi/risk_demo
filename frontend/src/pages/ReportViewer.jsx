import { useParams, useNavigate } from 'react-router-dom';
import { mockVendors } from '../data/mockVendors';
import { useEffect, useState } from 'react';

function ReportViewer() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const foundVendor = mockVendors.find(v => v.id === vendorId);
    if (foundVendor && foundVendor.fullReport) {
      setVendor(foundVendor);
    } else {
      // If not a featured vendor with full report, redirect back to portfolio
      navigate('/portfolio');
    }
  }, [vendorId, navigate]);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-sm text-gray-500">Loading report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/portfolio')}
              className="flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-black transition-colors uppercase tracking-wider"
            >
              ← Back to Portfolio
            </button>
            <div className="h-4 w-px bg-gray-200"></div>
            <div>
              <div className="text-sm font-medium text-black tracking-tight">{vendor.name}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Full Due Diligence Report</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 text-xs font-medium border border-gray-300 hover:border-black transition-colors uppercase tracking-wider">
              Download PDF
            </button>
            <button className="px-4 py-1.5 text-xs font-medium bg-black text-white hover:bg-gray-900 transition-colors uppercase tracking-wider">
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Full report iframe */}
      <div className="w-full h-screen">
        <iframe
          src={vendor.reportUrl}
          title={`${vendor.name} - Full Due Diligence Report`}
          className="w-full h-full border-0"
          style={{ height: 'calc(100vh - 73px)' }}
        />
      </div>
    </div>
  );
}

export default ReportViewer;
