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
                <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1"
                    style="background-color: #2c2c2c; border: 1px solid rgba(212, 167, 98, 0.1); border-radius: 8px; padding: 15px">
                    
                    <div class="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small" data-uk-grid>
                        <!-- Imagen -->
                        <div class="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
                            <div class="uk-border-circle uk-overflow-hidden"
                                style="width: 100px; height: 100px; min-width: 80px; border: 2px solid #d4a762; box-shadow: 0 2px 4px rgba(0,0,0,0.2)">
                                <img src="${item.img}" alt="${item.title}" class="uk-cover"
                                    style="width: 100%; height: 100%; object-fit: cover; object-position: center">
                            </div>
                        </div>
                        
                        <!-- Información básica -->
                        <div style="flex-grow: 1">
                            <div class="uk-flex uk-flex-between uk-flex-middle">
                                <h3 class="uk-card-title uk-margin-remove-bottom"
                                    style="color: #f5f5f5; font-size: 1.2rem">
                                    ${item.title}
                                </h3>
                                <span class="uk-label"
                                    style="background-color: rgba(212, 167, 98, 0.9); color: #2c1608; padding: 3px 10px; border-radius: 12px; font-weight: bold; font-size: 0.9rem">
                                    ${item.price}
                                </span>
                            </div>
                            
                            <div class="uk-margin-small-top">
                                <span class="uk-badge"
                                    style="background-color: rgba(94, 43, 22, 0.7); color: #f5f5f5; font-size: 0.7rem; padding: 2px 8px; margin-right: 8px">
                                    ${item.origin}
                                </span>
                                ${item.isPopular ? `
                                    <span class="uk-badge"
                                        style="background-color: rgba(165, 42, 42, 0.7); color: white; font-size: 0.7rem; padding: 2px 8px">
                                        ★ Bestseller
                                    </span>
                                ` : ''}
                            </div>
                            
                            <p class="uk-margin-small-top"
                                style="color: rgba(245, 245, 245, 0.8); font-size: 0.85rem; line-height: 1.5">
                                ${item.description}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Botón para abrir modal -->
                    <div class="uk-text-center uk-padding-small">
                        <button class="uk-button uk-button-default"
                            style="color: #d4a762; background-color: transparent; border: 1px solid rgba(212, 167, 98, 0.5); border-radius: 6px; padding: 3px 15px; font-size: 0.85rem; transition: all 0.3s"
                            onclick="menuSystem.showModal(${index})">
                            Ver más detalles
                        </button>
                    </div>
                </div>
                
                <!-- Modal para este producto -->
                <div id="modal-${index}" class="uk-modal-container uk-modal" data-uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-light"
                        style="background-color: #2c2c2c; border-radius: 8px">
                        
                        <button class="uk-modal-close-default" type="button" data-uk-close
                            style="color: #d4a762"></button>
                        
                        <div class="uk-grid-collapse" data-uk-grid>
                            <!-- Columna de imagen en modal -->
                            <div class="uk-width-1-3@m uk-width-1-1@s">
                                <div class="uk-padding uk-flex uk-flex-center">
                                    <div class="uk-border-circle uk-overflow-hidden"
                                        style="width: 300px; height: 300px; border: 3px solid #d4a762; box-shadow: 0 4px 8px rgba(0,0,0,0.3)">
                                        <img src="${item.img}" alt="${item.title}" class="uk-cover"
                                            style="width: 100%; height: 100%; object-fit: cover; object-position: center">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Columna de contenido en modal -->
                            <div class="uk-width-2-3@m uk-width-1-1@s uk-padding-large">
                                <h2 class="uk-modal-title"
                                    style="color: #d4a762; border-bottom: 1px solid rgba(212, 167, 98, 0.3); padding-bottom: 10px">
                                    ${item.title}
                                </h2>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 style="color: #f5f5f5; font-size: 1.2rem; margin-bottom: 15px">
                                        Ingredientes:
                                    </h3>
                                    <ul class="uk-list uk-list-bullet" style="color: rgba(245, 245, 245, 0.8)">
                                        ${(item.ingredients || []).map(ing => `<li>${ing}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 style="color: #f5f5f5; font-size: 1.2rem; margin-bottom: 15px">
                                        Preparación:
                                    </h3>
                                    <p style="color: rgba(245, 245, 245, 0.8); line-height: 1.6">
                                        ${item.preparation || "Información no disponible."}
                                    </p>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <div class="uk-grid-small" data-uk-grid>
                                        <div>
                                            <span class="uk-label"
                                                style="background-color: rgba(212, 167, 98, 0.15); color: #d4a762; font-size: 0.9rem; padding: 5px 10px">
                                                Tostado: ${item.roastLevel}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="uk-label"
                                                style="background-color: rgba(212, 167, 98, 0.15); color: #d4a762; font-size: 0.9rem; padding: 5px 10px">
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