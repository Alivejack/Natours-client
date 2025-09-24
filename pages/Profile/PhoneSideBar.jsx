export default function PhoneSideBar({ isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="h-screen w-full z-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600">
          <div></div>
        </div>
      )}
    </>
  );
}
