// import { Link, useLocation } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();

//   return (
//     <nav className="bg-green-500 text-white shadow-lg">
//       <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

//         <h1 className="text-2xl font-bold">
//           Auth App
//         </h1>

//         <div className="flex gap-5">

//           <Link
//             to="/login"
//             className={`transition ${
//               location.pathname === "/login"
//                 ? "font-bold underline"
//                 : "hover:text-yellow-300"
//             }`}
//           >
//             Login
//           </Link>

//           <Link
//             to="/signup"
//             className={`transition ${
//               location.pathname === "/signup"
//                 ? "font-bold underline"
//                 : "hover:text-yellow-300"
//             }`}
//           >
//             SignUp
//           </Link>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent cursor-pointer">
          Nova Auth
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/login"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              location.pathname === "/login"
                ? "bg-linear-to-r from-cyan-500 to-violet-600 text-white shadow-lg"
                : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800"
            }`}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              location.pathname === "/signup"
                ? "bg-linear-to-r from-cyan-500 to-violet-600 text-white shadow-lg"
                : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800"
            }`}
          >
            Sign Up
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;