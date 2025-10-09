export const UserDisplayCard = ({ user, handleEditClick }) => {
  const roleColors = {
    admin: 'bg-yellow-600 text-white',
    'lead-guide': 'bg-purple-600 text-white',
    guide: 'bg-blue-600 text-white',
    user: 'bg-green-600 text-white',
  };

  const getRoleColor = (role) => {
    return roleColors[role] || 'bg-gray-300 text-gray-800';
  };

  return (
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
};
