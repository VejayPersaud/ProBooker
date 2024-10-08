// pages/provider-login.tsx
// Uses the LoginFormProvider component to render the login form for Providers
import LoginFormProvider from '../components/LoginFormProvider';

export default function ProviderLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center provider-background-login">
      <h1 className="text-4xl font-bold mb-6">Provider Login</h1>
      <LoginFormProvider onSwitchToRegister={() => window.location.href = '/provider-register'} />
    </div>
  );
}
