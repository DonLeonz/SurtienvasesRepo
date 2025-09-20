// Sistema de Blog
class BlogSystem {
    constructor() {
        this.blogs = JSON.parse(localStorage.getItem('blogs')) || this.getInitialBlogs();
        this.comments = JSON.parse(localStorage.getItem('comments')) || {};
        this.visibleComments = {};
        this.init();
    }

    getInitialBlogs() {
        return [
            {
                id: 1,
                title: "5 Consejos para Mejorar tu Café Casero",
                author: "Natalia Ruiz",
                imageUrl: "assets/img/blog/blog-example1.jpg",
                avatarUrl: "assets/img/avatars/default.jpg",
                excerpt: "Descubre técnicas simples pero efectivas para preparar un mejor café en casa."
            },
            {
                id: 2,
                title: "Guía Básica de Fotografía para Principiantes",
                author: "Kaleth Narváez",
                imageUrl: "assets/img/blog/blog-example2.jpg",
                avatarUrl: "assets/img/avatars/default.jpg",
                excerpt: "Aprende a sacar el máximo provecho de tu cámara desde el primer día."
            }
        ];
    }

    init() {
        this.renderBlogs();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const blogForm = document.getElementById('blog-form');
        if (blogForm) {
            blogForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBlogSubmit();
            });
        }
    }

    handleBlogSubmit() {
        if (!authSystem.isLoggedIn()) {
            UIkit.notification({
                message: "Debes iniciar sesión para publicar un blog.",
                status: "warning",
                pos: "top-center"
            });
            authSystem.showLoginModal();
            return;
        }

        const title = document.getElementById('blog-title').value;
        const author = document.getElementById('blog-author').value;
        const excerpt = document.getElementById('blog-excerpt').value;
        const imageInput = document.getElementById('blog-image');
        
        let imageUrl = "assets/img/blog/blogDefault.jpg";
        if (imageInput.files && imageInput.files[0]) {
            imageUrl = URL.createObjectURL(imageInput.files[0]);
        }

        const newBlog = {
            id: Date.now(),
            title: title,
            author: authSystem.getCurrentUser(),
            excerpt: excerpt,
            imageUrl: imageUrl,
            avatarUrl: "assets/img/avatars/default.jpg"
        };

        this.blogs.unshift(newBlog);
        this.saveBlogs();
        this.renderBlogs();
        
        // Limpiar formulario
        document.getElementById('blog-form').reset();
        
        UIkit.notification({
            message: "Blog publicado exitosamente.",
            status: "success",
            pos: "top-center"
        });
    }

    toggleComments(blogId) {
        this.visibleComments[blogId] = !this.visibleComments[blogId];
        this.renderBlogs();
    }

    handleCommentSubmit(blogId) {
        if (!authSystem.isLoggedIn()) {
            UIkit.notification({
                message: "Debes iniciar sesión para comentar.",
                status: "warning",
                pos: "top-center"
            });
            authSystem.showLoginModal();
            return;
        }

        const commentInput = document.getElementById(`comment-input-${blogId}`);
        if (!commentInput || !commentInput.value.trim()) return;

        const newComment = {
            text: commentInput.value,
            author: authSystem.getCurrentUser(),
            timestamp: Date.now()
        };

        if (!this.comments[blogId]) {
            this.comments[blogId] = [];
        }
        
        this.comments[blogId].push(newComment);
        this.saveComments();
        
        commentInput.value = '';
        this.renderBlogs();
        
        UIkit.notification({
            message: "Comentario publicado.",
            status: "success",
            pos: "top-center"
        });
    }

    saveBlogs() {
        localStorage.setItem('blogs', JSON.stringify(this.blogs));
    }

    saveComments() {
        localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    renderBlogs() {
        const container = document.getElementById('blogs-container');
        if (!container) return;

        container.innerHTML = this.blogs.map(blog => `
            <div>
                <div class="uk-card uk-card-default uk-card-hover blog-container-round color-text-black">
                    <div class="uk-card-media-top blog-image-container">
                        <button type="button" onclick="blogSystem.showImageModal(${blog.id})"
                            style="border: none; background: transparent; padding: 0; cursor: pointer;">
                            <img src="${blog.imageUrl}" alt="${blog.title}">
                        </button>
                        
                        <div id="modal-media-image-${blog.id}" class="uk-flex-top" uk-modal="true">
                            <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
                                <button class="uk-modal-close-outside" type="button" uk-close="true"></button>
                                <img src="${blog.imageUrl}" alt="${blog.title}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">${blog.title}</h3>
                        <p>${blog.excerpt}</p>
                        <div class="uk-flex uk-flex-middle uk-margin-small-top">
                            <img src="${blog.avatarUrl}" alt="${blog.author}"
                                class="uk-border-circle" width="40" height="40">
                            <span class="uk-margin-small-left">${blog.author}</span>
                        </div>
                        
                        <button class="uk-button uk-button-secondary uk-margin-small-top blog-container-round"
                            onclick="blogSystem.toggleComments(${blog.id})">
                            ${this.visibleComments[blog.id] ? 'Cerrar comentarios' : 'Ver comentarios'}
                        </button>
                        
                        ${this.visibleComments[blog.id] ? this.renderCommentsSection(blog.id) : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCommentsSection(blogId) {
        const blogComments = this.comments[blogId] || [];
        const currentUser = authSystem.getCurrentUser() || "Invitado";
        
        return `
            <div class="uk-margin-top">
                <div class="uk-flex uk-flex-middle uk-margin">
                    <img src="assets/img/avatars/default.jpg" width="40" height="40"
                        class="uk-border-circle" alt="Usuario">
                    <span class="uk-margin-left">${currentUser}</span>
                </div>
                
                <textarea class="uk-textarea uk-placeholder blog-login-input" rows="3"
                    placeholder="Escribe tu comentario..." id="comment-input-${blogId}"></textarea>
                
                <button class="uk-button uk-button-primary uk-margin-top blog-container-round"
                    onclick="blogSystem.handleCommentSubmit(${blogId})">
                    Comentar
                </button>
                
                ${blogComments.map(comment => `
                    <article class="uk-comment uk-margin-top">
                        <header class="uk-comment-header uk-flex uk-flex-middle">
                            <img class="uk-comment-avatar uk-border-circle"
                                src="assets/img/avatars/default.jpg"
                                width="40" height="40" alt="${comment.author}">
                            <div class="uk-margin-small-left">
                                <h4 class="uk-comment-title uk-margin-remove color-text-black">
                                    ${comment.author}
                                </h4>
                                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li><span class="color-text-black">Hace un momento</span></li>
                                </ul>
                            </div>
                        </header>
                        <div class="uk-comment-body">
                            <p>${comment.text}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }

    showImageModal(blogId) {
        const modal = UIkit.modal(document.getElementById(`modal-media-image-${blogId}`));
        if (modal) modal.show();
    }
}

// Inicializar el sistema de blog
const blogSystem = new BlogSystem();