export const ordersTemplate = (user, orders) => {
  return `
    <div class="h-screen bg-[#020617] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      <!-- Ambient Background -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full filter blur-[120px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full filter blur-[120px]"></div>
      </div>

      <!-- Compact Top Bar -->
      <nav class="relative z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 p-4 px-6 flex justify-between items-center shadow-2xl">
        <div class="flex items-center gap-4">
          <button id="backToHome" class="p-2 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white">
            <i data-lucide="arrow-left" class="w-6 h-6"></i>
          </button>
          <div class="flex items-center gap-2 text-xl font-black tracking-tighter text-white italic">
             <i data-lucide="shopping-bag" class="text-blue-500 w-6 h-6"></i>
             Purchase<span class="text-blue-500 uppercase not-italic">History</span>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <button id="logoutBtn" class="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black transition-all border border-red-500/10 uppercase tracking-widest">
             Logout
          </button>
        </div>
      </nav>

      <div class="flex-1 overflow-hidden relative z-10 p-8">
        <div class="max-w-5xl mx-auto h-full flex flex-col">
           <div class="flex justify-between items-center mb-8">
              <div>
                <h2 class="text-3xl font-black text-white italic tracking-tighter uppercase mb-1">My Orders</h2>
                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Showing all your past transactions</p>
              </div>
              <div class="bg-white/5 border border-white/5 rounded-2xl px-6 py-3 flex items-center gap-4">
                 <div class="text-right">
                    <p class="text-[8px] text-slate-500 font-black uppercase tracking-widest">Lifetime Spend</p>
                    <p class="text-lg font-black text-blue-500 italic">$${orders.reduce((acc, o) => acc + (parseFloat(o.totalPrice) || 0), 0).toFixed(2)}</p>
                 </div>
                 <div class="h-8 w-px bg-white/10"></div>
                 <div class="text-right">
                    <p class="text-[8px] text-slate-500 font-black uppercase tracking-widest">Total Orders</p>
                    <p class="text-lg font-black text-white italic">${orders.length}</p>
                 </div>
              </div>
           </div>

           <div class="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2">
              ${orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(
                  (o) => `
                <div class="bg-linear-to-br from-[#0B1120] to-[#020617] border border-white/20 p-6 rounded-[2.5rem] flex items-center justify-between group hover:border-blue-500 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden">
                   <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
                   <div class="flex items-center gap-6 relative z-10">
                      <div class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-blue-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                         <i data-lucide="package" class="w-6 h-6"></i>
                      </div>
                      <div>
                         <div class="flex items-center gap-3 mb-1">
                            <h3 class="text-lg font-black text-white uppercase tracking-tight">${o.product.name}</h3>
                            <span class="px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest border border-green-500/10">Completed</span>
                         </div>
                         <div class="flex items-center gap-4">
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Qty: ${o.quantity}</p>
                            <span class="text-slate-700">•</span>
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">${new Date(o.createdAt).toLocaleDateString()} at ${new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                         </div>
                      </div>
                   </div>
                   
                   <div class="text-right">
                      <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Total Paid</p>
                      <p class="text-2xl font-black text-white italic tracking-tighter">$${parseFloat(o.totalPrice).toFixed(2)}</p>
                   </div>
                </div>
              `,
                )
                .join("")}
              
              ${
                orders.length === 0
                  ? `
                <div class="flex flex-col items-center justify-center py-40 opacity-20">
                   <i data-lucide="ghost" class="w-20 h-20 mb-6"></i>
                   <p class="text-xl font-black uppercase tracking-[0.4em] italic">No transaction history yet</p>
                   <button id="goBackBtn" class="mt-8 px-8 py-3 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest">Start Shopping</button>
                </div>
              `
                  : ""
              }
           </div>
        </div>
      </div>
    </div>
  `;
};
