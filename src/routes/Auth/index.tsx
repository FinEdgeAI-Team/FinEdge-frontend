import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';

// ROUTER CONFIG
export const Route = createFileRoute('/Auth/')({
  component: RouteComponent,
});

// FORM VALUES TYPE
type FormValues = {
  name?: string;
  email: string;
  password: string;
  agreedToTerms?: boolean;
};

// ROUTE COMPONENT → your full auth page
function RouteComponent() {
  return <GreevaAuth />;
}

// MAIN AUTH UI
const GreevaAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(isLogin ? 'Login submitted:' : 'Sign up submitted:', data);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center p-4">

      {/* Background Decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-slate-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-600 rounded-full opacity-10 blur-3xl"></div>

      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-2xl p-8 sm:p-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-2">🔥</span>
            <h1 className="text-3xl font-bold text-white">GREEVA</h1>
          </div>
          <h2 className="text-xl text-white font-medium mb-2">Welcome to Greeva Admin</h2>
          <p className="text-slate-400 text-sm">
            {isLogin
              ? 'Enter your email address and password to access account.'
              : 'Enter your name, email address and password to access account.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* NAME FIELD */}
          {!isLogin && (
            <div>
              <label className="block text-slate-300 text-sm mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register('name', { required: !isLogin })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-white"
              />

              {errors.name && (
                <p className="text-red-400 text-xs mt-1 animate-fadeIn">
                  Name is required
                </p>
              )}
            </div>
          )}

          {/* EMAIL FIELD */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-white"
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-1 animate-fadeIn">
                Email is required
              </p>
            )}
          </div>

          {/* PASSWORD FIELD + toggler */}
          <div className="relative">
            <label className="block text-slate-300 text-sm mb-2">Password</label>

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', { required: true })}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-white pr-12"
            />

            {/* Toggle visibility */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[42px] text-slate-300 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1 animate-fadeIn">
                Password is required
              </p>
            )}
          </div>

          {/* TERMS CHECKBOX */}
          {!isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('agreedToTerms', { required: !isLogin })}
                className="w-4 h-4 bg-slate-700 border-slate-600 rounded"
              />
              <label className="ml-2 text-sm text-slate-300">
                I agree to all{' '}
                <a className="text-white underline">Terms & Condition</a>
              </label>
            </div>
          )}

          {!isLogin && errors.agreedToTerms && (
            <p className="text-red-400 text-xs mt-1 animate-fadeIn">
              You must agree before continuing
            </p>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <a className="text-sm text-blue-400 hover:text-blue-300">
                Forgot Password?
              </a>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md shadow-lg hover:shadow-xl transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {/* TOGGLE FORM */}
          <div className="text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={toggleForm}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              {isLogin ? 'Sign Up !' : 'Login !'}
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center text-xs text-slate-500">
          2025 © Greeva - By{' '}
          <a className="text-slate-400 hover:text-white underline">CODERTHEMES</a>
        </div>
      </div>
    </div>
  );
};

export default GreevaAuth;
