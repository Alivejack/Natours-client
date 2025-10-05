import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPasswrod, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { updatePassword, error } = useAuth();

  const passwordIsValid = (value) => {
    return value.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (password.trim()) data.password = password;
    if (newPasswrod.trim()) data.newPassword = newPasswrod;
    if (confirmPassword.trim()) data.newPasswordConfirm = confirmPassword;

    updatePassword(data);
  };

  return (
    <form
      className="mt-20 flex flex-col w-full md:w-[60%] max-w-[45%] mx-auto items-center md:items-start pb-20"
      onSubmit={handleSubmit}
    >
      <h2 className=" text-green-500 text-2xl font-semibold mb-6 text-center">PASSWORD CHANGE</h2>

      <label> Current password</label>
      <input
        type="password"
        placeholder="••••••••"
        className={`w-[80%] px-3 py-2 mt-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 bg-gray-200
            ${
              password
                ? passwordIsValid(password)
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:border-gray-300'
            }`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className="block text-gray-800 mt-5">New password</label>
      <input
        type="password"
        placeholder="••••••••"
        className={`w-[80%] px-3 py-2 mt-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 bg-gray-200
            ${
              newPasswrod
                ? passwordIsValid(newPasswrod)
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:border-gray-300'
            }`}
        value={newPasswrod}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label className="block text-gray-800 mt-5">Confirm password</label>
      <input
        type="text"
        placeholder="••••••••"
        className={`w-[80%] px-3 py-2 mt-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 bg-gray-200
            ${
              confirmPassword
                ? passwordIsValid(confirmPassword)
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:border-gray-300'
            }`}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-40 px-3 py-2 mt-10 md:mt-5 bg-green-500 text-white rounded-xl hover:cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out hover:scale-105 md:self-end"
      >
        SAVE PASSWORD
      </button>

      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </form>
  );
}
