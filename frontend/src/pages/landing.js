export const landingTemplate = () => `
    <div class="min-h-screen bg-slate-900 text-white font-sans overflow-y-auto">
      
      <!-- Navbar -->
      <nav class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight">
             <i data-lucide="utensils" class="text-blue-500 w-6 h-6 md:w-8 md:h-8"></i>
             Gusto<span class="text-blue-500">POS</span>
          </div>
          <button id="navLoginBtn" class="text-sm font-semibold hover:text-blue-400 transition">Log In <span aria-hidden="true">&rarr;</span></button>
        </div>
      </nav>

      <!-- Section 1: Hero -->
      <section class="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden min-h-[85vh]">
        <div class="absolute inset-0 z-0">
          <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
          <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
        </div>
        
        <div class="z-10 max-w-4xl mt-8">
          <div class="mb-8 flex justify-center">
             <div class="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center gap-2">
               <i data-lucide="zap" class="w-4 h-4"></i> Modern Food Commerce
             </div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            The future of food <br />
            <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Retail</span>
          </h1>
          
          <p class="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            A premium Point of Sale tailored for modern food stores. Empowering merchants to scale and customers to discover.
          </p>
          
          <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button id="heroCtaBtn" class="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
              Start Shopping <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Section 2: Features -->
      <section class="py-24 bg-slate-800/40 border-y border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold mb-4">Built for Growth</h2>
            <p class="text-slate-400 text-lg md:text-xl shrink max-w-xl mx-auto">Scalable solutions for food businesses of all sizes.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-slate-800/80 backdrop-blur border border-slate-700 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800 transition duration-300 group">
              <div class="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <i data-lucide="utensils" class="w-7 h-7"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Live Inventory Management</h3>
              <p class="text-slate-400 leading-relaxed">Real-time tracking of your food products. Automatically syncs across all customer touchpoints.</p>
            </div>
            
            <div class="bg-slate-800/80 backdrop-blur border border-slate-700 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800 transition duration-300 group">
              <div class="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <i data-lucide="sandwich" class="w-7 h-7"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Digital Storefront</h3>
              <p class="text-slate-400 leading-relaxed">Expertly designed portals for merchants to manage inventory and buyers to shop seamlessly.</p>
            </div>
            
            <div class="bg-slate-800/80 backdrop-blur border border-slate-700 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800 transition duration-300 group">
              <div class="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <i data-lucide="shield-check" class="w-7 h-7"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Enterprise Security</h3>
              <p class="text-slate-400 leading-relaxed">High-level encryption ensuring your transactions and business data are always protected.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Value/CTA Block -->
      <section class="py-32 px-6 bg-slate-900 flex justify-center relative z-10">
        <div class="w-full max-w-5xl bg-linear-to-br from-blue-900/40 to-slate-800/80 border border-blue-500/20 rounded-4xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-900/10">
          <div class="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
            <i data-lucide="store" class="w-8 h-8"></i>
          </div>
          
          <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white relative z-10 tracking-tight">Ready to scale your store?</h2>
          <p class="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">Join forward-thinking sellers already using Gusto to modernize their food business.</p>
          
          <button id="bottomCtaBtn" class="relative z-10 px-10 py-4 text-lg font-bold rounded-full bg-white text-slate-900 hover:bg-slate-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto">
            Get Started Now
          </button>
        </div>
      </section>
      
      <!-- Footer -->
      <footer class="py-8 border-t border-white/10 text-center text-slate-500 text-sm relative z-10">
        <p>&copy; ${new Date().getFullYear()} Gusto. The modern food commerce standard.</p>
      </footer>
    </div>
  `;
