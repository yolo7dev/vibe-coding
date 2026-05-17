import { useState } from 'react';
import sideImage from '../../assets/signup-side.png';
import { GoogleIcon } from '../../components/icons';

type SignUpForm = {
  name: string;
  emailOrPhone: string;
  password: string;
};

export function SignUpPage() {
  const [form, setForm] = useState<SignUpForm>({
    name: '',
    emailOrPhone: '',
    password: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-0 py-12 md:py-20">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-32">
        <div className="rounded-r bg-[#cbe4e8] md:h-[781px]">
          <img
            src={sideImage}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        <div className="mx-auto w-full max-w-[370px] px-6 md:px-0">
          <header className="mb-12 flex flex-col gap-6">
            <h1 className="font-display text-4xl font-medium tracking-[1.44px] leading-tight">
              Create an account
            </h1>
            <p className="text-base leading-6">Enter your details below</p>
          </header>

          <form className="flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-10">
              <UnderlineField
                id="name"
                label="Name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <UnderlineField
                id="emailOrPhone"
                label="Email or Phone Number"
                type="text"
                autoComplete="email"
                value={form.emailOrPhone}
                onChange={(v) => setForm({ ...form, emailOrPhone: v })}
              />
              <UnderlineField
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="h-14 rounded bg-brand px-12 text-base font-medium text-white transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                Create Account
              </button>

              <button
                type="button"
                className="flex h-14 items-center justify-center gap-4 rounded border border-ink/40 px-6 text-base text-ink transition-colors hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
              >
                <GoogleIcon className="h-6 w-6" />
                Sign up with Google
              </button>
            </div>

            <p className="mt-4 flex items-center justify-center gap-4 text-base">
              <span className="opacity-70">Already have account?</span>
              <a
                href="#login"
                className="border-b border-ink/50 pb-1 font-medium opacity-70 hover:opacity-100"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

type UnderlineFieldProps = {
  id: string;
  label: string;
  type: 'text' | 'password' | 'email';
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
};

function UnderlineField({
  id,
  label,
  type,
  autoComplete,
  value,
  onChange,
}: UnderlineFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/40"
      />
      <div className="h-px w-full bg-ink/50" />
    </div>
  );
}
