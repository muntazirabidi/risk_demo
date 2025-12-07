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
  { name: 'Maersk', industry: 'Shipping & Logistics', location: 'Denmark' },
  { name: 'Flex Ltd', industry: 'Contract Manufacturing', location: 'Singapore' },
];

export default function QuickDemoButtons({ onSelectCompany, isLoading }) {
  return (
    <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Select a vendor to assess
        </h3>
        <p className="text-sm text-gray-500">Click any vendor or enter your own below</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {DEMO_COMPANIES.map((company, index) => (
          <button
            key={company.name}
            onClick={() => onSelectCompany(company)}
            disabled={isLoading}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 disabled:hover:scale-100 animate-fade-in shadow-sm"
          >
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
}
