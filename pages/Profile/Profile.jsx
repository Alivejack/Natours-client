import PcSideBar from './PcSideBar';
import { Outlet } from 'react-router-dom';

export default function Profile() {
  return (
    <section className="flex md:w-[96%] mx-auto">
      {/* ---- SIDE BAR ---- */}
      <PcSideBar />

      {/* ---- PAGE ---- */}
      <div className={`h-screen w-full shrink bg-gray-100`}>
        <Outlet />
      </div>
    </section>
  );
}
