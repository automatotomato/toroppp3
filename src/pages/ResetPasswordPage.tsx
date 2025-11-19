import { UpdatePasswordForm } from '../components/auth/UpdatePasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-brand-main flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src="/peak_performance (1).png"
            alt="Peak Performance Partners"
            className="h-24 mx-auto mb-6"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
