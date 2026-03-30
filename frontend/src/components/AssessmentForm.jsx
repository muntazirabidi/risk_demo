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
      <div className="bg-white border border-slate-200 p-8 space-y-5">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Run Assessment
          </h2>
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
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

        {/* Industry & Location row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="industry" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Industry <span className="text-slate-300 normal-case tracking-normal">(optional)</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="input-field"
              disabled={isLoading}
            >
              <option value="">Select...</option>
              {INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Location <span className="text-slate-300 normal-case tracking-normal">(optional)</span>
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
        </div>

        {/* Force Refresh */}
        <div className="bg-slate-50 border border-slate-200 p-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.forceRefresh}
              onChange={(e) => setFormData({ ...formData, forceRefresh: e.target.checked })}
              disabled={isLoading}
              className="w-3.5 h-3.5 text-slate-900 border-slate-300 focus:ring-slate-500 accent-slate-900"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-700">Force new assessment</span>
              <span className="text-[10px] text-slate-400">Bypass cache, run fresh analysis</span>
            </div>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!formData.companyName.trim() || isLoading}
          className="w-full bg-slate-900 text-white text-sm py-3.5 font-medium hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Vendor Risk'
          )}
        </button>
      </div>
    </form>
  );
}
