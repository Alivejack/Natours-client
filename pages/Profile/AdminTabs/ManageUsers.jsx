import axios from 'axios';
import { useMemo, useState } from 'react';
import { notify } from '../../../utils/notify';

const ROLE_ORDER = ['admin', 'lead-guide', 'guide', 'user'];

export default function ManageUsers() {
  const [users, setUsers] = useState(null);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        withCredentials: true,
      });

      setUsers(res.data.doc);
      notify('success', `Successfully loaded ${res.data.doc.length} users.`);
    } catch (err) {
      console.log(err.response.data.message);
      notify('error', "couldn't get the data from server !");
    }
  };

  const sortedUsers = useMemo(() => {
    if (!users) return null; // Create a copy of the array to sort it without modifying the state directly

    return [...users].sort((a, b) => {
      // Find the index of each user's role in the ROLE_ORDER array
      const indexA = ROLE_ORDER.indexOf(a.role);
      const indexB = ROLE_ORDER.indexOf(b.role); // Fallback for roles not in ROLE_ORDER (place them at the end)

      const finalIndexA = indexA === -1 ? Infinity : indexA;
      const finalIndexB = indexB === -1 ? Infinity : indexB; // The sort function compares the indices: a smaller index (higher priority role) comes first

      return finalIndexA - finalIndexB;
    });
  }, [users]);

  const roleColors = {
    admin: 'bg-red-500 text-white',
    'lead-guide': 'bg-purple-500 text-white',
    guide: 'bg-blue-500 text-white',
    user: 'bg-green-500 text-white',
  };

  const getRoleColor = (role) => {
    return roleColors[role] || 'bg-gray-300';
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className=" bg-green-500 text-white px-4 py-2 my-10 rounded-2xl hover:bg-green-600 hover:cursor-pointer "
        onClick={getAllUsers}
      >
        get all the users
      </button>
      {sortedUsers && (
        <div className="flex flex-col gap-2 flex-wrap">
          {sortedUsers.map((user, i) => (
            <div
              key={i}
              className={`${getRoleColor(user.role)} rounded-2xl py-2 px-4 flex flex-col`}
            >
              <span>name: {user.name}</span>
              <span>email: {user.email}</span>
              <span>role: {user.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
