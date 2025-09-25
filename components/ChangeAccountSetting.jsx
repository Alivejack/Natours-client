import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ChangeAccountSetting() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Email validation regex
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const emailIsValid = isValidEmail(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (name.trim()) data.name = name;
    if (email.trim()) data.email = email;

    updateUser(data);
  };

  return (
    <form
      className="mt-20 flex flex-col w-full md:w-[60%] max-w-[45%] mx-auto items-center md:items-start"
      onSubmit={handleSubmit}
    >
      <h2 className=" text-green-500 text-2xl font-semibold mb-6">YOUR ACCOUNT SETTINGS</h2>

      <label className="block text-gray-800">Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-[80%] px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 mt-2 border-gray-300 focus:ring-green-400"
        placeholder="Your Name"
      />

      <label className="block text-gray-800 mt-7 ">Email address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`w-[80%] px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 mt-2
            ${
              email
                ? emailIsValid
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
            }`}
      />

      <div className="flex items-center gap-x-5">
        <img
          src={`../users/${user.photo}`}
          className="w-20 h-20 rounded-full object-cover mt-5"
          alt="ProfilePic"
        />
        <a className=" text-green-500 border-b-2" href="#">
          Choose new photo
        </a>
      </div>

      <button
        type="submit"
        className="w-40 px-3 py-2 mt-10 md:mt-5 bg-green-500 text-white rounded-xl hover:cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out hover:scale-105 md:self-end"
      >
        SAVE SETTINGS
      </button>
    </form>
  );
}
