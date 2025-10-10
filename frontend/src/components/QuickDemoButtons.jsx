const DEMO_COMPANIES = [
  { name: 'TSMC', industry: 'Technology', location: 'Taiwan' },
  { name: 'Boeing', industry: 'Aerospace', location: 'United States' },
  { name: 'Apple', industry: 'Technology', location: 'United States' },
  { name: 'Toyota', industry: 'Automotive', location: 'Japan' },
  { name: 'Pfizer', industry: 'Pharmaceuticals', location: 'United States' },
  { name: 'ExxonMobil', industry: 'Energy', location: 'United States' },
  { name: 'Tesla', industry: 'Automotive', location: 'United States' },
  { name: 'Microsoft', industry: 'Technology', location: 'United States' },
  { name: 'Walmart', industry: 'Retail', location: 'United States' },
  { name: 'JP Morgan Chase', industry: 'Financial Services', location: 'United States' },
];

export default function QuickDemoButtons({ onSelectCompany, isLoading }) {
  return (
    <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Select a company to analyze
        </h3>
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
