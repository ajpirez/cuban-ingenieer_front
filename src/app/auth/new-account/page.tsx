import RegisterForm from '@/app/auth/new-account/ui/RegisterForm';

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col pt-28 sm:pt-40">
      <h1 className='mb-5 text-3xl'>Register</h1>
      <RegisterForm />
    </div>
  );
}
