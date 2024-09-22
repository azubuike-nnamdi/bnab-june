// app/auth/reset-password/page.tsx
import Link from 'next/link';
import { HOME_URL } from '@/config/routes';
import UserResetPassword from '@/components/auth/reset-password';


export default function ResetPasswordPage({
  searchParams,
}: Readonly<{
  searchParams: { token?: string };
}>) {
  const token = searchParams.token ?? "";


  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <Link className="link-underline link-underline-black" href={HOME_URL} rel="noreferrer">
            <h1 className="text-3xl font-signature font-bold">Hyea Me Ha</h1>
            <span className="text-yellow-500">...meet me there</span>
          </Link>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create a new password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter a password different from the initial...
            </p>
          </div>
          <UserResetPassword token={token} />
        </div>
      </div>
    </div>

  );
}