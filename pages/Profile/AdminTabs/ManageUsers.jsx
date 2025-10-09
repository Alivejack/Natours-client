import { useMemo, useState } from 'react';
import axios from 'axios';

import { notify } from '../../../utils/notify';
import { UserDisplayCard } from '../../../components/UserDisplayCard';
import { UserEditForm } from '../../../components/UserEditForm';

const ROLE_ORDER = ['admin', 'lead-guide', 'guide', 'user'];

export default function ManageUsers() {
  const [users, setUsers] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        withCredentials: true,
      });

      setUsers(res.data.doc.map((user) => ({ ...user, id: user._id })));
      notify('success', `Successfully loaded ${res.data.doc.length} users.`);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      notify('error', "Couldn't get the data from server!");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        withCredentials: true,
      });
      notify('success', 'User deleted successfully.');
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err.response?.data?.message || err.message);
      notify('error', err.response?.data?.message || 'Failed to delete user.');
    }
  };

  const handleSearch = async () => {
    if (!search && !role) return;

    try {
      const params = new URLSearchParams();
      console.log(`1 ${params}`);

      if (search) {
        params.append('name', search);
        console.log(`2 ${params}`);
      }
      if (role) {
        params.append('role', role);
        console.log(`3 ${params}`);
      }
      console.log(`4 ${params}`);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/search?${params.toString()}`,
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.users.map((user) => ({ ...user, id: user._id })));
      notify('success', `Successfully loaded ${res.data.result} users.`);
    } catch (err) {
      notify('error', err.response?.data?.message || "Couldn't get the data from server!");
    } finally {
      setSearch('');
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

      <div className="flex gap-4 mb-4 w-1/2">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:shadow-xl outline-none"
        >
          <option value="">All Roles</option>
          {ROLE_ORDER.map((role) => (
            <option key={role} value={role} className="capitalize">
              {role}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search users..."
          className="p-2 w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:border-2 focus:shadow-xl outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button
          className=" bg-indigo-600 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-[1.05] hover:cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

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
                deleteUser={handleDeleteUser}
              />
            ) : (
              <UserDisplayCard key={user.id} user={user} handleEditClick={handleEditClick} />
            )
          )}
        </div>
      )}
    </div>
  );
}
