// Supplier/Vendor focused demo companies across key industries
const DEMO_COMPANIES = [
  { name: 'TSMC', industry: 'Semiconductor Manufacturing', location: 'Taiwan' },
  { name: 'Foxconn', industry: 'Electronics Manufacturing', location: 'Taiwan' },
  { name: 'Johnson & Johnson', industry: 'Pharmaceuticals & Medical Devices', location: 'United States' },
  { name: 'Siemens', industry: 'Industrial Manufacturing', location: 'Germany' },
  { name: 'BASF', industry: 'Chemicals & Materials', location: 'Germany' },
  { name: 'Caterpillar', industry: 'Heavy Equipment Manufacturing', location: 'United States' },
  { name: 'Honeywell', industry: 'Industrial Technology', location: 'United States' },
  { name: 'Accenture', industry: 'IT Services & Consulting', location: 'Ireland' },
];

export default function QuickDemoButtons({ onSelectCompany, isLoading }) {
  return (
    <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
      {/* Demo Companies */}
      <div className="text-center mb-6">
        <h3 className="text-base font-medium text-slate-900 mb-1">
          Try Quick Assessment
        </h3>
        <p className="text-xs text-slate-500">AI-powered assessment in ~30 seconds</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {DEMO_COMPANIES.map((company, index) => (
          <button
            key={company.name}
            onClick={() => onSelectCompany(company)}
            disabled={isLoading}
            style={{
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
            className="group px-4 py-2 bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-700 disabled:hover:bg-white animate-fade-in uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-900 transition-colors"></span>
              {company.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
