import LoginForm from "@/app/auth/login/ui/loginForm";

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen pt-28 sm:pt-40">

            <h1 className={`text-3xl mb-5`}>Ingresar</h1>
            <LoginForm/>
        </div>
    );
}