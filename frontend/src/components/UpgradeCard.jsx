import { useState } from 'react';

export default function UpgradeCard({ companyName, riskScore, riskLevel }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/request-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          targetCompany: companyName,
          quickScreenScore: riskScore
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit request');
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit report request:', error);
      alert('Failed to submit request. Please try again or email us directly.');
    }
  };

  return (
    <div className="my-12 max-w-5xl mx-auto">
      <div className="border border-slate-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Full Due Diligence</div>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Need comprehensive vendor intelligence?
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-lg">
                Get a complete due diligence package with contract playbook, risk monitoring triggers, and procurement-ready recommendations.
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Quick Screen Score</div>
              <div className={`text-4xl font-light font-mono ${
                riskScore >= 80 ? 'text-emerald-400' :
                riskScore >= 60 ? 'text-amber-400' : 'text-orange-400'
              }`}>{riskScore}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{riskLevel} Risk</div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 border-b border-slate-200">
          {/* What you got */}
          <div className="p-6 border-r border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-4">What you received</div>
            <ul className="space-y-2.5">
              {[
                `Risk score: ${riskScore}/100`,
                '6-10 bullet-point findings',
                '60 second analysis',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1 h-1 bg-slate-400 flex-shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What you'll get */}
          <div className="p-6 bg-slate-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[10px] text-slate-900 uppercase tracking-widest font-medium">Full Due Diligence Package</div>
              <span className="text-[9px] bg-slate-900 text-white px-2 py-0.5 uppercase tracking-wider font-medium">Recommended</span>
            </div>
            <ul className="space-y-2.5">
              {[
                { text: 'Altman Z-Score & Credit Analysis', sub: 'with peer benchmarking' },
                { text: 'Supplier Ecosystem Mapping', sub: 'Tier 2/3 dependencies' },
                { text: 'Contract Playbook', sub: 'recommended protective clauses' },
                { text: 'Risk Monitoring Dashboard', sub: 'KPIs and alert thresholds' },
                { text: 'Sanctions & Compliance Screening', sub: 'OFAC, UN, EU lists' },
                { text: 'Procurement-Ready Report', sub: 'PDF + Excel in 1-2 hours' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2 text-sm">
                  <svg className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-900">
                    <strong>{item.text}</strong>
                    <span className="text-slate-500 font-normal"> — {item.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA / Form / Success */}
        <div className="p-6">
          {!showForm && !submitted && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Delivered in 1-2 hours. Procurement-ready format.
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Request Full Report for {companyName}
              </button>
            </div>
          )}

          {showForm && !submitted && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Request Report for {companyName}</h3>
                <p className="text-sm text-slate-500 mt-1">We'll contact you within 1 hour to discuss scope and pricing.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="input-field"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="input-field"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Additional Context (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={3}
                    className="input-field"
                    placeholder="Any specific areas of concern or questions..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 border border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}

          {submitted && (
            <div className="text-center py-6">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Request Received</h3>
              <p className="text-sm text-slate-600 mb-1">
                We'll contact you at <strong>{formData.email}</strong> within 1 hour.
              </p>
              <p className="text-xs text-slate-400">
                Custom quote based on your needs. Report delivered within 1-2 hours of approval.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
