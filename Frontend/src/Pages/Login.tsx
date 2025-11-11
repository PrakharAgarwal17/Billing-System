import { motion } from "framer-motion";

export function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gray-900/70 border border-gray-700/60 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <motion.img
          src="logo.jpg"
          alt="logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl shadow-lg mb-2"
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-white tracking-tight text-center"
        >
          Welcome Back
        </motion.h1>
        <p className="text-gray-400 text-center text-sm -mt-2">
          Sign in to continue to your dashboard
        </p>

        {/* Form */}
        <motion.form
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="w-full mt-6 space-y-5"
        >
          {["email", "password"].map((field, i) => (
            <motion.input
              key={field}
              type={field}
              placeholder={
                field === "email" ? "Enter your email" : "Enter your password"
              }
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400/70"
            />
          ))}

          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(59,130,246,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3  bg-gradient-to-r from-black to-gray-700 text-white text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
          >
            Sign In
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center w-full gap-2 my-4">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>

        {/* Social Login */}
        <motion.div
          className="flex gap-4 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
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
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 text-sm text-center mt-4"
        >
          Don't have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
