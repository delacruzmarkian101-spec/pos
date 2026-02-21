import { getCategoryIcon } from "../utils/icons";

export const buyerTemplate = (
  user,
  products,
  orders,
  activeCategory = "All",
  cart = [],
) => {
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
          <div class="flex items-center gap-2 text-xl font-black tracking-tighter text-white italic">
             <i data-lucide="utensils" class="text-blue-500 w-6 h-6"></i>
             Gusto<span class="text-blue-500 uppercase not-italic">Hub</span>
          </div>
          <div class="h-6 w-px bg-white/10 mx-2"></div>
          <div class="hidden md:flex items-center gap-2">
            <span class="text-xs font-black text-white italic uppercase tracking-tight">Buyer Portal</span>
            <span class="text-[10px] text-slate-500 font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/10 uppercase tracking-widest ml-2">${user.username}</span>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <button id="historyBtn" class="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-all group flex items-center gap-2">
             <i data-lucide="clock" class="w-5 h-5 text-slate-400 group-hover:text-blue-500"></i>
             <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:block">History</span>
          </button>
          <button id="cartBtn" class="relative bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-all group">
             <i data-lucide="shopping-cart" class="w-5 h-5 text-blue-500"></i>
             <span class="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0B1120]">${cart.length}</span>
          </button>
          <button id="logoutBtn" class="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black transition-all border border-red-500/10 uppercase tracking-widest">
             Logout
          </button>
        </div>
      </nav>

      <div class="flex-1 flex flex-col overflow-hidden relative z-10">
        <!-- Products Area -->
        <main class="flex-1 flex flex-col overflow-hidden bg-black/20">
          <!-- Category Quick Filters -->
          <div class="p-6 pb-2 flex gap-3 overflow-x-auto no-scrollbar">
            ${categories
              .map(
                (cat) => `
              <button data-category="${cat}" class="category-btn flex-none px-6 py-3 rounded-2xl ${
                cat === activeCategory
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-400/50"
                  : "bg-slate-900/50 border border-white/5 text-slate-400 hover:bg-slate-800"
              } text-[10px] font-black uppercase tracking-widest transition-all border cursor-pointer active:scale-95">
                ${cat}
              </button>
            `,
              )
              .join("")}
          </div>

          <!-- Product Grid -->
          <div class="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
            <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 pb-10">
              ${filteredProducts
                .map(
                  (p) => `
                <div class="group relative bg-linear-to-br from-[#0F172A] to-[#1E293B] border border-white/10 rounded-[2rem] p-5 text-left transition-all duration-300 flex flex-col h-full shadow-2xl">
                  <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none"></div>
                  
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all border border-white/5">
                      <i data-lucide="${getCategoryIcon(p.category)}" class="w-6 h-6"></i>
                    </div>
                    <div class="text-xl font-black text-blue-500 italic tracking-tighter">$${p.price}</div>
                  </div>

                  <div class="flex-1">
                    <h3 class="text-lg font-black text-white mb-1 uppercase tracking-tight leading-tight group-hover:text-blue-400 transition-colors">${p.name}</h3>
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic truncate italic">By ${p.seller.username}</span>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center gap-2 border-t border-white/5 pt-5">
                    <div class="flex-1">
                      <p class="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Status</p>
                      <p class="text-[10px] font-black ${p.stock > 0 ? "text-green-500" : "text-red-500"} uppercase tracking-tight italic">${p.stock > 0 ? `${p.stock} Stock Left` : "Out of Stock"}</p>
                    </div>
                    <div class="flex gap-2">
                      <button onclick="handleDirectBuy(${p.id}, ${p.price}, '${p.name}')" class="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                         <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                      </button>
                      <button onclick="handleBuy(${p.id}, ${p.price}, '${p.name}')" class="px-6 h-10 rounded-xl bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-lg">
                         Buy
                      </button>
                    </div>
                  </div>
                </div>
              `,
                )
                .join("")}
              ${
                filteredProducts.length === 0
                  ? `<div class="col-span-full py-40 text-center text-slate-800 font-black uppercase tracking-[0.3em] italic">No available stock in this category</div>`
                  : ""
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
};
