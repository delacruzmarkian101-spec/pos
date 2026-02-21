import "./style.css";
import {
  createIcons,
  Zap,
  ShieldCheck,
  Laptop,
  ArrowRight,
  BarChart3,
  Users,
  Store,
  User,
  Lock,
  ArrowLeft,
  Shield,
  ChevronDown,
  ShoppingBag,
  Plus,
  Package,
  TrendingUp,
  LogOut,
  Clock,
  LayoutDashboard,
  Utensils,
  Sandwich,
  Pizza,
  Coffee,
  Beef,
  Salad,
  Cake,
  Cookie,
  Map,
  Edit,
  Trash2,
  X,
  Minus,
  ShoppingCart,
  Ghost,
  PartyPopper,
} from "lucide";
import { landingTemplate } from "./pages/landing";
import { loginTemplate } from "./pages/auth";
import { sellerTemplate } from "./pages/sellerDashboard";
import { buyerTemplate } from "./pages/buyerDashboard";
import { cartTemplate } from "./pages/cartPage";
import { ordersTemplate } from "./pages/ordersPage";
import {
  editProductModal,
  deleteProductModal,
  buyProductModal,
  successModal,
} from "./components/modals";
import { api } from "./api";

const app = document.querySelector("#app");
const modalContainer = document.createElement("div");
modalContainer.id = "modalContainer";
document.body.appendChild(modalContainer);

let user = JSON.parse(localStorage.getItem("pos_user")) || null;
let products = [];
let orders = [];
let cart = [];

let currentView = "landing";
let activeCategory = "All";

function render() {
  if (!user) {
    if (currentView === "login") {
      renderLogin();
    } else {
      renderLanding();
    }
  } else if (user.role === "seller") {
    renderSeller();
  } else if (user.role === "buyer") {
    if (currentView === "cart") {
      renderCart();
    } else if (currentView === "orders") {
      renderOrders();
    } else {
      renderBuyer();
    }
  }
}

async function loadInitialData() {
  if (user) {
    await Promise.all([fetchProducts(), fetchOrders()]);
  }
  render();
}

function renderLanding() {
  app.innerHTML = landingTemplate();

  // Initialize Lucide Icons in the newly rendered HTML
  createIcons({
    icons: {
      Zap,
      ShieldCheck,
      Laptop,
      ArrowRight,
      BarChart3,
      Users,
      Store,
      Utensils,
      Sandwich,
    },
  });

  const goLogin = () => {
    currentView = "login";
    render();
  };

  document.getElementById("navLoginBtn").onclick = goLogin;
  document.getElementById("heroCtaBtn").onclick = goLogin;
  document.getElementById("bottomCtaBtn").onclick = goLogin;
}

function renderLogin(mode = "login") {
  app.innerHTML = loginTemplate(mode);

  if (mode === "register") {
    const roleButtons = document.querySelectorAll(".role-option");
    const roleInput = document.getElementById("roleInput");

    roleButtons.forEach((btn) => {
      btn.onclick = () => {
        roleButtons.forEach((b) => {
          b.classList.remove("bg-blue-600", "text-white");
          b.classList.add("text-slate-600");
        });
        btn.classList.add("bg-blue-600", "text-white");
        btn.classList.remove("text-slate-600");
        roleInput.value = btn.dataset.role;
      };
    });

    document.getElementById("regBtn").onclick = () => handleAuth("register");
    document.getElementById("switchToLogin").onclick = () =>
      renderLogin("login");
  } else {
    document.getElementById("loginBtn").onclick = () => handleAuth("login");
    document.getElementById("switchToReg").onclick = () =>
      renderLogin("register");
  }

  createIcons({
    icons: { User, Lock, ArrowLeft, Utensils, Shield, Store },
  });

  document.getElementById("backBtn").onclick = () => {
    currentView = "landing";
    render();
  };
}

async function handleAuth(type) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const roleInput = document.getElementById("roleInput");
  const role = roleInput ? roleInput.value : null;
  const errorEl = document.getElementById("authError");

  if (!username || !password) {
    errorEl.classList.remove("hidden");
    errorEl.classList.add("flex");
    return;
  }
  errorEl.classList.add("hidden");
  errorEl.classList.remove("flex");

  try {
    const userResponse = await (type === "login"
      ? api.login(username, password, role)
      : api.register(username, password, role));

    user = userResponse;
    localStorage.setItem("pos_user", JSON.stringify(user));
    loadInitialData();
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove("hidden");
  }
}

async function renderSeller() {
  app.innerHTML = sellerTemplate(user, products, orders);

  createIcons({
    icons: {
      Store,
      LayoutDashboard,
      LogOut,
      Package,
      TrendingUp,
      Plus,
      Clock,
      ShoppingBag,
      Utensils,
      Sandwich,
      Pizza,
      Coffee,
      Beef,
      Salad,
      Cake,
      Cookie,
      Map,
      Edit,
      Trash2,
    },
  });

  attachGlobalEvents();
  const addBtn = document.getElementById("addPBtn");
  if (addBtn) addBtn.onclick = handleAddProduct;
}

function renderBuyer() {
  app.innerHTML = buyerTemplate(user, products, orders, activeCategory, cart);

  createIcons({
    icons: {
      ShoppingBag,
      LogOut,
      Package,
      Clock,
      Utensils,
      Sandwich,
      Pizza,
      Coffee,
      Beef,
      Salad,
      Cake,
      Cookie,
      ShoppingCart,
    },
  });

  attachCategoryHandlers();
  attachGlobalEvents();

  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.onclick = () => {
      currentView = "cart";
      render();
    };
  }

  const historyBtn = document.getElementById("historyBtn");
  if (historyBtn) {
    historyBtn.onclick = () => {
      currentView = "orders";
      render();
    };
  }
}

function renderOrders() {
  app.innerHTML = ordersTemplate(user, orders);

  createIcons({
    icons: {
      ArrowLeft,
      ShoppingBag,
      LogOut,
      Package,
      Clock,
      Ghost,
    },
  });

  const backHome = document.getElementById("backToHome");
  if (backHome) {
    backHome.onclick = () => {
      currentView = "buyer";
      render();
    };
  }

  const goBackBtn = document.getElementById("goBackBtn");
  if (goBackBtn) {
    goBackBtn.onclick = () => {
      currentView = "buyer";
      render();
    };
  }

  attachGlobalEvents();
}

function renderCart() {
  app.innerHTML = cartTemplate(user, cart);

  createIcons({
    icons: {
      ShoppingCart,
      ArrowLeft,
      LogOut,
      Package,
      Minus,
      Plus,
      Trash2,
      ArrowRight,
    },
  });

  const backHome = document.getElementById("backToHome");
  if (backHome) {
    backHome.onclick = () => {
      currentView = "buyer";
      render();
    };
  }

  const goBackBtn = document.getElementById("goBackBtn");
  if (goBackBtn) {
    goBackBtn.onclick = () => {
      currentView = "buyer";
      render();
    };
  }

  attachGlobalEvents();

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.onclick = handleCheckout;
  }
}

window.handleDirectBuy = (productId, price, name) => {
  window.handleAddToCart(productId, price, name);
  currentView = "cart";
  render();
};

async function handleCheckout() {
  if (cart.length === 0) return alert("Cart is empty!");

  try {
    const promises = cart.map((item) =>
      api.createOrder({
        productId: item.id,
        buyerId: user.id,
        quantity: item.quantity,
      }),
    );

    await Promise.all(promises);
    cart = [];
    modalContainer.innerHTML = successModal(
      "Your checkout was completed successfully! All items have been processed and added to your history.",
    );
    createIcons({ icons: { PartyPopper } });

    document.getElementById("viewHistoryBtn").onclick = () => {
      closeModal();
      currentView = "orders";
      render();
    };

    currentView = "buyer";
    loadInitialData();
  } catch (err) {
    alert("Error during checkout: " + err.message);
  }
}

window.handleAddToCart = (productId, price, name) => {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, price, name, quantity: 1 });
  }
  render();
};

window.updateCartQty = (index, delta) => {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  render();
};

window.removeFromCart = (index) => {
  cart.splice(index, 1);
  render();
};

function attachCategoryHandlers() {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.onclick = () => {
      activeCategory = btn.dataset.category;
      render();
    };
  });
}

// Actions
async function handleAddProduct() {
  const name = document.getElementById("pName").value;
  const price = parseFloat(document.getElementById("pPrice").value);
  const stock = parseInt(document.getElementById("pStock").value);
  const category = document.getElementById("pCategory").value;

  if (!name || isNaN(price) || isNaN(stock) || !category)
    return alert("Fill all fields correctly");

  try {
    await api.createProduct({
      name,
      price,
      stock,
      category,
      sellerId: user.id,
    });

    // Clear form
    document.getElementById("pName").value = "";
    document.getElementById("pPrice").value = "";
    document.getElementById("pStock").value = "";
    document.getElementById("pCategory").value = "";

    modalContainer.innerHTML = successModal(
      `"${name}" has been successfully added to your inventory.`,
      "Close",
      "closeSuccessBtn",
    );
    createIcons({ icons: { PartyPopper } });

    document.getElementById("closeSuccessBtn").onclick = closeModal;

    loadInitialData();
  } catch (err) {
    alert(err.message);
  }
}

window.updateQty = (delta) => {
  const el = document.getElementById("buyQty");
  if (!el) return;
  let qty = parseInt(el.innerText) + delta;
  if (qty < 1) qty = 1;
  el.innerText = qty;
};

window.handleBuy = async (productId, price, name) => {
  modalContainer.innerHTML = buyProductModal({ id: productId, price, name });
  createIcons({ icons: { ShoppingBag, Minus, Plus } });

  document.getElementById("confirmBuy").onclick = async () => {
    const qty = parseInt(document.getElementById("buyQty").innerText);
    try {
      await api.createOrder({ productId, buyerId: user.id, quantity: qty });
      modalContainer.innerHTML = successModal(
        `Successfully purchased ${qty} ${name}(s)!`,
      );
      createIcons({ icons: { PartyPopper } });

      document.getElementById("viewHistoryBtn").onclick = () => {
        closeModal();
        currentView = "orders";
        render();
      };

      loadInitialData();
    } catch (err) {
      alert(err.message);
    }
  };
};

window.closeModal = () => {
  modalContainer.innerHTML = "";
};

window.handleEdit = (id, name, price, stock, category) => {
  const categories = [
    "Bakery",
    "Fast Food",
    "Healthy",
    "Drinks",
    "Desserts",
    "Protein",
    "Others",
  ];
  modalContainer.innerHTML = editProductModal(
    { id, name, price, stock, category },
    categories,
  );
  createIcons({ icons: { X, ChevronDown } });

  const form = document.getElementById("editProductForm");
  form.onsubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: document.getElementById("editName").value,
      price: parseFloat(document.getElementById("editPrice").value),
      stock: parseInt(document.getElementById("editStock").value),
      category: document.getElementById("editCategory").value,
      sellerId: user.id,
    };

    try {
      await api.updateProduct(id, updatedData);
      closeModal();
      modalContainer.innerHTML = successModal(
        `Successfully updated "${updatedData.name}"`,
        "Return to Inventory",
        "closeEditSuccess",
      );
      createIcons({ icons: { PartyPopper } });
      document.getElementById("closeEditSuccess").onclick = closeModal;
      loadInitialData();
    } catch (err) {
      alert(err.message);
    }
  };
};

window.handleDelete = (id) => {
  modalContainer.innerHTML = deleteProductModal(id);
  createIcons({ icons: { Trash2 } });

  document.getElementById("confirmDelete").onclick = async () => {
    try {
      await api.deleteProduct(id, user.id);
      closeModal();
      modalContainer.innerHTML = successModal(
        "Product has been archived and removed from shop.",
        "Return to Inventory",
        "closeDeleteSuccess",
      );
      createIcons({ icons: { PartyPopper } });
      document.getElementById("closeDeleteSuccess").onclick = closeModal;
      loadInitialData();
    } catch (err) {
      alert(err.message);
    }
  };
};

async function fetchProducts() {
  products = await api.getProducts(user?.role === "buyer");
}

async function fetchOrders() {
  orders = await api.getOrders(user.id, user.role);
}

function attachGlobalEvents() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      user = null;
      currentView = "landing";
      localStorage.removeItem("pos_user");
      render();
    };
  }
}

// Initial Render & Data Load
loadInitialData();
