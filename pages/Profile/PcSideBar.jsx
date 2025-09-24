import { Settings, Briefcase, Star, CreditCard, Map, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavLinkClass = ({ isActive }) => {
  return isActive ? 'text-white font-bold border-l-4 pl-2 border-white' : 'text-white';
};

const li = (Icon, text, url) => {
  return (
    <NavLink to={url} className={NavLinkClass}>
      <li className="flex items-center gap-x-3 hover:scale-105 hover:cursor-pointer transition-transform duration-200">
        <Icon size={23} /> {text}
      </li>
    </NavLink>
  );
};

export default function SideBar() {
  const { user } = useAuth();

  return (
    <div className="hidden shrink-0 md:block h-screen md:w-1/3 max-w-[24rem] bg-gradient-to-br from-green-400 via-green-400 to-green-500 pl-14">
      <ul className="flex flex-col gap-y-8 my-10">
        {li(Settings, 'SETTING', '/me/settings')}
        {li(Briefcase, 'MY BOOKINGS', '/me/bookings')}
        {li(Star, 'MY REVIEWS', '/me/reviews')}
        {li(CreditCard, 'BILLING', '/me/billing')}
      </ul>
      {user?.role === 'admin' && (
        <>
          <p className="font-semibold text-xs text-white mt-8 border-b pb-2 mr-[14%]">ADMIN</p>
          <ul className="flex flex-col gap-y-8 my-10">
            {li(Map, 'MANAGE TOURS', '/me/managetours')}
            {li(Users, 'MANAGE USERS', '/me/manageusers')}
            {li(Star, 'MANAGE REVIEWS', '/me/managereviews')}
            {li(Briefcase, 'MANAGE BOOKINGS', '/me/managebookings')}
          </ul>
        </>
      )}
    </div>
  );
}
