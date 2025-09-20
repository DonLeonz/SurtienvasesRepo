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
            <div class="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m"
                data-uk-grid
                style="background-color: #2c2c2c; border-radius: 12px; overflow: hidden; width: 100%; max-width: 960px; height: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.3); display: flex; flex-direction: row; flex-wrap: wrap;">
                
                <!-- Imagen -->
                <div class="uk-flex uk-flex-center uk-flex-middle uk-padding">
                    <img src="${producto?.img || 'assets/img/default-coffee.jpg'}"
                        alt="${producto?.title || 'Recomendación del día'}"
                        onerror="recomendadoSystem.handleImageError(this)"
                        style="width: 220px; height: 220px; object-fit: cover; border-radius: 50%; border: 4px solid #d4a762;">
                </div>

                <!-- Contenido -->
                <div class="uk-padding uk-flex uk-flex-column uk-flex-between">
                    <div>
                        <h3 class="uk-card-title" style="color: #f5f5f5; margin-bottom: 10px">
                            ${producto?.title || "Cargando recomendación..."}
                        </h3>

                        <div class="uk-margin-small">
                            <span class="uk-label"
                                style="background-color: rgba(212, 167, 98, 0.9); color: #2c1608; font-size: 1rem; padding: 6px 12px">
                                ${producto?.price || "$ --"}
                            </span>

                            ${producto?.isPopular ? `
                                <span class="uk-label uk-margin-small-left"
                                    style="background-color: rgba(165, 42, 42, 0.7); color: white">
                                    Más Popular
                                </span>
                            ` : ''}
                        </div>

                        <p style="color: rgba(245, 245, 245, 0.85); font-size: 0.95rem; line-height: 1.6">
                            ${producto?.description || "Seleccionando nuestra mejor recomendación para ti..."}
                        </p>

                        <div class="uk-margin-small">
                            <strong style="color: #d4a762">Categoría:</strong>
                            <span style="color: #f5f5f5">${producto?.category || "Café de especialidad"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong style="color: #d4a762">Intensidad:</strong>
                            <span style="color: #f5f5f5">${producto?.intensity || "Media-Alta"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong style="color: #d4a762">Tipo de grano:</strong>
                            <span style="color: #f5f5f5">${producto?.beanType || "Arábica"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong style="color: #d4a762">Proceso:</strong>
                            <span style="color: #f5f5f5">${producto?.process || "Lavado"}</span>
                        </div>

                        <div class="uk-margin-small">
                            <span class="uk-badge" style="background-color: rgba(94, 43, 22, 0.7); color: #f5f5f5">
                                Origen: ${producto?.origin || "Colombia"}
                            </span>
                        </div>
                    </div>

                    ${producto?.recommendation ? `
                        <div class="uk-margin-top">
                            <p style="color: #d4a762; font-size: 0.9rem; font-style: italic">
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