import axios from 'axios';
import { useMemo, useState } from 'react';
import { notify } from '../../../utils/notify';

const ROLE_ORDER = ['admin', 'lead-guide', 'guide', 'user'];
const AVAILABLE_ROLES = ['admin', 'lead-guide', 'guide', 'user']; // List of roles for the select dropdown

const UserDisplayCard = ({ user, getRoleColor, handleEditClick }) => (
  <div
    key={user.id}
    className={`${getRoleColor(
      user.role
    )} rounded-xl p-4 flex flex-col gap-1 shadow-lg transition-all duration-300 hover:scale-[1.02] w-72 md:w-80`}
  >
    <span className="relative font-bold text-xl mb-1">
      {user.name}
      <span className="group ml-2 inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-white/30 capitalize">
        {user.role}
        <span className="hidden group-hover:opacity-100 group-hover:inline-block absolute opacity-0 -top-3 left-0 w-4 h-4 transition-opacity duration-200 rounded-full">
          {user.id}
        </span>
      </span>
    </span>
    <span className="text-sm">Email: {user.email}</span>
    <div className="flex justify-end mt-3">
      <button
        onClick={() => handleEditClick(user)}
        className=" bg-white text-gray-800 py-1 px-4 rounded-full hover:bg-gray-100 text-sm font-semibold transition-colors duration-200 shadow hover:cursor-pointer"
      >
        Edit Info
      </button>
    </div>
  </div>
);

const UserEditForm = ({ userId, formData, handleFormChange, handleUpdateUser, handleCancel }) => (
  <div
    className={` bg-white text-gray-800 border-2 border-indigo-500 rounded-xl p-4 flex flex-col gap-3 shadow-2xl w-72 md:w-80`}
  >
    <h3 className="font-bold text-lg text-indigo-700">Editing User</h3>

    <label className="text-sm font-medium">Name</label>
    <input
      type="text"
      name="name"
      value={formData.name || ''}
      onChange={handleFormChange}
      className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 outline-none transition-shadow"
    />

    <label className="text-sm font-medium">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email || ''}
      onChange={handleFormChange}
      className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 outline-none transition-shadow"
    />

    <label className="text-sm font-medium">Role</label>
    <select
      name="role"
      value={formData.role || ''}
      onChange={handleFormChange}
      className="border border-gray-300 p-2 rounded-lg bg-white appearance-none focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 outline-none transition-shadow"
    >
      {AVAILABLE_ROLES.map((role) => (
        <option key={role} value={role} className="capitalize">
          {role}
        </option>
      ))}
    </select>

    <div className="flex justify-between mt-4 gap-2">
      <button
        onClick={handleCancel}
        className="flex-1 bg-gray-400 text-white py-2 rounded-full hover:bg-gray-500 transition-colors duration-200 font-semibold"
      >
        Cancel
      </button>
      <button
        onClick={() => handleUpdateUser(userId)}
        className="flex-1 bg-indigo-500 text-white py-2 rounded-full hover:bg-indigo-600 transition-colors duration-200 font-semibold"
      >
        Save Changes
      </button>
    </div>
  </div>
);

export default function ManageUsers() {
  const [users, setUsers] = useState(null);
  // State to track which user's ID is currently being edited
  const [editingUserId, setEditingUserId] = useState(null);
  // State to store the form data for the user being edited
  const [formData, setFormData] = useState({});

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        withCredentials: true,
      });

      // Assuming user documents have an '_id' field
      setUsers(res.data.doc.map((user) => ({ ...user, id: user._id })));
      notify('success', `Successfully loaded ${res.data.doc.length} users.`);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      notify('error', "Couldn't get the data from server!");
    }
  };

  // Memoized function to sort users by role priority
  const sortedUsers = useMemo(() => {
    if (!users) return null;

    return [...users].sort((a, b) => {
      const indexA = ROLE_ORDER.indexOf(a.role);
      const indexB = ROLE_ORDER.indexOf(b.role);

      const finalIndexA = indexA === -1 ? Infinity : indexA;
      const finalIndexB = indexB === -1 ? Infinity : indexB;

      return finalIndexA - finalIndexB;
    });
  }, [users]);

  const roleColors = {
    admin: 'bg-red-600 text-white',
    'lead-guide': 'bg-purple-600 text-white',
    guide: 'bg-blue-600 text-white',
    user: 'bg-green-600 text-white',
  };

  const getRoleColor = (role) => {
    return roleColors[role] || 'bg-gray-300 text-gray-800';
  };

  // 1. start editing
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // 2. update form data on change
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. handle saving data
  const handleUpdateUser = async (userId) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, formData, {
        withCredentials: true,
      });

      // Update the local state with the new user data
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? { ...u, ...res.data.doc } : u))
      );

      notify('success', `User ${res.data.doc.name}'s information updated successfully.`);
      setEditingUserId(null);
      setFormData({});
    } catch (err) {
      console.error('Error updating user:', err.response?.data?.message || err.message);
      notify('error', err.response?.data?.message || 'Failed to update user.');
    }
  };

  // 4. cancel editing
  const handleCancel = () => {
    setEditingUserId(null);
    setFormData({});
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        User Management Panel
      </h1>

      <button
        className=" bg-indigo-600 text-white px-6 py-3 mb-10 rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-[1.05] hover:cursor-pointer"
        onClick={getAllUsers}
      >
        Load All Users
      </button>

      {sortedUsers && (
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          {sortedUsers.map((user) =>
            user.id === editingUserId ? (
              <UserEditForm
                key={user.id}
                userId={user.id}
                formData={formData}
                handleFormChange={handleFormChange}
                handleUpdateUser={handleUpdateUser}
                handleCancel={handleCancel}
              />
            ) : (
              <UserDisplayCard
                key={user.id}
                user={user}
                handleEditClick={handleEditClick}
                getRoleColor={getRoleColor}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
