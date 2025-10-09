export const UserEditForm = ({
  userId,
  formData,
  handleFormChange,
  handleUpdateUser,
  handleCancel,
  deleteUser,
}) => {
  const AVAILABLE_ROLES = ['admin', 'lead-guide', 'guide', 'user']; // List of roles for the select dropdown

  return (
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
          className="flex-1 bg-gray-400 text-white py-2 rounded-full hover:bg-gray-500 transition-colors duration-200 font-semibold hover:cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => handleUpdateUser(userId)}
          className="flex-1 bg-indigo-500 text-white py-2 rounded-full hover:bg-indigo-600 transition-colors duration-200 font-semibold hover:cursor-pointer"
        >
          Save Changes
        </button>
      </div>

      <button
        className=" bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition-colors duration-200 font-semibold hover:cursor-pointer"
        onClick={() => deleteUser(userId)}
      >
        Delete User
      </button>
    </div>
  );
};
