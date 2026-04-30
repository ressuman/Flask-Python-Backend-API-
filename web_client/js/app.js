// web_client/js/app.js

// ══════════════════════════════════════════════════════════
// RESPONSE PANEL
// ══════════════════════════════════════════════════════════
function syntaxHighlight(obj) {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|-?\d+\.?\d*([eE][+-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) return `<span class="json-key">${match}</span>`;
        return `<span class="json-str">${match}</span>`;
      }
      if (/true|false/.test(match))
        return `<span class="json-bool">${match}</span>`;
      if (/null/.test(match)) return `<span class="json-null">${match}</span>`;
      return `<span class="json-num">${match}</span>`;
    },
  );
}

function showResponse(result) {
  const { data, status, ok, elapsed } = result;

  const statusEl = document.getElementById("responseStatus");
  statusEl.textContent = `${status} ${ok ? "✓" : "✗"}`;
  statusEl.className = `response-status ${ok ? "status-ok" : "status-err"}`;

  document.getElementById("responseTime").textContent = `${elapsed}ms`;
  document.getElementById("responseBody").innerHTML = syntaxHighlight(data);
}

function clearResponse() {
  document.getElementById("responseStatus").textContent = "";
  document.getElementById("responseTime").textContent = "";
  document.getElementById("responseBody").innerHTML =
    "// Your API response will appear here...";
}

// ══════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════
let toastWrap = null;
function toast(msg, type = "info") {
  if (!toastWrap) {
    toastWrap = document.createElement("div");
    toastWrap.className = "toast-wrap";
    document.body.appendChild(toastWrap);
  }
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  toastWrap.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ══════════════════════════════════════════════════════════
// BUTTON LOADING STATE
// ══════════════════════════════════════════════════════════
function setLoading(btn, state) {
  btn.disabled = state;
  if (state) btn.classList.add("loading");
  else btn.classList.remove("loading");
}

// ══════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════
const pageTitles = {
  login: "Login",
  register: "Register",
  logout: "Logout",
  "users-list": "All Users",
  "user-get": "Get User",
  "user-update": "Update User",
  "user-delete": "Delete User",
  "products-list": "All Products",
  "product-get": "Get Product",
  "product-create": "Add Product",
  "product-update": "Update Product",
  "product-delete": "Delete Product",
};

function navigate(page) {
  // Render page
  const content = document.getElementById("content");
  content.innerHTML = Pages[page]();

  // Update topbar
  document.getElementById("topbarTitle").textContent = pageTitles[page] || page;

  // Update nav
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.page === page);
  });

  // Bind handlers
  bindHandlers(page);

  // Close sidebar on mobile
  document.getElementById("sidebar").classList.remove("open");
}

// ══════════════════════════════════════════════════════════
// EVENT HANDLERS PER PAGE
// ══════════════════════════════════════════════════════════
function bindHandlers(page) {
  const $ = (id) => document.getElementById(id);

  // ── LOGIN ──────────────────────────────────────────────
  if (page === "login") {
    $("loginBtn").addEventListener("click", async () => {
      const username = $("loginUsername").value.trim();
      const password = $("loginPassword").value.trim();
      if (!username || !password) return toast("Fill in both fields", "error");
      setLoading($("loginBtn"), true);
      try {
        const result = await Auth.login(username, password);
        showResponse(result);
        if (result.ok) toast(`Welcome back, ${username}!`, "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("loginBtn"), false);
    });
  }

  // ── REGISTER ───────────────────────────────────────────
  if (page === "register") {
    $("registerBtn").addEventListener("click", async () => {
      const username = $("regUsername").value.trim();
      const password = $("regPassword").value.trim();
      if (!username || !password) return toast("Fill in both fields", "error");
      setLoading($("registerBtn"), true);
      try {
        const result = await Auth.register(username, password);
        showResponse(result);
        if (result.ok) toast(`Account created for ${username}!`, "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("registerBtn"), false);
    });
  }

  // ── LOGOUT ─────────────────────────────────────────────
  if (page === "logout") {
    $("logoutBtn").addEventListener("click", async () => {
      if (!Token.get())
        return toast("No token saved. Nothing to logout.", "error");
      setLoading($("logoutBtn"), true);
      try {
        const result = await Auth.logout();
        showResponse(result);
        if (result.ok) {
          toast("Logged out. Token invalidated.", "success");
        } else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("logoutBtn"), false);
    });
  }

  // ── USERS LIST ─────────────────────────────────────────
  if (page === "users-list") {
    $("getUsersBtn").addEventListener("click", async () => {
      if (!Token.get()) return toast("Save your token first", "error");
      setLoading($("getUsersBtn"), true);
      try {
        const result = await Users.getAll();
        showResponse(result);
        if (result.ok) {
          $("usersGrid").innerHTML = renderUserCards(result.data.data?.users);
          toast(
            `${result.data.data?.users?.length || 0} users loaded`,
            "success",
          );
        } else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("getUsersBtn"), false);
    });
  }

  // ── USER GET ───────────────────────────────────────────
  if (page === "user-get") {
    $("getUserBtn").addEventListener("click", async () => {
      const id = $("getUserId").value.trim();
      if (!id) return toast("Enter a user ID", "error");
      if (!Token.get()) return toast("Save your token first", "error");
      setLoading($("getUserBtn"), true);
      try {
        const result = await Users.getOne(id);
        showResponse(result);
        if (result.ok) {
          $("userResult").innerHTML = renderSingleUser(result.data.data?.user);
          toast("User found!", "success");
        } else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("getUserBtn"), false);
    });
  }

  // ── USER UPDATE ────────────────────────────────────────
  if (page === "user-update") {
    $("updateUserBtn").addEventListener("click", async () => {
      const id = $("updateUserId").value.trim();
      const username = $("updateUsername").value.trim() || undefined;
      const password = $("updatePassword").value.trim() || undefined;
      if (!id) return toast("Enter a user ID", "error");
      if (!username && !password)
        return toast("Provide at least one field to update", "error");
      if (!Token.get()) return toast("Save your token first", "error");
      setLoading($("updateUserBtn"), true);
      try {
        const result = await Users.update(id, username, password);
        showResponse(result);
        if (result.ok) toast("User updated successfully!", "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("updateUserBtn"), false);
    });
  }

  // ── USER DELETE ────────────────────────────────────────
  if (page === "user-delete") {
    $("deleteUserBtn").addEventListener("click", async () => {
      const id = $("deleteUserId").value.trim();
      if (!id) return toast("Enter a user ID", "error");
      if (!Token.get()) return toast("Save your token first", "error");
      if (!confirm(`Delete user ID ${id}? This cannot be undone.`)) return;
      setLoading($("deleteUserBtn"), true);
      try {
        const result = await Users.delete(id);
        showResponse(result);
        if (result.ok) toast(`User ID ${id} deleted.`, "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("deleteUserBtn"), false);
    });
  }

  // ── PRODUCTS LIST ──────────────────────────────────────
  if (page === "products-list") {
    $("getProductsBtn").addEventListener("click", async () => {
      setLoading($("getProductsBtn"), true);
      try {
        const result = await Products.getAll();
        showResponse(result);
        if (result.ok) {
          $("productsGrid").innerHTML = renderProductCards(
            result.data.data?.products,
          );
          toast(
            `${result.data.data?.products?.length || 0} products loaded`,
            "success",
          );
        } else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("getProductsBtn"), false);
    });
  }

  // ── PRODUCT GET ────────────────────────────────────────
  if (page === "product-get") {
    $("getProductBtn").addEventListener("click", async () => {
      const id = $("getProductId").value.trim();
      if (!id) return toast("Enter a product ID", "error");
      setLoading($("getProductBtn"), true);
      try {
        const result = await Products.getOne(id);
        showResponse(result);
        if (result.ok) {
          $("productResult").innerHTML = renderSingleProduct(
            result.data.data?.product,
          );
          toast("Product found!", "success");
        } else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("getProductBtn"), false);
    });
  }

  // ── PRODUCT CREATE ─────────────────────────────────────
  if (page === "product-create") {
    $("createProductBtn").addEventListener("click", async () => {
      const name = $("newProductName").value.trim();
      const price = parseFloat($("newProductPrice").value);
      if (!name) return toast("Product name is required", "error");
      if (isNaN(price) || price < 0)
        return toast("Enter a valid price", "error");
      if (!Token.get()) return toast("Save your token first", "error");
      setLoading($("createProductBtn"), true);
      try {
        const result = await Products.create(name, price);
        showResponse(result);
        if (result.ok) toast(`'${name}' added!`, "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("createProductBtn"), false);
    });
  }

  // ── PRODUCT UPDATE ─────────────────────────────────────
  if (page === "product-update") {
    $("updateProductBtn").addEventListener("click", async () => {
      const id = $("updateProductId").value.trim();
      const name = $("updateProductName").value.trim() || undefined;
      const priceRaw = $("updateProductPrice").value.trim();
      const price = priceRaw ? parseFloat(priceRaw) : undefined;
      if (!id) return toast("Enter a product ID", "error");
      if (!name && price === undefined)
        return toast("Provide at least one field to update", "error");
      if (price !== undefined && (isNaN(price) || price < 0))
        return toast("Enter a valid price", "error");
      if (!Token.get()) return toast("Save your token first", "error");
      setLoading($("updateProductBtn"), true);
      try {
        const result = await Products.update(id, name, price);
        showResponse(result);
        if (result.ok) toast(`Product ID ${id} updated!`, "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("updateProductBtn"), false);
    });
  }

  // ── PRODUCT DELETE ─────────────────────────────────────
  if (page === "product-delete") {
    $("deleteProductBtn").addEventListener("click", async () => {
      const id = $("deleteProductId").value.trim();
      if (!id) return toast("Enter a product ID", "error");
      if (!Token.get()) return toast("Save your token first", "error");
      if (!confirm(`Delete product ID ${id}? This cannot be undone.`)) return;
      setLoading($("deleteProductBtn"), true);
      try {
        const result = await Products.delete(id);
        showResponse(result);
        if (result.ok) toast(`Product ID ${id} deleted.`, "success");
        else toast(result.data.message, "error");
      } catch (e) {
        toast("Network error", "error");
      }
      setLoading($("deleteProductBtn"), false);
    });
  }
}

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Nav clicks
  document.querySelectorAll(".nav-item").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(el.dataset.page);
    });
  });

  // Token save
  document.getElementById("saveToken").addEventListener("click", () => {
    const val = document.getElementById("globalToken").value.trim();
    const status = document.getElementById("tokenStatus");
    if (!val) {
      status.textContent = "✗ Token is empty";
      status.className = "token-status empty";
      return;
    }
    Token.set(val);
    status.textContent = "✓ Token saved";
    status.className = "token-status ok";
    toast("Token saved successfully", "success");
  });

  // Clear response
  document
    .getElementById("clearResponse")
    .addEventListener("click", clearResponse);

  // Mobile sidebar toggle
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });

  // Restore token if saved
  const saved = Token.get();
  if (saved) {
    document.getElementById("globalToken").value = saved;
    const status = document.getElementById("tokenStatus");
    status.textContent = "✓ Token loaded";
    status.className = "token-status ok";
  }

  // Boot on login page
  navigate("login");
});
