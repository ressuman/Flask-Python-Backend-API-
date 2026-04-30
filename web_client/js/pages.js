// web_client/js/pages.js

// ── Helper: method pill ──────────────────────────────────
function pill(method) {
  return `<span class="method-pill pill-${method}">${method}</span>`;
}

// ── Page definitions ────────────────────────────────────
const Pages = {
  // ════════════════════════════════════════
  // LOGIN
  // ════════════════════════════════════════
  login: () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">User <span>Login</span></div>
        <div class="page-subtitle">${pill("POST")} <span class="endpoint-tag">/login</span> · No token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Credentials</div>
        <div class="field">
          <label>Username</label>
          <input type="text" id="loginUsername" placeholder="e.g. john_doe" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" id="loginPassword" placeholder="e.g. secure123" />
        </div>
        <button class="btn btn-primary" id="loginBtn">Login</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // REGISTER
  // ════════════════════════════════════════
  register: () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Register <span>User</span></div>
        <div class="page-subtitle">${pill("POST")} <span class="endpoint-tag">/register</span> · No token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">New Account</div>
        <div class="field">
          <label>Username</label>
          <input type="text" id="regUsername" placeholder="e.g. jane_smith" />
        </div>
        <div class="field">
          <label>Password (min 6 chars)</label>
          <input type="password" id="regPassword" placeholder="e.g. mypass99" />
        </div>
        <button class="btn btn-primary" id="registerBtn">Create Account</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // LOGOUT
  // ════════════════════════════════════════
  logout: () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">User <span>Logout</span></div>
        <div class="page-subtitle">${pill("POST")} <span class="endpoint-tag">/logout</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Invalidate Session</div>
        <p style="font-size:13px;color:var(--mist);margin-bottom:18px;line-height:1.6;">
          This will send your current Bearer token to the server and blacklist it.
          Any further requests using this token will be rejected.
        </p>
        <button class="btn btn-danger" id="logoutBtn">Logout & Invalidate Token</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // USERS LIST
  // ════════════════════════════════════════
  "users-list": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">All <span>Users</span></div>
        <div class="page-subtitle">${pill("GET")} <span class="endpoint-tag">/users</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Fetch All Users</div>
        <button class="btn btn-primary" id="getUsersBtn">Fetch Users</button>
      </div>
      <div id="usersGrid"></div>
    </div>`,

  // ════════════════════════════════════════
  // USER GET
  // ════════════════════════════════════════
  "user-get": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Get <span>User</span></div>
        <div class="page-subtitle">${pill("GET")} <span class="endpoint-tag">/users/:id</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Lookup by ID</div>
        <div class="field">
          <label>User ID</label>
          <input type="number" id="getUserId" placeholder="e.g. 1" min="1"/>
        </div>
        <button class="btn btn-primary" id="getUserBtn">Get User</button>
      </div>
      <div id="userResult"></div>
    </div>`,

  // ════════════════════════════════════════
  // USER UPDATE
  // ════════════════════════════════════════
  "user-update": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Update <span>User</span></div>
        <div class="page-subtitle">${pill("PUT")} <span class="endpoint-tag">/users/:id</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Edit Fields</div>
        <div class="field">
          <label>User ID</label>
          <input type="number" id="updateUserId" placeholder="e.g. 2" min="1"/>
        </div>
        <div class="field">
          <label>New Username (optional)</label>
          <input type="text" id="updateUsername" placeholder="e.g. john_updated" />
        </div>
        <div class="field">
          <label>New Password (optional)</label>
          <input type="password" id="updatePassword" placeholder="e.g. newpass456" />
        </div>
        <button class="btn btn-primary" id="updateUserBtn">Update User</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // USER DELETE
  // ════════════════════════════════════════
  "user-delete": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Delete <span>User</span></div>
        <div class="page-subtitle">${pill("DELETE")} <span class="endpoint-tag">/users/:id</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Remove User</div>
        <div class="field">
          <label>User ID</label>
          <input type="number" id="deleteUserId" placeholder="e.g. 3" min="1"/>
        </div>
        <button class="btn btn-danger" id="deleteUserBtn">Delete User</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // PRODUCTS LIST
  // ════════════════════════════════════════
  "products-list": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">All <span>Products</span></div>
        <div class="page-subtitle">${pill("GET")} <span class="endpoint-tag">/products</span> · No token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Fetch All Products</div>
        <button class="btn btn-primary" id="getProductsBtn">Fetch Products</button>
      </div>
      <div id="productsGrid"></div>
    </div>`,

  // ════════════════════════════════════════
  // PRODUCT GET
  // ════════════════════════════════════════
  "product-get": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Get <span>Product</span></div>
        <div class="page-subtitle">${pill("GET")} <span class="endpoint-tag">/products/:id</span> · No token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Lookup by ID</div>
        <div class="field">
          <label>Product ID</label>
          <input type="number" id="getProductId" placeholder="e.g. 1" min="1"/>
        </div>
        <button class="btn btn-primary" id="getProductBtn">Get Product</button>
      </div>
      <div id="productResult"></div>
    </div>`,

  // ════════════════════════════════════════
  // PRODUCT CREATE
  // ════════════════════════════════════════
  "product-create": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Add <span>Product</span></div>
        <div class="page-subtitle">${pill("POST")} <span class="endpoint-tag">/products</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">New Product</div>
        <div class="field">
          <label>Product Name</label>
          <input type="text" id="newProductName" placeholder="e.g. Wireless Mouse" />
        </div>
        <div class="field">
          <label>Price (USD)</label>
          <input type="number" id="newProductPrice" placeholder="e.g. 39.99" min="0" step="0.01"/>
        </div>
        <button class="btn btn-primary" id="createProductBtn">Add Product</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // PRODUCT UPDATE
  // ════════════════════════════════════════
  "product-update": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Update <span>Product</span></div>
        <div class="page-subtitle">${pill("PUT")} <span class="endpoint-tag">/products/:id</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Edit Product</div>
        <div class="field">
          <label>Product ID</label>
          <input type="number" id="updateProductId" placeholder="e.g. 2" min="1"/>
        </div>
        <div class="field">
          <label>New Name (optional)</label>
          <input type="text" id="updateProductName" placeholder="e.g. Mechanical Keyboard Pro" />
        </div>
        <div class="field">
          <label>New Price (optional)</label>
          <input type="number" id="updateProductPrice" placeholder="e.g. 149.99" min="0" step="0.01"/>
        </div>
        <button class="btn btn-primary" id="updateProductBtn">Update Product</button>
      </div>
    </div>`,

  // ════════════════════════════════════════
  // PRODUCT DELETE
  // ════════════════════════════════════════
  "product-delete": () => `
    <div class="page">
      <div class="page-header">
        <div class="page-title">Delete <span>Product</span></div>
        <div class="page-subtitle">${pill("DELETE")} <span class="endpoint-tag">/products/:id</span> · Token required</div>
      </div>
      <div class="form-card">
        <div class="form-card-title">Remove Product</div>
        <div class="field">
          <label>Product ID</label>
          <input type="number" id="deleteProductId" placeholder="e.g. 3" min="1"/>
        </div>
        <button class="btn btn-danger" id="deleteProductBtn">Delete Product</button>
      </div>
    </div>`,
};

// ── User card renderer ───────────────────────────────────
function renderUserCards(users) {
  if (!users || users.length === 0) {
    return `<div class="empty-state">
      <div class="empty-state-icon">👤</div>
      <div class="empty-state-text">No users found</div>
    </div>`;
  }
  return `<div class="data-grid">
    ${users
      .map(
        (u, i) => `
      <div class="data-card" style="animation-delay:${i * 0.05}s">
        <div class="data-card-id">#${u.id}</div>
        <div class="data-card-name">${u.username}</div>
        <div class="data-card-sub">User account</div>
      </div>`,
      )
      .join("")}
  </div>`;
}

// ── Product card renderer ────────────────────────────────
function renderProductCards(products) {
  if (!products || products.length === 0) {
    return `<div class="empty-state">
      <div class="empty-state-icon">📦</div>
      <div class="empty-state-text">No products found</div>
    </div>`;
  }
  return `<div class="data-grid">
    ${products
      .map(
        (p, i) => `
      <div class="data-card" style="animation-delay:${i * 0.05}s">
        <div class="data-card-id">#${p.id}</div>
        <div class="data-card-name">${p.name}</div>
        <div class="data-card-price">$${Number(p.price).toFixed(2)}</div>
      </div>`,
      )
      .join("")}
  </div>`;
}

// ── Single user card ─────────────────────────────────────
function renderSingleUser(u) {
  return `<div class="form-card" style="margin-top:0">
    <div class="info-row">
      <div class="info-chip">ID: <strong>${u.id}</strong></div>
      <div class="info-chip">Username: <strong>${u.username}</strong></div>
    </div>
  </div>`;
}

// ── Single product card ──────────────────────────────────
function renderSingleProduct(p) {
  return `<div class="form-card" style="margin-top:0">
    <div class="info-row">
      <div class="info-chip">ID: <strong>${p.id}</strong></div>
      <div class="info-chip">Name: <strong>${p.name}</strong></div>
      <div class="info-chip">Price: <strong>$${Number(p.price).toFixed(2)}</strong></div>
    </div>
  </div>`;
}
