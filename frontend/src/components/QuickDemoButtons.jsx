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
    <div className="max-w-3xl mx-auto mb-4 animate-fade-in">
      <div className="flex flex-wrap gap-1.5">
        {DEMO_COMPANIES.map((company, index) => (
          <button
            key={company.name}
            onClick={() => onSelectCompany(company)}
            disabled={isLoading}
            style={{
              animationDelay: `${index * 0.04}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 text-[11px] font-medium text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed animate-fade-in tracking-wide"
          >
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
}
