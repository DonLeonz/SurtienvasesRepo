// Sistema de Recomendado
class RecomendadoSystem {
    constructor() {
        this.imageError = false;
        this.init();
    }

    getProductoRecomendado() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return coffeeItems[dayOfYear % coffeeItems.length];
    }

    init() {
        this.renderProductoRecomendado();
    }

    handleImageError(img) {
        if (!this.imageError) {
            this.imageError = true;
            img.src = 'assets/img/default-coffee.jpg';
        }
    }

    renderProductoRecomendado() {
        const container = document.getElementById('producto-recomendado-container');
        if (!container) return;

        const producto = this.getProductoRecomendado();

        container.innerHTML = `
            <div class="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m coffee-recommend-container"
                data-uk-grid>
                
                <!-- Imagen -->
                <div class="uk-flex uk-flex-center uk-flex-middle uk-padding">
                    <img src="${producto?.img || 'assets/img/default-coffee.jpg'}"
                        alt="${producto?.title || 'Recomendación del día'}"
                        onerror="recomendadoSystem.handleImageError(this)"
                        class="coffee-image-circle-medium">
                </div>

                <!-- Contenido -->
                <div class="uk-padding uk-flex uk-flex-column uk-flex-between">
                    <div>
                        <h3 class="uk-card-title coffee-title-white uk-margin-small-bottom">
                            ${producto?.title || "Cargando recomendación..."}
                        </h3>

                        <div class="uk-margin-small">
                            <span class="uk-label coffee-price-badge-large">
                                ${producto?.price || "$ --"}
                            </span>

                            ${producto?.isPopular ? `
                                <span class="uk-label uk-margin-small-left coffee-badge-popular">
                                    Más Popular
                                </span>
                            ` : ''}
                        </div>

                        <p class="coffee-text-white-description">
                            ${producto?.description || "Seleccionando nuestra mejor recomendación para ti..."}
                        </p>

                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Categoría:</strong>
                            <span class="coffee-recommend-info-value">${producto?.category || "Café de especialidad"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Intensidad:</strong>
                            <span class="coffee-recommend-info-value">${producto?.intensity || "Media-Alta"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Tipo de grano:</strong>
                            <span class="coffee-recommend-info-value">${producto?.beanType || "Arábica"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Proceso:</strong>
                            <span class="coffee-recommend-info-value">${producto?.process || "Lavado"}</span>
                        </div>

                        <div class="uk-margin-small">
                            <span class="uk-badge coffee-badge-brown">
                                Origen: ${producto?.origin || "Colombia"}
                            </span>
                        </div>
                    </div>

                    ${producto?.recommendation ? `
                        <div class="uk-margin-top">
                            <p class="coffee-text-italic-gold">
                                ${producto.recommendation}
                            </p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
}

// Inicializar el sistema de recomendado
const recomendadoSystem = new RecomendadoSystem();