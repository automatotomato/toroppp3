import DashboardLayout from '../components/DashboardLayout';
import { Construction } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-2xl">
          <Construction className="text-red-600 mx-auto mb-6" size={80} />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-xl text-slate-600 mb-8">{description}</p>
          <div className="bg-slate-50 rounded-xl p-8">
            <p className="text-slate-700 leading-relaxed">
              We're working hard to bring you this content. Check back soon for updates,
              or contact our support team if you have specific questions.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
