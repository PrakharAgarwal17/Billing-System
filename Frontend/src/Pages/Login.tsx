import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/signin", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      // Example: Token save
      // localStorage.setItem("token", res.data.token);
      // Redirect Dashboard
      navigate("/MakeYourStore");
    } catch (error) {
      console.error(error);
      alert("email or pass is wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="relative bg-gray-900/70 border border-gray-700/60 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center gap-6">
        
        {/* Logo */}
        <img
          src="logo.jpg"
          alt="logo"
          className="w-16 h-16 rounded-2xl shadow-lg mb-2"
        />

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white tracking-tight text-center">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center text-sm -mt-2">
          Sign in to continue to your dashboard
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="w-full mt-6 space-y-5">
          
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-black to-gray-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/40"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full gap-2 my-4">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>

        {/* Social Login */}
        <div className="flex gap-4 w-full">
          {["Google", "GitHub"].map((platform) => (
            <button
              key={platform}
              className="flex-1 py-2 bg-gray-800/60 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition flex items-center justify-center gap-2"
            >
              <img
                src={
                  platform === "Google"
                    ? "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    : "https://cdn-icons-png.flaticon.com/512/25/25231.png"
                }
                alt={platform}
                className="w-5 h-5"
              />
              {platform}
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}