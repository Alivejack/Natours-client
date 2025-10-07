import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { House, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Settings, Briefcase, Star, CreditCard, Map, Users } from 'lucide-react';

const NavBar = () => {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const navLinkClass = ({ isActive }) => {
    return isActive ? 'text-white font-bold border-l-4 pl-2 border-white' : 'text-white';
  };

  const li = (Icon, text, url) => {
    return (
      <NavLink to={url} className={navLinkClass}>
        <li className="flex items-center gap-x-3 hover:scale-105 hover:cursor-pointer transition-transform duration-200">
          <Icon size={23} /> {text}
        </li>
      </NavLink>
    );
  };

  return (
    <>
      <nav className="h-20 md:px-10 md:w-[96%] mx-auto md:mt-5 bg-neutral-700 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <Link
            className="hidden md:flex text-white font-thin text-xl hover:scale-110 transform transition items-center gap-2"
            to={'/'}
          >
            <House />
            HOME
          </Link>

          <button className="md:hidden ml-5" onClick={() => setOpen(!open)}>
            {open ? <X color="white" size={35} /> : <Menu color="white" size={35} />}
          </button>
        </div>

        <div className="flex justify-center">
          <Link to={'/'}>
            <img
              src="../assets/logo-white.png"
              className="w-24 mx-auto md:mx-0 "
              alt="natours logo"
            />
          </Link>
        </div>

        <div className="hidden md:flex gap-6 items-center flex-row-reverse">
          {loading ? (
            <span className=" text-white">Loading...</span>
          ) : user ? (
            <>
              <Link
                className="flex items-center gap-x-3 hover:scale-110 transition-all duration-200"
                to="/me/settings"
              >
                <img
                  src={`../users/${user.photo}`}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="ProfilePic"
                />
                <p className=" text-white uppercase select-none">{user.name.split(' ')[0]}</p>
              </Link>
              <button
                onClick={handleLogout}
                className=" text-white hover:scale-110 hover:cursor-pointer transition-all duration-200"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <Link
                className=" text-white hover:scale-110 transition-all ease-in-out duration-300"
                to={'/login'}
              >
                LOG IN
              </Link>
              <button className=" text-white hover:bg-white hover:text-black hover:cursor-pointer hover:shadow transform transition sm:border border-white rounded-full sm:py-2 sm:px-4">
                SIGN UP
              </button>
            </>
          )}
        </div>
      </nav>

      {/* SIDE BAR */}
      <div
        className={`${
          open ? 'w-full absolute z-10 flex' : 'absolute z-0 w-0 overflow-hidden'
        } md:hidden`}
      >
        <div
          className={`xs:w-1/2 w-full h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-700 transition-all duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className=" text-white flex flex-col gap-y-8 ml-14 w-fit my-10">
            {li(Settings, 'SETTING', '/me/settings')}
            {li(Briefcase, 'MY BOOKINGS', '/me/bookings')}
            {li(Star, 'MY REVIEWS', '/me/reviews')}
            {li(CreditCard, 'BILLING', '/me/billing')}
          </ul>
          {user?.role === 'admin' && (
            <>
              <p className="font-semibold text-xs text-white mt-8 border-b pb-2 mx-[14%]">ADMIN</p>
              <ul className="text-white flex flex-col gap-y-8 ml-14 w-fit my-10">
                {li(Map, 'MANAGE TOURS', '/me/managetours')}
                {li(Users, 'MANAGE USERS', '/me/manageusers')}
                {li(Star, 'MANAGE REVIEWS', '/me/managereviews')}
                {li(Briefcase, 'MANAGE BOOKINGS', '/me/managebookings')}
              </ul>
            </>
          )}
        </div>
        <div
          onClick={() => setOpen(false)}
          className={`xs:w-1/2 xs:block hidden h-screen bg-gray-800/50 transition-opacity duration-300 ${
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        ></div>
      </div>
    </>
  );
};

export default NavBar;
