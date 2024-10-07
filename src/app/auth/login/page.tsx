import LoginForm from '@/app/auth/login/ui/loginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col pt-28 sm:pt-40">
      <h1 className={'mb-5 text-3xl'}>Ingresar</h1>
      <LoginForm />
    </div>
  );
}
