import { useState, useEffect } from 'react';

const INDUSTRIES = [
  'Aerospace',
  'Technology',
  'Manufacturing',
  'Healthcare',
  'Energy',
  'Automotive',
  'Financial Services',
  'Retail',
  'Pharmaceuticals',
  'Other',
];

export default function AssessmentForm({ onSubmit, isLoading, initialData = null }) {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    industry: initialData?.industry || '',
    location: initialData?.location || '',
    forceRefresh: false,
  });

  // Update form when initialData changes (when quick demo button is clicked)
  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || initialData.name || '',
        industry: initialData.industry || '',
        location: initialData.location || '',
        forceRefresh: false,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.companyName.trim()) {
      onSubmit(formData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Or enter any company
          </h2>
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-bold text-slate-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="e.g., TSMC, Boeing, Apple"
            className="input-field"
            required
            disabled={isLoading}
            autoFocus
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-bold text-slate-700 mb-2">
            Industry <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="input-field"
            disabled={isLoading}
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="relative z-10">
          <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            Location/Country <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Taiwan, United States"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        {/* Force Refresh Option */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.forceRefresh}
              onChange={(e) => setFormData({ ...formData, forceRefresh: e.target.checked })}
              disabled={isLoading}
              className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-500"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900 mb-1">
                Force new assessment
              </div>
              <div className="text-xs text-slate-600">
                Bypass cache and run fresh analysis (useful if you need updated data or ran assessment earlier today)
              </div>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!formData.companyName.trim() || isLoading}
            className="w-full bg-slate-900 text-white rounded-lg text-lg py-4 font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
          >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Analyze Risk
            </>
          )}
          </button>
        </div>
      </div>
    </form>
  );
}
