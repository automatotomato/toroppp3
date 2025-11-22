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
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none opacity-40">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-4 text-center border-2 border-brand-accent">
          <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Lock className="text-white" size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-main mb-4">
            Content Coming Soon!
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-6">
            This content will be available starting <span className="font-bold text-brand-accent">{getUnlockDate()}</span>
          </p>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Calendar className="text-brand-accent" size={24} />
              <span className="text-slate-700 font-semibold">Stay Tuned for Our First Announcement</span>
            </div>
            <p className="text-sm text-slate-600">
              We're preparing something amazing for you! All courses, resources, and content will be accessible after the launch date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
