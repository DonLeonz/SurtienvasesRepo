// Sistema de Menú
class MenuSystem {
    constructor() {
        this.init();
    }

    init() {
        this.renderMenu();
    }

    renderMenu() {
        const menuGrid = document.getElementById('menu-grid');
        if (!menuGrid) return;

        menuGrid.innerHTML = coffeeItems.map((item, index) => `
            <div>
                <!-- Card del producto -->
                <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 coffee-card-dark">
                    
                    <div class="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small" data-uk-grid>
                        <!-- Imagen -->
                        <div class="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
                            <div class="uk-border-circle uk-overflow-hidden coffee-image-circle">
                                <img src="${item.img}" alt="${item.title}" class="uk-cover coffee-image-cover">
                            </div>
                        </div>
                        
                        <!-- Información básica -->
                        <div class="coffee-flex-grow">
                            <div class="uk-flex uk-flex-between uk-flex-middle">
                                <h3 class="uk-card-title uk-margin-remove-bottom coffee-title-white">
                                    ${item.title}
                                </h3>
                                <span class="uk-label coffee-price-badge">
                                    ${item.price}
                                </span>
                            </div>
                            
                            <div class="coffee-margin-small-top">
                                <span class="coffee-menu-origin">
                                    ${item.origin}
                                </span>
                                ${item.isPopular ? `
                                    <span class="uk-badge coffee-badge-popular">
                                        ★ Bestseller
                                    </span>
                                ` : ''}
                            </div>
                            
                            <p class="coffee-margin-small-top coffee-text-white-muted">
                                ${item.description}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Botón para abrir modal -->
                    <div class="uk-text-center uk-padding-small">
                        <button class="uk-button uk-button-default coffee-button-outline"
                            onclick="menuSystem.showModal(${index})">
                            Ver más detalles
                        </button>
                    </div>
                </div>
                
                <!-- Modal para este producto -->
                <div id="modal-${index}" class="uk-modal-container uk-modal" data-uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-light coffee-modal-dark">
                        
                        <button class="uk-modal-close-default" type="button" data-uk-close></button>
                        
                        <div class="uk-grid-collapse" data-uk-grid>
                            <!-- Columna de imagen en modal -->
                            <div class="uk-width-1-3@m uk-width-1-1@s">
                                <div class="uk-padding uk-flex uk-flex-center">
                                    <div class="uk-border-circle uk-overflow-hidden coffee-image-circle-large">
                                        <img src="${item.img}" alt="${item.title}" class="uk-cover coffee-image-cover">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Columna de contenido en modal -->
                            <div class="uk-width-2-3@m uk-width-1-1@s coffee-padding-large">
                                <h2 class="uk-modal-title coffee-title-gold-border">
                                    ${item.title}
                                </h2>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Ingredientes:
                                    </h3>
                                    <ul class="uk-list uk-list-bullet coffee-modal-ingredients-list">
                                        ${(item.ingredients || []).map(ing => `<li>${ing}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Preparación:
                                    </h3>
                                    <p class="coffee-modal-preparation-text">
                                        ${item.preparation || "Información no disponible."}
                                    </p>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <div class="uk-grid-small" data-uk-grid>
                                        <div>
                                            <span class="uk-label coffee-label-transparent">
                                                Tostado: ${item.roastLevel}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="uk-label coffee-label-transparent">
                                                Sabor: ${item.flavorProfile}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showModal(index) {
        const modal = UIkit.modal(document.getElementById(`modal-${index}`));
        if (modal) modal.show();
    }
}

// Inicializar el sistema de menú
const menuSystem = new MenuSystem();