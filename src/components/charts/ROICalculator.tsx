export default function ROICalculator() {
  const investment = 299 + (129 * 12);
  const averageRevenueIncrease = 270000;
  const roi = Math.round((averageRevenueIncrease / investment) * 100);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
      <h3 className="text-2xl font-bold text-center text-slate-900 mb-6">
        Your Investment Return
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-sm text-slate-600 mb-2">Your Investment</div>
          <div className="text-3xl font-bold text-slate-900">${investment.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">First Year Total</div>
        </div>

        <div className="text-center">
          <div className="text-sm text-slate-600 mb-2">Avg. Revenue Increase</div>
          <div className="text-3xl font-bold text-green-600">+${averageRevenueIncrease.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Based on Member Data</div>
        </div>

        <div className="text-center">
          <div className="text-sm text-slate-600 mb-2">Return on Investment</div>
          <div className="text-4xl font-bold text-emerald-600">{roi}x</div>
          <div className="text-xs text-slate-500 mt-1">ROI Multiplier</div>
        </div>
      </div>

      <div className="relative">
        <svg viewBox="0 0 600 80" className="w-full h-auto">
          <rect x="0" y="20" width="100%" height="40" fill="#e5e7eb" rx="20" />

          <rect x="0" y="20" width="98%" height="40" fill="url(#investmentGradient)" rx="20">
            <animate attributeName="width" from="0%" to="98%" dur="2s" fill="freeze" />
          </rect>

          <defs>
            <linearGradient id="investmentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <text x="50%" y="48" textAnchor="middle" className="fill-white font-bold text-base">
            Average Member Revenue Growth: +250%
          </text>
        </svg>
      </div>

      <div className="mt-6 bg-white rounded-xl p-4 border-2 border-green-300">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">Break-even Point:</span>
          <span className="text-lg font-bold text-green-600">30 Days</span>
        </div>
      </div>
    </div>
  );
}
