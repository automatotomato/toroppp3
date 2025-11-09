export default function RevenueGrowthChart() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto">
      <defs>
        <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0.05 }} />
        </linearGradient>
      </defs>

      <text x="200" y="20" textAnchor="middle" className="fill-slate-700 font-bold text-sm">
        Revenue Growth Trajectory
      </text>

      <line x1="50" y1="200" x2="350" y2="200" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="50" y1="200" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="2" />

      <text x="25" y="55" className="fill-slate-600 text-xs">$500K</text>
      <text x="25" y="95" className="fill-slate-600 text-xs">$400K</text>
      <text x="25" y="135" className="fill-slate-600 text-xs">$300K</text>
      <text x="25" y="175" className="fill-slate-600 text-xs">$200K</text>
      <text x="25" y="205" className="fill-slate-600 text-xs">$100K</text>

      <text x="70" y="220" className="fill-slate-600 text-xs">Start</text>
      <text x="150" y="220" className="fill-slate-600 text-xs">3 Mo</text>
      <text x="230" y="220" className="fill-slate-600 text-xs">6 Mo</text>
      <text x="310" y="220" className="fill-slate-600 text-xs">12 Mo</text>

      <path
        d="M 50,180 Q 120,170 150,150 T 250,90 T 350,60"
        fill="url(#revenueGradient)"
        stroke="none"
        transform="translate(0, 20)"
      />

      <path
        d="M 50,180 Q 120,170 150,150 T 250,90 T 350,60"
        fill="none"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="50" cy="180" r="5" fill="#ef4444" />
      <text x="55" y="175" className="fill-slate-700 text-xs font-semibold">$180K</text>

      <circle cx="150" cy="150" r="5" fill="#ef4444" />
      <text x="155" y="145" className="fill-slate-700 text-xs font-semibold">$280K</text>

      <circle cx="250" cy="90" r="5" fill="#ef4444" />
      <text x="255" y="85" className="fill-slate-700 text-xs font-semibold">$380K</text>

      <circle cx="350" cy="60" r="5" fill="#ef4444" />
      <text x="310" y="50" className="fill-green-600 text-xs font-bold">$450K</text>
      <text x="310" y="40" className="fill-green-600 text-xs font-bold">+250%</text>
    </svg>
  );
}
