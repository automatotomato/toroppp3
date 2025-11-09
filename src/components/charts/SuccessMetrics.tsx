import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';

export default function SuccessMetrics() {
  const metrics = [
    {
      icon: DollarSign,
      label: 'Avg Revenue Growth',
      value: '+$270K',
      change: '+250%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Users,
      label: 'Client Base Growth',
      value: '+950',
      change: '+112%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: TrendingUp,
      label: 'Profit Margin',
      value: '42%',
      change: '+24pts',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Award,
      label: 'Satisfaction',
      value: '4.9/5',
      change: '98% recommend',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-100 hover:border-slate-300 transition-all"
          >
            <div className={`${metric.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
              <Icon className={metric.color} size={24} />
            </div>
            <div className="text-sm text-slate-600 mb-1">{metric.label}</div>
            <div className={`text-3xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
            <div className="text-xs text-slate-500 font-semibold">{metric.change}</div>
          </div>
        );
      })}
    </div>
  );
}
