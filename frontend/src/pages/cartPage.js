export const cartTemplate = (user, cartItems) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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
             <i data-lucide="shopping-cart" class="text-blue-500 w-6 h-6"></i>
             Cart<span class="text-blue-500 uppercase not-italic">Summary</span>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center gap-2">
            <span class="text-xs font-black text-white italic uppercase tracking-tight">Operator</span>
            <span class="text-[10px] text-slate-500 font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/10 uppercase tracking-widest ml-2">${user.username}</span>
          </div>
          <button id="logoutBtn" class="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black transition-all border border-red-500/10 uppercase tracking-widest">
             Logout
          </button>
        </div>
      </nav>

      <div class="flex-1 flex overflow-hidden relative z-10 p-8 gap-8">
        <!-- Cart Items List -->
        <main class="flex-1 flex flex-col overflow-hidden bg-slate-900/20 border border-white/5 rounded-[2rem] p-8">
           <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-black text-white italic tracking-tighter uppercase">Shopping Cart</h2>
              <span class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">${cartItems.length} Items Selected</span>
           </div>

           <div class="flex-1 overflow-y-auto no-scrollbar space-y-4">
              ${cartItems
                .map(
                  (item, index) => `
                <div class="bg-linear-to-br from-[#0B1120] to-[#020617] border border-white/20 p-6 rounded-[2.5rem] flex items-center justify-between group hover:border-blue-500 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden">
                   <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
                   <div class="flex items-center gap-6 relative z-10">
                      <div class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-blue-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                         <i data-lucide="package" class="w-8 h-8"></i>
                      </div>
                      <div>
                         <h3 class="text-lg font-black text-white uppercase tracking-tight">${item.name}</h3>
                         <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Unit Price: $${item.price}</p>
                      </div>
                   </div>
                   
                   <div class="flex items-center gap-8">
                      <div class="flex items-center gap-4 bg-black/40 p-2 rounded-xl border border-white/5">
                         <button onclick="updateCartQty(${index}, -1)" class="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <i data-lucide="minus" class="w-4 h-4"></i>
                         </button>
                         <span class="text-sm font-black text-white w-4 text-center">${item.quantity}</span>
                         <button onclick="updateCartQty(${index}, 1)" class="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                         </button>
                      </div>
                      <div class="text-right w-24">
                         <p class="text-lg font-black text-blue-500 italic">$${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button onclick="removeFromCart(${index})" class="p-2 text-slate-600 hover:text-red-500 transition-all">
                         <i data-lucide="trash-2" class="w-5 h-5"></i>
                      </button>
                   </div>
                </div>
              `,
                )
                .join("")}
              ${
                cartItems.length === 0
                  ? `
                <div class="flex flex-col items-center justify-center py-40 opacity-20">
                   <i data-lucide="shopping-cart" class="w-20 h-20 mb-6"></i>
                   <p class="text-xl font-black uppercase tracking-[0.4em] italic">Your cart is empty</p>
                   <button id="goBackBtn" class="mt-8 px-8 py-3 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest">Continue Shopping</button>
                </div>
              `
                  : ""
              }
           </div>
        </main>

        <!-- Order Summary (Sidebar style) -->
        <aside class="w-[400px] flex flex-col gap-6">
           <div class="bg-[#0B1120] border border-white/5 rounded-[2rem] p-8 flex flex-col shadow-2xl">
              <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">Order Summary</h3>
              
              <div class="space-y-4 mb-8">
                 <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span>Subtotal</span>
                    <span>$${total.toFixed(2)}</span>
                 </div>
                 <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                 </div>
                 <div class="h-px bg-white/5 my-4"></div>
                 <div class="flex justify-between items-end">
                    <div>
                       <p class="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Total Payable</p>
                       <p class="text-4xl font-black text-white italic tracking-tighter">$${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                 </div>
              </div>

              <button id="checkoutBtn" class="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] uppercase tracking-widest flex items-center justify-center gap-3">
                Checkout Now
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
              
              <p class="text-center text-[9px] text-slate-600 mt-8 font-bold uppercase tracking-widest">Transaction Security by GustoPOS</p>
           </div>

           <!-- Quick Help/Promo Card -->
           <div class="bg-linear-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div class="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
              <p class="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">POS Tip</p>
              <h4 class="text-lg font-black leading-tight mb-4 italic uppercase tracking-tighter">Save 10% on your next order with GustoHub+</h4>
              <button class="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/30 transition-all">Learn More</button>
           </div>
        </aside>
      </div>
    </div>
  `;
};
