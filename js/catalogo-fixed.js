// ========================================
// SISTEMA DE CATÁLOGO - VERSIÓN CORREGIDA
// Mantiene funcionalidad original
// ========================================

class CatalogoSystem {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.products = [];
    this.init();
  }

  init() {
    // Esperar a que productItems esté disponible
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Verificar y cargar productos
    this.loadProducts();

    // Configurar funcionalidades
    this.setupProductSearch();
    this.setupIndustryFilters();
    this.renderCartPreview();
    this.updateCartCount();

    console.log("✓ Sistema de catálogo inicializado");
    console.log(`  📦 Productos cargados: ${this.products.length}`);
  }

  loadProducts() {
    // Intentar cargar desde window.productItems
    if (window.productItems && Array.isArray(window.productItems)) {
      this.products = window.productItems;
      console.log("  ✓ Productos cargados desde window.productItems");
    } else {
      console.error(
        "  ❌ ERROR: window.productItems no está definido o no es un array"
      );
      console.log("  Verificando productItems.js...");

      // Reintentar después de un momento
      setTimeout(() => {
        if (window.productItems && Array.isArray(window.productItems)) {
          this.products = window.productItems;
          console.log("  ✓ Productos cargados (segundo intento)");
          console.log(`  📦 Total de productos: ${this.products.length}`);
        } else {
          console.error("  ❌ No se pueden cargar los productos");
          this.showProductError();
        }
      }, 500);
    }
  }

  showProductError() {
    const resultsDiv = document.getElementById("product-results");
    if (resultsDiv) {
      resultsDiv.innerHTML = `
        <div class="uk-alert-danger" uk-alert>
          <h3>Error al cargar productos</h3>
          <p>No se pueden cargar los productos. Por favor:</p>
          <ul>
            <li>Verifica que el archivo <code>js/productItems.js</code> existe</li>
            <li>Verifica que se está cargando antes de <code>catalogo-fixed.js</code></li>
            <li>Abre la consola del navegador para ver más detalles</li>
          </ul>
        </div>
      `;
    }
  }

  // ========================================
  // BÚSQUEDA DE PRODUCTOS
  // ========================================
  setupProductSearch() {
    const form = document.getElementById("product-search-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("product-search-input").value;
      const category = document.getElementById("category-filter").value;
      this.searchProducts(query, category);
    });
  }

  searchProducts(query, category) {
    const loadingDiv = document.getElementById("product-loading");
    const resultsDiv = document.getElementById("product-results");

    if (!resultsDiv) return;

    resultsDiv.innerHTML = "";
    if (loadingDiv) loadingDiv.classList.remove("uk-hidden");

    setTimeout(() => {
      if (loadingDiv) loadingDiv.classList.add("uk-hidden");

      let filteredProducts = [...this.products];

      // Filtrar por query
      if (query) {
        const searchTerm = query.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            (product.category &&
              product.category.toLowerCase().includes(searchTerm))
        );
      }

      // Filtrar por categoría
      if (category) {
        filteredProducts = this.filterByCategory(filteredProducts, category);
      }

      if (filteredProducts.length > 0) {
        this.renderProductResults(filteredProducts, resultsDiv);
      } else {
        resultsDiv.innerHTML = `
          <div class="uk-text-center uk-padding">
            <span uk-icon="icon: search; ratio: 3" style="color: var(--gris-medio);"></span>
            <p class="uk-text-muted uk-margin-top">
              No se encontraron productos con esos criterios
            </p>
            <p class="uk-text-small uk-text-muted">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        `;
      }
    }, 500);
  }

  filterByCategory(products, category) {
    const categoryMap = {
      vidrio: "Vidrio",
      plastico: "Plástico",
      tapas: "Tapas",
      cosmetico: "Cosmét",
      farmaceutico: "Farmacéut",
      industrial: "Industrial",
    };

    const searchTerm = categoryMap[category] || category;

    return products.filter(
      (product) => product.category && product.category.includes(searchTerm)
    );
  }

  renderProductResults(products, container) {
    container.innerHTML = `
      <h3 class="uk-margin-top uk-modal-title">
        Resultados de búsqueda (${products.length})
      </h3>
      <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match uk-margin-top" uk-grid>
        ${products.map((product) => this.createProductCard(product)).join("")}
      </div>
    `;
  }

  createProductCard(product) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-text-center coffee-card-dark">
          <img src="${product.img}" alt="${product.title}"
              class="product-image-medium uk-margin-bottom">
          <h3 class="uk-card-title uk-text-truncate coffee-title-white">
            ${product.title}
          </h3>
          <p class="uk-text-meta coffee-text-white-muted">${
            product.category
          }</p>
          <p class="uk-text-small coffee-text-white">
            ${product.minimumOrder || "Consultar"}
          </p>
          <div class="uk-grid-small uk-child-width-1-2" uk-grid>
            <div>
              <button class="uk-button uk-button-primary whatsapp-button uk-button-small uk-width-1-1 uk-border-rounded" 
                      onclick="catalogoSystem.addToCart(${product.id})">
                <span uk-icon="cart"></span> Agregar
              </button>
            </div>
            <div>
              <button class="uk-button uk-button-primary whatsapp-button uk-button-small uk-width-1-1 uk-border-rounded"
                      onclick="catalogoSystem.contactWhatsApp('${encodeURIComponent(
                        product.title
                      )}')">
                <span uk-icon="whatsapp"></span> Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================
  // FILTROS POR INDUSTRIA
  // ========================================
  setupIndustryFilters() {
    const buttons = document.querySelectorAll(".industry-filter");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const industry = e.currentTarget.dataset.industry;
        this.filterByIndustry(industry);
      });
    });
  }

  filterByIndustry(industry) {
    const resultsDiv = document.getElementById("industry-results");
    if (!resultsDiv) return;

    let filteredProducts = [...this.products];

    if (industry !== "todas") {
      const industryMap = {
        alimentos: "Alimentos",
        bebidas: "Bebidas",
        cosmetica: "Cosmética",
        farmaceutica: "Farmacéutica",
        quimicos: "Químicos",
        limpieza: "Limpieza",
        industrial: "Industrial",
      };

      const searchTerm = industryMap[industry];
      filteredProducts = filteredProducts.filter(
        (product) => product.industry && product.industry.includes(searchTerm)
      );
    }

    if (filteredProducts.length > 0) {
      resultsDiv.innerHTML = `
        <h3 class="uk-modal-title uk-margin-top">
          Productos recomendados para ${
            industry === "todas" ? "todas las industrias" : industry
          }
          (${filteredProducts.length})
        </h3>
        <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" uk-grid>
          ${filteredProducts.map((p) => this.createProductCard(p)).join("")}
        </div>
      `;
    } else {
      resultsDiv.innerHTML = `
        <div class="uk-text-center uk-padding">
          <p class="uk-text-muted">
            No hay productos específicos para esta industria
          </p>
        </div>
      `;
    }
  }

  // ========================================
  // PREVIEW DEL CARRITO
  // ========================================
  renderCartPreview() {
    const container = document.getElementById("catalog-cart-items");
    const actionsDiv = document.getElementById("catalog-cart-actions");

    if (!container) return;

    const cart = this.getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="uk-text-center uk-padding">
          <p class="uk-text-muted">
            El carrito está vacío. Agrega productos desde la búsqueda.
          </p>
        </div>
      `;
      if (actionsDiv) actionsDiv.style.display = "none";
      return;
    }

    if (actionsDiv) actionsDiv.style.display = "block";

    container.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h4 class="uk-margin-remove">${item.title}</h4>
            <p class="uk-text-small uk-text-muted uk-margin-remove">
              ${item.minimumOrder}
            </p>
          </div>
          <div class="uk-width-auto">
            <button class="uk-button uk-button-small uk-button-default"
                    onclick="catalogoSystem.updateQuantity(${item.id}, -1)">
              <span uk-icon="minus"></span>
            </button>
            <span class="uk-margin-small-left uk-margin-small-right uk-text-bold">
              ${item.quantity}
            </span>
            <button class="uk-button uk-button-small uk-button-default"
                    onclick="catalogoSystem.updateQuantity(${item.id}, 1)">
              <span uk-icon="plus"></span>
            </button>
          </div>
          <div class="uk-width-auto">
            <button class="uk-button uk-button-small uk-button-danger"
                    onclick="catalogoSystem.removeFromCart(${item.id})">
              <span uk-icon="trash"></span>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // ========================================
  // ACCIONES DEL CARRITO
  // ========================================
  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        minimumOrder: product.minimumOrder || "Consultar",
        quantity: 1,
      });
    }

    this.saveCart();
    this.renderCartPreview();
    this.updateCartCount();

    UIkit.notification({
      message: `${product.title} agregado al carrito`,
      status: "success",
      pos: "top-center",
      timeout: 2000,
    });
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.renderCartPreview();
    this.updateCartCount();
  }

  updateQuantity(productId, change) {
    const item = this.cart.find((i) => i.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.renderCartPreview();
        this.updateCartCount();
      }
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);

    const badges = [
      document.getElementById("cart-count"),
      document.getElementById("cart-count-navbar"),
    ];

    badges.forEach((badge) => {
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
      }
    });
  }

  contactWhatsApp(productTitle) {
    const message = `Hola, me interesa el producto: ${decodeURIComponent(
      productTitle
    )}`;
    const whatsappUrl = `https://wa.me/573153957275?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  sendCartToWhatsApp() {
    if (this.cart.length === 0) {
      UIkit.notification({
        message: "El carrito está vacío",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    let message =
      "¡Hola! Me gustaría solicitar una cotización para los siguientes productos:\n\n";

    this.cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Pedido mínimo: ${item.minimumOrder}\n\n`;
    });

    message += `Total de items: ${this.cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )}\n\n`;
    message += "Quedo atento a su respuesta. ¡Gracias!";

    const whatsappUrl = `https://wa.me/573153957275?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    UIkit.notification({
      message: "Redirigiendo a WhatsApp...",
      status: "success",
      pos: "top-center",
      timeout: 2000,
    });
  }
}

// ========================================
// INICIALIZACIÓN
// ========================================
window.surtienvases = window.surtienvases || {};
window.surtienvases.catalogo = new CatalogoSystem();

// Alias global para compatibilidad
window.catalogoSystem = window.surtienvases.catalogo;

// Exponer función para el botón de enviar cotización
window.sendCatalogQuote = () => {
  if (window.surtienvases?.catalogo) {
    window.surtienvases.catalogo.sendCartToWhatsApp();
  }
};

console.log("✓ Sistema de catálogo inicializado");
