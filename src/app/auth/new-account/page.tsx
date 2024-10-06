import RegisterForm from "@/app/auth/new-account/ui/RegisterForm";

export default function Register() {
    return (
        <div className="flex flex-col min-h-screen pt-28 sm:pt-40">

            <h1 className={`text-3xl mb-5`}>Register</h1>
            <RegisterForm/>
        </div>
    );
}