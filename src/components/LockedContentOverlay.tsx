import { Lock, Calendar } from 'lucide-react';
import { getUnlockDate } from '../utils/contentLock';

interface LockedContentOverlayProps {
  children: React.ReactNode;
  isLocked: boolean;
}

export default function LockedContentOverlay({ children, isLocked }: LockedContentOverlayProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[70vh]">
      <div className="absolute inset-0 blur-sm pointer-events-none select-none opacity-30">
        {children}
      </div>
      <div className="absolute inset-0 flex items-start justify-center pt-8 md:pt-12 bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 backdrop-blur-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl mx-4 text-center border-4 border-brand-accent relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-accent via-red-600 to-brand-accent"></div>

          <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
            <Lock className="text-white" size={48} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-brand-main mb-4">
            Content Coming Soon!
          </h2>

          <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
            This content will be available starting<br />
            <span className="font-black text-brand-accent text-3xl md:text-4xl">{getUnlockDate()}</span>
          </p>

          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-inner">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="text-brand-accent animate-bounce" size={32} />
              <span className="text-slate-800 font-bold text-xl">Stay Tuned for Our First Announcement</span>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
              We're preparing something amazing for you! All courses, resources, town halls, podcasts, and exclusive content will be accessible after the launch date.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-slate-200">
            <p className="text-slate-500 text-sm">
              Thank you for your patience as we finalize everything for an incredible learning experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
