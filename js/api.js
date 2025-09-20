// Sistema de API
class ApiSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupGitHubSearch();
        this.setupMangaSearch();
    }

    setupGitHubSearch() {
        const form = document.getElementById('github-search-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const input = document.getElementById('github-search-input');
                if (input && input.value.trim()) {
                    await this.searchGitHub(input.value.trim());
                }
            });
        }
    }

    setupMangaSearch() {
        const form = document.getElementById('manga-search-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const input = document.getElementById('manga-search-input');
                if (input && input.value.trim()) {
                    await this.searchManga(input.value.trim());
                }
            });
        }
    }

    async searchGitHub(query) {
        const errorDiv = document.getElementById('github-error');
        const loadingDiv = document.getElementById('github-loading');
        const resultsDiv = document.getElementById('github-results');

        // Reset states
        errorDiv.style.display = 'none';
        resultsDiv.innerHTML = '';
        loadingDiv.style.display = 'block';

        try {
            const response = await fetch(`https://api.github.com/search/users?q=${query}`);
            const data = await response.json();

            loadingDiv.style.display = 'none';

            if (data.items && data.items.length > 0) {
                const users = data.items.map(user => ({
                    id: user.id,
                    login: user.login,
                    avatar_url: user.avatar_url,
                    html_url: user.html_url
                }));

                this.renderGitHubResults(users);
            } else {
                resultsDiv.innerHTML = '<p class="uk-text-center uk-text-muted">No se encontraron resultados</p>';
            }
        } catch (error) {
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            console.error('Error fetching GitHub API:', error);
        }
    }

    renderGitHubResults(usuarios) {
        const resultsDiv = document.getElementById('github-results');
        
        resultsDiv.innerHTML = `
            <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" uk-grid="true">
                ${usuarios.map(usuario => `
                    <div>
                        <div class="uk-card uk-card-default uk-card-body uk-text-center">
                            <img src="${usuario.avatar_url}" alt="Avatar de ${usuario.login}"
                                width="80" class="uk-border-circle">
                            <h3 class="uk-card-title uk-text-truncate">${usuario.login}</h3>
                            <a href="${usuario.html_url}" target="_blank" rel="noreferrer" 
                               class="uk-button uk-button-primary">Ver perfil</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async searchManga(query) {
        const errorDiv = document.getElementById('manga-error');
        const loadingDiv = document.getElementById('manga-loading');
        const resultsDiv = document.getElementById('manga-results');

        // Reset states
        errorDiv.style.display = 'none';
        resultsDiv.innerHTML = '';
        loadingDiv.style.display = 'block';

        try {
            const contentRating = ["safe", "suggestive", "erotica", "pornographic"];
            const translatedLanguage = ["es", "es-la"];

            const params = new URLSearchParams();
            if (query) params.append("title", query);
            params.append("offset", "0");
            params.append("limit", "12");
            contentRating.forEach(rating => params.append("contentRating[]", rating));
            translatedLanguage.forEach(lang => params.append("availableTranslatedLanguage[]", lang));
            params.append("includes[]", "cover_art");
            params.append("order[latestUploadedChapter]", "desc");

            // Nota: Esta URL necesitaría un proxy o servidor backend para funcionar
            // Por ahora simularemos con datos de ejemplo
            const url = `https://api.mangadex.org/manga?${params.toString()}`;
            
            // Simulación de respuesta para demostración
            // En producción, esto requeriría un servidor proxy
            const simulatedData = this.getSimulatedMangaData(query);
            
            loadingDiv.style.display = 'none';
            
            if (simulatedData.length > 0) {
                this.renderMangaResults(simulatedData);
            } else {
                resultsDiv.innerHTML = '<p class="uk-text-center uk-text-muted">No se encontraron resultados</p>';
            }
            
        } catch (error) {
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            console.error('Error fetching MangaDex API:', error);
        }
    }

    getSimulatedMangaData(query) {
        // Datos simulados para demostración
        if (query.toLowerCase().includes('bleach')) {
            return [
                {
                    id: '1',
                    title: 'Bleach',
                    imageUrl: 'https://via.placeholder.com/256x364?text=Bleach',
                    url: 'https://mangadex.org/title/bleach'
                }
            ];
        } else if (query) {
            return [
                {
                    id: '2',
                    title: query,
                    imageUrl: `https://via.placeholder.com/256x364?text=${encodeURIComponent(query)}`,
                    url: `https://mangadex.org/title/${query}`
                }
            ];
        }
        return [];
    }

    renderMangaResults(mangas) {
        const resultsDiv = document.getElementById('manga-results');
        
        resultsDiv.innerHTML = `
            <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-match" data-uk-grid="">
                ${mangas.map(manga => `
                    <div>
                        <div class="uk-card uk-card-default uk-card-hover uk-box-shadow-hover-large uk-border-rounded" style="height: 100%">
                            <div class="uk-card-media-top" style="height: 350px; overflow: hidden">
                                <img src="${manga.imageUrl}" alt="${manga.title}"
                                    style="width: 100%; height: 100%; object-fit: cover; object-position: center top">
                            </div>
                            <div class="uk-card-body uk-padding-small" style="flex-grow: 1">
                                <h3 class="uk-card-title uk-text-truncate uk-margin-remove-bottom">
                                    ${manga.title}
                                </h3>
                            </div>
                            <div class="uk-card-footer uk-text-center uk-padding-small">
                                <a href="${manga.url}" target="_blank" rel="noreferrer"
                                   class="uk-button uk-button-primary uk-border-rounded uk-width-1-1">
                                    Ver manga
                                </a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Inicializar el sistema de API
const apiSystem = new ApiSystem();