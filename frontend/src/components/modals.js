export const editProductModal = (product, categories) => `
<div id="modalOverlay" class="fixed inset-0 z-100 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#111827] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
    <div class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>
    
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-black text-white italic uppercase tracking-tighter">Edit Product</h2>
      <button onclick="closeModal()" class="text-slate-500 hover:text-white transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>

    <form id="editProductForm" class="space-y-6">
      <input type="hidden" id="editId" value="${product.id}">
      
      <div>
        <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Product Name</label>
        <input type="text" id="editName" value="${product.name}" class="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white font-medium">
      </div>

      <div>
        <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Category</label>
        <div class="relative">
          <select id="editCategory" class="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white appearance-none font-medium">
            ${categories
              .map(
                (c) =>
                  `<option value="${c}" ${
                    c === product.category ? "selected" : ""
                  }>${c}</option>`,
              )
              .join("")}
          </select>
          <i data-lucide="chevron-down" class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none w-5 h-5"></i>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Price ($)</label>
          <input type="number" step="0.01" id="editPrice" value="${product.price}" class="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white font-black italic">
        </div>
        <div>
          <label class="block text-xs font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Stock Qty</label>
          <input type="number" id="editStock" value="${product.stock}" class="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-white font-black italic">
        </div>
      </div>

      <div class="pt-4 flex gap-4">
        <button type="button" onclick="closeModal()" class="flex-1 py-4 rounded-2xl bg-slate-900 text-slate-400 font-black text-xs hover:bg-slate-800 transition-all uppercase tracking-widest">
          Cancel
        </button>
        <button type="submit" class="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-black text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
`;

export const deleteProductModal = (id) => `
<div id="modalOverlay" class="fixed inset-0 z-100 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#111827] border border-red-500/20 w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
    <div class="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
      <i data-lucide="trash-2" class="w-10 h-10"></i>
    </div>
    
    <h2 class="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Delete Product?</h2>
    <p class="text-slate-500 text-sm font-medium mb-8 leading-relaxed">This action cannot be undone. This item will be permanently removed from your inventory.</p>

    <div class="flex flex-col gap-3">
      <button id="confirmDelete" class="w-full py-4 rounded-2xl bg-red-600 text-white font-black text-xs hover:bg-red-500 transition-all shadow-lg shadow-red-900/20 uppercase tracking-widest">
        Yes, Delete Item
      </button>
      <button onclick="closeModal()" class="w-full py-4 rounded-2xl bg-slate-900 text-slate-400 font-black text-xs hover:bg-slate-800 transition-all uppercase tracking-widest">
        No, Keep Content
      </button>
    </div>
  </div>
</div>
`;

export const buyProductModal = (product) => `
<div id="modalOverlay" class="fixed inset-0 z-100 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#111827] border border-white/10 w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300 text-center">
    <div class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>
    
    <div class="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-500">
      <i data-lucide="shopping-bag" class="w-10 h-10"></i>
    </div>
    
    <h2 class="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">${product.name}</h2>
    <p class="text-blue-500 font-black italic mb-6">$${product.price} / unit</p>

    <div class="bg-slate-950/50 border border-white/5 rounded-2xl p-6 mb-8">
      <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Stocking Quantity</label>
      <div class="flex items-center justify-center gap-6">
        <button onclick="updateQty(-1)" class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all border border-white/5">
          <i data-lucide="minus" class="w-5 h-5"></i>
        </button>
        <span id="buyQty" class="text-3xl font-black text-white w-12 text-center italic">1</span>
        <button onclick="updateQty(1)" class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all border border-white/5">
          <i data-lucide="plus" class="w-5 h-5"></i>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <button id="confirmBuy" class="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-xs hover:scale-105 active:scale-[0.98] transition-all shadow-xl uppercase tracking-widest">
        Place Order
      </button>
      <button onclick="closeModal()" class="w-full py-4 rounded-2xl bg-slate-900 text-slate-400 font-black text-xs hover:bg-slate-800 transition-all uppercase tracking-widest">
        Cancel
      </button>
    </div>
  </div>
</div>
`;

export const successModal = (
  message,
  secondaryActionLabel = "View History",
  secondaryActionId = "viewHistoryBtn",
) => `
<div id="modalOverlay" class="fixed inset-0 z-100 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#0B1120] border border-blue-500/30 w-full max-w-sm rounded-[3rem] p-10 text-center shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in fade-in zoom-in duration-500">
    <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl rotate-12 transition-transform">
      <i data-lucide="party-popper" class="w-12 h-12"></i>
    </div>
    
    <div class="mt-8 mb-8">
      <h2 class="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Success!</h2>
      <p class="text-slate-400 text-sm font-medium leading-relaxed font-bold">${message}</p>
    </div>

    <div class="flex flex-col gap-3">
      <button onclick="closeModal()" class="w-full py-5 rounded-2xl bg-white text-slate-950 font-black text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-widest">
        Continue Shopping
      </button>
      <button id="${secondaryActionId}" class="w-full py-4 rounded-2xl bg-slate-900 text-blue-400 font-black text-[10px] hover:bg-slate-800 transition-all uppercase tracking-widest border border-blue-500/10">
        ${secondaryActionLabel}
      </button>
    </div>
  </div>
</div>
`;
