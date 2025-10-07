import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Singup() {
  const { loading, error, signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const emailIsValid = isValidEmail(email);

  const passwordIsValid = (value) => {
    return value.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (name.trim()) data.name = name;
    if (email.trim()) data.email = email;
    if (password.trim()) data.password = password;
    if (confirmPassword.trim()) data.passwordConfirm = confirmPassword;

    signup(data);
  };

  return (
    <section
      className="w-[96%] mx-auto h-screen bg-neutral-100 flex items-center justify-center overflow-hidden"
      onSubmit={handleSubmit}
    >
      <form className=" bg-white p-8 rounded-xl shadow-lg w-96 mb-[10%]">
        <h3 className="text-center text-green-500 text-lg font-semibold mb-6">
          CREATE YOUR YOUR ACCOUNT
        </h3>

        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-4 border border-gray-300 focus:border-green-400 rounded-lg focus:outline-none focus:border-2"
          placeholder="Enter your name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2
            ${
              email
                ? emailIsValid
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            }`}
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2
            ${
              password
                ? passwordIsValid(password)
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            }`}
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          className={`w-full px-3 py-2 mb-8 border rounded-lg focus:outline-none focus:ring-2
            ${
              confirmPassword
                ? passwordIsValid(confirmPassword)
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            }`}
          placeholder="Confirm your password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out hover:cursor-pointer"
        >
          {loading ? 'loading' : 'Sign up'}
        </button>

        {error && <p className=" text-red-500 mt-4">{error}</p>}
      </form>
    </section>
  );
}
