import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, clearError } from '../../store/slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(login(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 relative overflow-hidden">
      {/* Subtle, smaller background blobs */}
      <div className="absolute -top-10 -left-10 w-28 h-28 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-15 blur-xl z-0" />
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-15 blur-xl z-0" />
      <div className="max-w-xs w-full z-10 animate-fade-in">
        {/* Login Card - compact style */}
        <div className="bg-white/95 backdrop-blur-lg rounded-lg shadow-md border border-white/20 p-5 relative">
          {/* Brand/Logo - smaller */}
          <div className="flex flex-col items-center mb-3">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 mb-1 shadow animate-slide-in">
              <span className="text-lg font-extrabold text-white tracking-tight"></span>
            </div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-0.5 animate-fade-in">Welcome back</h2>
            <p className="text-gray-600 text-xs animate-fade-in">Sign in to your account</p>
          </div>

          {/* Form - compact spacing */}
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              {/* Email */}
              <div className="form-group mb-0">
                <label htmlFor="email" className="form-label text-xs">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-blue-400" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                    </svg>
                  </div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    id="email"
                    type="email"
                    className="form-input pl-7 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="form-error animate-fade-in text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              {/* Password */}
              <div className="form-group mb-0">
                <label htmlFor="password" className="form-label text-xs">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-blue-400" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                  </div>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    id="password"
                    type="password"
                    className="form-input pl-7 pr-7 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="form-error animate-fade-in text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              {/* Tenant ID */}
              <div className="form-group mb-0">
                <label htmlFor="tenant_id" className="form-label text-xs">Tenant ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-blue-400" viewBox="0 0 16 16">
                      <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                    </svg>
                  </div>
                  <input
                    {...register('tenant_id', {
                      required: 'Tenant ID is required',
                    })}
                    id="tenant_id"
                    type="text"
                    className="form-input pl-7 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    placeholder="Enter your tenant ID"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 animate-fade-in">
                  Test credentials: <span className="font-mono text-blue-600">admin@acmecorp.com</span> / <span className="font-mono text-blue-600">admin123</span> / <span className="font-mono text-blue-600">982700e4-8cc7-4fb9-8c6e-46e8a81c9904</span>
                </p>
                {errors.tenant_id && (
                  <p className="form-error animate-fade-in text-xs mt-1">{errors.tenant_id.message}</p>
                )}
              </div>
            </div>
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-1.5 animate-fade-in shadow flex items-center gap-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-red-500" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <span className="text-xs text-red-700 font-medium">{error}</span>
              </div>
            )}
            {/* Submit button */}
            <div className="mt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary btn-sm shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed animate-fade-in"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in '
                )}
              </button>
            </div>
          </form>
          {/* Footer */}
          <div className="mt-2 text-center animate-fade-in">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-all">Contact your administrator</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;