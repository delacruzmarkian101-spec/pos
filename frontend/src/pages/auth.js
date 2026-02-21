export const loginTemplate = (mode = "login") => `
    <div class="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-4 overflow-hidden relative">
      
      <!-- Background Glows -->
      <div class="absolute inset-0 z-0 text-white pointer-events-none">
        <div class="absolute -top-24 -left-24 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div class="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </div>

      <div class="w-full max-w-[380px] z-10 transition-all duration-300 transform">
        <!-- Back Link -->
        <button id="backBtn" class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
          <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-all border border-white/5">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </div>
          <span class="font-bold text-xs uppercase tracking-widest">Return</span>
        </button>

        <!-- Login Card -->
        <div class="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          <div class="flex flex-col items-center mb-6">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-900/40">
              <i data-lucide="utensils" class="w-6 h-6 text-white"></i>
            </div>
            <h1 class="text-2xl font-black text-white tracking-tight leading-none">Gusto<span class="text-blue-500">POS</span></h1>
            <p class="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2 italic">
              ${mode === "login" ? "Welcome Back" : "Create Account"}
            </p>
          </div>

          <div class="space-y-4">
            <div id="authError" class="hidden bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-xl text-[10px] font-bold items-center gap-2">
              <i data-lucide="shield-alert" class="w-4 h-4"></i>
              <span>All fields are required.</span>
            </div>

            <div class="space-y-1.5">
              <label class="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 ml-1">Identity</label>
              <div class="relative group">
                <i data-lucide="user" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors"></i>
                <input type="text" id="username" placeholder="Username" class="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white placeholder:text-slate-700 text-sm font-medium">
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 ml-1">Security</label>
              <div class="relative group">
                <i data-lucide="lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors"></i>
                <input type="password" id="password" placeholder="••••••••" class="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white placeholder:text-slate-700 text-sm font-medium">
              </div>
            </div>

            ${
              mode === "register"
                ? `
            <div class="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <label class="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 ml-1">Account Role</label>
              <div id="roleSelector" class="flex p-1 bg-slate-950/50 rounded-2xl border border-white/5 h-11 relative">
                <input type="hidden" id="roleInput" value="seller">
                <button type="button" id="roleBtnSeller" data-role="seller" class="role-option flex-1 rounded-xl text-[10px] font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 z-10 bg-blue-600 text-white">
                  <i data-lucide="store" class="w-3.5 h-3.5"></i> Seller
                </button>
                <button type="button" id="roleBtnBuyer" data-role="buyer" class="role-option flex-1 rounded-xl text-[10px] font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 z-10 text-slate-600">
                  <i data-lucide="user" class="w-3.5 h-3.5"></i> Buyer
                </button>
              </div>
            </div>
            `
                : ""
            }

            <div class="pt-4 flex flex-col gap-3">
              ${
                mode === "login"
                  ? `
                <button id="loginBtn" class="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-blue-950/20 active:scale-[0.98]">
                  Sign In
                </button>
                <div class="flex items-center gap-4 py-1">
                  <div class="flex-1 h-px bg-white/5"></div>
                  <span class="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] italic">New to Gusto?</span>
                  <div class="flex-1 h-px bg-white/5"></div>
                </div>
                <button id="switchToReg" class="w-full py-3.5 rounded-2xl bg-slate-800/80 text-slate-300 font-black text-sm hover:bg-slate-700 transition-all border border-white/5">
                  Create Account
                </button>
              `
                  : `
                <button id="regBtn" class="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-blue-950/20 active:scale-[0.98]">
                  Join Gusto
                </button>
                <div class="flex items-center gap-4 py-1">
                  <div class="flex-1 h-px bg-white/5"></div>
                  <span class="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] italic">Have an account?</span>
                  <div class="flex-1 h-px bg-white/5"></div>
                </div>
                <button id="switchToLogin" class="w-full py-3.5 rounded-2xl bg-slate-800/80 text-slate-300 font-black text-sm hover:bg-slate-700 transition-all border border-white/5">
                  Back to Sign In
                </button>
              `
              }
            </div>
          </div>
        </div>
        
        <p class="text-center mt-6 text-slate-600 text-[10px] font-medium uppercase tracking-[0.3em] italic">
          Cloud Secured POS
        </p>
      </div>
    </div>
  `;
