export default function ProfitMarginChart() {
  const beforePercentage = 18;
  const afterPercentage = 42;
  const beforeAngle = (beforePercentage / 100) * 360;
  const afterAngle = (afterPercentage / 100) * 360;

  const getArcPath = (percentage: number) => {
    const angle = (percentage / 100) * 360;
    const radius = 60;
    const startAngle = -90;
    const endAngle = startAngle + angle;

    const startX = 100 + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = 100 + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = 100 + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = 100 + radius * Math.sin((endAngle * Math.PI) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M 100 100 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto">
      <text x="200" y="20" textAnchor="middle" className="fill-slate-700 font-bold text-sm">
        Profit Margin Improvement
      </text>

      <g transform="translate(0, 20)">
        <circle cx="100" cy="100" r="70" fill="#f1f5f9" />
        <circle cx="100" cy="100" r="60" fill="white" />
        <path d={getArcPath(beforePercentage)} fill="#cbd5e1" />

        <text x="100" y="95" textAnchor="middle" className="fill-slate-700 font-bold text-2xl">
          18%
        </text>
        <text x="100" y="115" textAnchor="middle" className="fill-slate-600 text-xs">
          Before
        </text>
      </g>

      <g transform="translate(200, 20)">
        <circle cx="100" cy="100" r="70" fill="#f1f5f9" />
        <circle cx="100" cy="100" r="60" fill="white" />
        <path d={getArcPath(afterPercentage)} fill="#9333ea" />

        <text x="100" y="95" textAnchor="middle" className="fill-purple-700 font-bold text-2xl">
          42%
        </text>
        <text x="100" y="115" textAnchor="middle" className="fill-slate-600 text-xs">
          After
        </text>
      </g>

      <rect x="130" y="210" width="140" height="30" fill="#10b981" opacity="0.2" rx="4" />
      <text x="200" y="230" textAnchor="middle" className="fill-green-700 font-bold text-sm">
        +24 Percentage Points
      </text>
    </svg>
  );
}
