import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { login as mockLogin } from '../../api/mockApi';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [rememberMe, setRememberMe] = React.useState(true); // Default to true for localStorage

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const response = await mockLogin(data);
      if (response.success) {
        dispatch(
          loginSuccess({
            user: {
              name: response.data.name,
              email: response.data.email,
              id: response.data.user_id,
              tenant_id: response.data.tenant_id,
              organization_id: response.data.organization_id,
            },
            token: response.data.access_token,
          })
        );
        // Store in localStorage or sessionStorage based on rememberMe
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify({
            name: response.data.name,
            email: response.data.email,
            id: response.data.user_id,
            tenant_id: response.data.tenant_id,
            organization_id: response.data.organization_id,
          }));
          localStorage.setItem('token', response.data.access_token);
        } else {
          sessionStorage.setItem('user', JSON.stringify({
            name: response.data.name,
            email: response.data.email,
            id: response.data.user_id,
            tenant_id: response.data.tenant_id,
            organization_id: response.data.organization_id,
          }));
          sessionStorage.setItem('token', response.data.access_token);
        }
        window.location.href = '/dashboard';
      } else {
        dispatch(loginFailure(response.error || 'Invalid credentials'));
      }
    } catch (err) {
      dispatch(loginFailure('Network error'));
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password', { required: true })} />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((v) => !v)}
            />
            Remember me
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Login'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage; 