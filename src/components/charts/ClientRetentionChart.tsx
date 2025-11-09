export default function ClientRetentionChart() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto">
      <text x="200" y="20" textAnchor="middle" className="fill-slate-700 font-bold text-sm">
        Client Retention & Growth
      </text>

      <line x1="50" y1="200" x2="350" y2="200" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="50" y1="200" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="2" />

      <text x="20" y="55" className="fill-slate-600 text-xs">2000</text>
      <text x="20" y="95" className="fill-slate-600 text-xs">1500</text>
      <text x="20" y="135" className="fill-slate-600 text-xs">1000</text>
      <text x="20" y="175" className="fill-slate-600 text-xs">500</text>

      <rect x="80" y="150" width="40" height="50" fill="#cbd5e1" rx="4" />
      <text x="100" y="175" textAnchor="middle" className="fill-white font-bold text-xs">850</text>
      <text x="100" y="220" textAnchor="middle" className="fill-slate-600 text-xs">Before</text>

      <rect x="180" y="100" width="40" height="100" fill="#3b82f6" rx="4" />
      <text x="200" y="145" textAnchor="middle" className="fill-white font-bold text-xs">1800</text>
      <text x="200" y="220" textAnchor="middle" className="fill-slate-600 text-xs">After</text>

      <path
        d="M 120 165 Q 150 140 180 120"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="4 2"
        markerEnd="url(#arrowgreen)"
      />

      <defs>
        <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
        </marker>
      </defs>

      <rect x="240" y="80" width="80" height="40" fill="#10b981" opacity="0.2" rx="4" />
      <text x="280" y="95" textAnchor="middle" className="fill-green-700 font-bold text-xs">+112%</text>
      <text x="280" y="108" textAnchor="middle" className="fill-green-700 text-xs">Growth</text>

      <circle cx="100" cy="165" r="3" fill="#ef4444" />
      <circle cx="200" cy="120" r="3" fill="#22c55e" />
    </svg>
  );
}
