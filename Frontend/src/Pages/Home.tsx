import {Link } from "react-router-dom";

export function Home() {
  return (
    <>

      {/* ULTIMATE BLACK CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* 1. Deep Void Black */}
        <div className="absolute inset-0 bg-black" />

        {/* 2. Subtle AI Grid (Matrix Vibes) */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #1a0033 0px, transparent 1px, transparent 50px, #1a0033 51px),
            repeating-linear-gradient(90deg, #1a0033 0px, transparent 1px, transparent 50px, #1a0033 51px)`,
            backgroundSize: '50px 50px',
          }}
          />

        {/* 3. Pulsing AI Core (Center Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900 rounded-full blur-3xl opacity-20 animate-pulse-core" />

        {/* 4. Floating Energy Orbs (Left & Right) */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full blur-3xl opacity-15 animate-orbit-left" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-indigo-600 to-purple-700 rounded-full blur-3xl opacity-15 animate-orbit-right" />

        {/* 5. Holographic Shimmer Sweep (Like Iron Man UI) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="shimmer-holo" />
          <div className="shimmer-holo delay-1000" />
        </div>

        {/* 6. Micro Noise Texture (Film Grain Feel) */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          />
      </div>

      {/* MAIN CONTENT - PERFECT CENTER */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-6">
        
        <div className="mb-10">
          <img
            src="logo.jpg"
            alt="logo"
            className="w-[90px] h-[90px] rounded-3xl shadow-lg ring-2 ring-purple-500/20"
            />
        </div>

        <div className="text-center max-w-4xl w-full">
          <h1 className="text-white font-['Vollkorn'] text-6xl md:text-8xl leading-tight">
            <span className="block">AI POWERED</span>
            <span className="block">BILLING SYSTEM</span>
          </h1>

        <p className="text-white/80 mt-6 text-base sm:text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed px-4">
            AI-powered system for automated, accurate, and secure billing management 
          </p>

          {/* BUTTONS - BILKUL WAHI, UNTOUCHED */}
          <div className=" flex gap-6 justify-center">
            <button className="h-10 w-20 px-6 py-3 bg-white cursor-pointer text-black rounded-br-lg font-semibold hover:bg-gray-200 transition mt-10">
             <Link to="/about">About</Link>
            </button>
            <button className="rounded-br-lg px-6 py-3 cursor-pointer w-[200px] h-[45px] p-20 bg-gradient-to-r from-black to-gray-700 text-white font-semibold hover:opacity-90 transition mt-10">
             <Link to="/login">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
}