import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Email validation regex
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const emailIsValid = isValidEmail(email);
  const passwordIsValid = password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <section className="w-[96%] mx-auto h-screen bg-neutral-100 flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className=" bg-white p-8 rounded-xl shadow-lg w-96 mb-48"
      >
        <h2 className="text-center text-green-500 text-lg font-semibold mb-6">
          LOG INTO YOUR ACCOUNT
        </h2>

        {/* Email */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2
            ${
              email
                ? emailIsValid
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            }`}
        />

        {/* Password */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={`w-full px-3 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2
            ${
              password
                ? passwordIsValid
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            }`}
        />

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={!emailIsValid || !passwordIsValid || loading}
          className={`w-full text-white py-2 rounded-full transition 
            ${
              emailIsValid && passwordIsValid && !loading
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>
    </section>
  );
}
