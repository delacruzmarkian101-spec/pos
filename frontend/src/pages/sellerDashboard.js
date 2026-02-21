import { getCategoryIcon } from "../utils/icons";

export const sellerTemplate = (user, products, orders) => {
  const myProducts = products.filter(
    (p) => p.seller.id === user.id && p.isActive,
  );
  const totalSales = orders.reduce(
    (acc, o) => acc + parseFloat(o.totalPrice),
    0,
  );

  const categories = [
    "Bakery",
    "Fast Food",
    "Healthy",
    "Drinks",
    "Desserts",
    "Protein",
    "Others",
  ];

  return `
    <div class="h-screen bg-[#0F172A] text-slate-200 font-sans flex flex-col md:flex-row relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-[120px]"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full filter blur-[120px]"></div>
      </div>

      <!-- Sidebar -->
      <aside class="relative z-10 w-full md:w-64 h-full bg-[#0B1120]/80 backdrop-blur-xl border-r border-white/5 flex flex-col">
        <div class="p-6 border-b border-white/5">
          <div class="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
             <i data-lucide="utensils" class="text-blue-500 w-6 h-6"></i>
             Gusto<span class="text-blue-500">POS</span>
          </div>
        </div>
        
        <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
          <div class="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            <span class="font-bold">Store Insights</span>
          </div>
        </nav>

        <div class="p-4 border-t border-white/5 bg-black/20">
          <div class="flex items-center gap-3 px-4 py-3 text-slate-400 group">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase italic shadow-lg shadow-blue-900/40">
               ${user.username.charAt(0)}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-white truncate">${user.username}</p>
              <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Seller</p>
            </div>
          </div>
          <button id="logoutBtn" class="w-full mt-2 flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <i data-lucide="log-out" class="w-4 h-4"></i> Logout
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="relative z-10 flex-1 h-full overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black text-white tracking-tight leading-none italic uppercase">Seller Dashboard</h1>
            <p class="text-slate-400 mt-2 font-medium">Manage your inventory and monitor live performance.</p>
          </div>
          
          <div class="flex gap-4">
            <div class="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
               <div class="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                 <i data-lucide="sandwich" class="w-5 h-5"></i>
               </div>
               <div>
                 <p class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Inventory</p>
                 <p class="text-lg font-black text-white leading-none">${myProducts.length}</p>
               </div>
            </div>
            <div class="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
               <div class="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                 <i data-lucide="trending-up" class="w-5 h-5"></i>
               </div>
               <div>
                 <p class="text-[10px] uppercase tracking-widest font-bold text-slate-500">Total Sales</p>
                 <p class="text-lg font-black text-white leading-none">$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
               </div>
            </div>
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Add Product Card -->
          <div class="lg:col-span-4 lg:sticky lg:top-0 space-y-6">
            <div class="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
              <div class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="plus" class="text-blue-500 w-5 h-5"></i> Add Product
              </h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Product Name</label>
                  <input type="text" id="pName" placeholder="e.g. Fresh Salad Box" class="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white placeholder:text-slate-700">
                </div>

                <div>
                  <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Category</label>
                  <select id="pCategory" class="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white appearance-none">
                    ${categories
                      .map((c) => `<option value="${c}">${c}</option>`)
                      .join("")}
                  </select>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Price</label>
                    <div class="relative group">
                      <span class="absolute left-3 inset-y-0 flex items-center text-slate-700">$</span>
                      <input type="number" id="pPrice" placeholder="0.00" class="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white">
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Stock</label>
                    <input type="number" id="pStock" placeholder="0" class="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white">
                  </div>
                </div>

                <button id="addPBtn" class="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-lg shadow-blue-950/20 active:scale-[0.98] mt-4">
                  Register Item
                </button>
              </div>
            </div>
          </div>

          <!-- Inventory List -->
          <div class="lg:col-span-8 space-y-8">
            <div class="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
               <div class="flex justify-between items-center mb-6 px-2">
                 <h3 class="text-xl font-black text-white italic uppercase tracking-tight">Current Inventory</h3>
                 <span class="text-[10px] bg-blue-600/10 text-blue-400 px-3 py-1 border border-blue-500/20 rounded-full font-bold uppercase tracking-tighter italic">Live Stock</span>
               </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/5 sticky top-0 bg-[#111827] z-10">
                        <th class="pb-4 px-2">Product Details</th>
                        <th class="pb-4 text-center">Price</th>
                        <th class="pb-4 text-center">Stock</th>
                        <th class="pb-4 text-center">Status</th>
                        <th class="pb-4 text-right pr-2">Management</th>
                      </tr>
                    </thead>
                  </table>
                </div>

                <div class="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <table class="w-full text-left">
                    <tbody class="divide-y divide-white/5">
                     ${myProducts
                       .map(
                         (p) => `
                       <tr class="group hover:bg-white/5 transition-colors">
                         <td class="py-4 px-2">
                           <div class="flex items-center gap-3">
                             <div class="w-10 h-10 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                               <i data-lucide="${getCategoryIcon(p.category)}" class="w-5 h-5"></i>
                             </div>
                             <div>
                               <div class="font-bold text-white uppercase tracking-tight">${p.name}</div>
                               <div class="text-[10px] text-slate-500 font-bold tracking-widest uppercase">${p.category} • SKU-${p.id}</div>
                             </div>
                           </div>
                         </td>
                         <td class="py-4 text-center text-blue-400 font-black tracking-tight">$${p.price}</td>
                         <td class="py-4 text-center font-mono text-slate-400 uppercase text-xs">${p.stock}</td>
                         <td class="py-4 text-center text-xs">
                            ${
                              p.stock > 0
                                ? `<span class="text-green-500 bg-green-500/10 px-2 py-1 rounded-lg font-bold italic border border-green-500/20">Active</span>`
                                : `<span class="text-red-500 bg-red-500/10 px-2 py-1 rounded-lg font-bold italic border border-red-500/20">Empty</span>`
                            }
                         </td>
                         <td class="py-4 text-right pr-2">
                           <div class="flex items-center justify-end gap-2">
                             <button onclick="handleEdit(${p.id}, '${p.name}', ${p.price}, ${p.stock}, '${p.category}')" class="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                               <i data-lucide="edit" class="w-4 h-4"></i>
                             </button>
                             <button onclick="handleDelete(${p.id})" class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white transition-all">
                               <i data-lucide="trash-2" class="w-4 h-4"></i>
                             </button>
                           </div>
                         </td>
                       </tr>
                     `,
                       )
                       .join("")}
                   </tbody>
                 </table>
                 ${myProducts.length === 0 ? `<p class="text-center py-20 text-slate-700 italic border-t border-white/5">No items registered yet.</p>` : ""}
               </div>
            </div>

            <!-- Recent Transactions -->
            <div class="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
               <div class="flex justify-between items-center mb-6 px-2">
                 <h3 class="text-xl font-black text-white italic uppercase tracking-tight">
                   <i data-lucide="shopping-bag" class="text-blue-500 w-5 h-5 inline-block mr-2 mb-1"></i>
                   Recent Transactions
                 </h3>
                 <span class="text-[10px] bg-blue-600/10 text-blue-400 px-3 py-1 border border-blue-500/20 rounded-full font-bold uppercase tracking-tighter italic">History</span>
               </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/5 sticky top-0 bg-[#111827] z-10">
                        <th class="pb-4 px-2">TXN ID</th>
                        <th class="pb-4">Product</th>
                        <th class="pb-4 text-center">Buyer</th>
                        <th class="pb-4 text-center">Qty</th>
                        <th class="pb-4 text-right pr-2">Total Amount</th>
                      </tr>
                    </thead>
                  </table>
                </div>

                <div class="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <table class="w-full text-left">
                    <tbody class="divide-y divide-white/5">
                     ${orders
                       .map(
                         (o) => `
                       <tr class="group hover:bg-white/5 transition-colors">
                         <td class="py-4 px-2 text-[10px] font-black text-slate-500 tracking-widest uppercase">#${o.id}</td>
                         <td class="py-4">
                           <div class="flex items-center gap-3">
                             <div class="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-blue-500 transition-colors">
                               <i data-lucide="clock" class="w-4 h-4"></i>
                             </div>
                             <div class="font-bold text-white uppercase tracking-tight">${o.product.name}</div>
                           </div>
                         </td>
                         <td class="py-4 text-center">
                           <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">${o.buyer.username}</span>
                         </td>
                         <td class="py-4 text-center font-mono text-slate-400 uppercase text-xs">${o.quantity}</td>
                         <td class="py-4 text-right pr-2 font-black text-blue-500 italic text-lg tracking-tighter">$${o.totalPrice}</td>
                       </tr>
                     `,
                       )
                       .join("")}
                   </tbody>
                 </table>
                 ${orders.length === 0 ? `<p class="text-center py-10 text-slate-700 italic border-t border-white/5">Looking for transactions...</p>` : ""}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
};
