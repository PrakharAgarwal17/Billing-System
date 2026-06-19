import { useState } from "react";
import { Mail, Lock, ArrowUpRight } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleAction = (e) => {
    e.preventDefault();
    console.log("Authenticating Session...", formData);
  };

  return (
    <form onSubmit={handleAction} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Corporate Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="email" 
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition duration-150"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-zinc-400">Security Phrase</label>
          <a href="#" className="text-[11px] text-zinc-500 hover:text-zinc-300 transition">Recover Key?</a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="password" 
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition duration-150"
          />
        </div>
      </div>

      <button 
        type="submit"
        className="group w-full mt-6 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-black/20"
      >
        <span>Access Dashboard</span>
        <ArrowUpRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
}