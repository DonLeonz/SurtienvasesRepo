-- ========================================
-- BASE DE DATOS SURTIENVASES - COMPLETA
-- Estructura + Datos Iniciales
-- ========================================
CREATE DATABASE IF NOT EXISTS surtienvases CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE surtienvases;

-- ========================================
-- TABLAS
-- ========================================
CREATE TABLE
    categorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        `key` VARCHAR(50) NOT NULL UNIQUE,
        icon VARCHAR(10) DEFAULT '📦',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    industrias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        `key` VARCHAR(50) NOT NULL UNIQUE,
        icon VARCHAR(10) DEFAULT '🏭',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    productos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        price VARCHAR(50),
        origin VARCHAR(50),
        material VARCHAR(100),
        category VARCHAR(100),
        industry VARCHAR(100),
        description TEXT,
        img VARCHAR(500),
        isPopular BOOLEAN DEFAULT FALSE,
        recommendation TEXT,
        minimumOrder VARCHAR(100),
        certification VARCHAR(100),
        stock VARCHAR(50) DEFAULT 'Disponible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    especificaciones (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        specification TEXT NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    beneficios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        benefit TEXT NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    noticias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) DEFAULT 'Usuario Invitado',
        excerpt TEXT NOT NULL,
        imageUrl VARCHAR(500),
        avatarUrl VARCHAR(500) DEFAULT 'assets/img/surtienvases/avatars/default.jpg',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    comentarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        noticia_id INT NOT NULL,
        author VARCHAR(100) DEFAULT 'Usuario Invitado',
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (noticia_id) REFERENCES noticias (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- DATOS INICIALES: Categorías
-- ========================================
INSERT INTO
    categorias (name, `key`, icon)
VALUES
    ('Envases de Vidrio', 'vidrio', '🫙'),
    ('Envases Plásticos', 'plastico', '🧴'),
    ('Tapas y Complementos', 'tapas', '🔧'),
    ('Envases Cosméticos', 'cosmetico', '💄'),
    ('Envases Farmacéuticos', 'farmaceutico', '💊'),
    ('Envases Industriales', 'industrial', '🏗️');

-- ========================================
-- DATOS INICIALES: Industrias
-- ========================================
INSERT INTO
    industrias (name, `key`, icon)
VALUES
    ('Alimentos', 'alimentos', '🍽️'),
    ('Bebidas', 'bebidas', '🥤'),
    ('Cosmética', 'cosmetica', '💄'),
    ('Farmacéutica', 'farmaceutica', '💊'),
    ('Químicos', 'quimicos', '⚗️'),
    ('Limpieza', 'limpieza', '🧹'),
    ('Industrial', 'industrial', '🏗️');

-- ========================================
-- DATOS INICIALES: Productos (10 productos)
-- ========================================
INSERT INTO
    productos (
        title,
        price,
        origin,
        material,
        category,
        industry,
        description,
        img,
        isPopular,
        recommendation,
        minimumOrder,
        certification,
        stock
    )
VALUES
    (
        'Frasco de Vidrio 250ml',
        '$2.500',
        'Nacional',
        'Vidrio Tipo III',
        'Envases de Vidrio',
        'Alimentos',
        'Frasco de vidrio transparente ideal para conservas, mermeladas y salsas.',
        'assets/img/productos/frasco-vidrio-250.jpg',
        TRUE,
        'Perfecto para pequeños emprendimientos de conservas artesanales. Incluye tapa twist-off.',
        'Caja x 24 unidades',
        'FDA Approved',
        'Disponible'
    ),
    (
        'Botella PET 500ml',
        '$850',
        'Nacional',
        'PET Cristal',
        'Envases Plásticos',
        'Bebidas',
        'Botella PET transparente con tapa rosca, ideal para jugos y bebidas.',
        'assets/img/productos/botella-pet-500.jpg',
        TRUE,
        'La opción más económica para envasar bebidas. Excelente claridad y resistencia.',
        'Paquete x 50 unidades',
        'ISO 9001',
        'Disponible'
    ),
    (
        'Tarro Cosmético 50g',
        '$3.200',
        'Importado',
        'PP Premium',
        'Envases Cosméticos',
        'Cosmética',
        'Tarro de alta calidad con doble pared para cremas y productos cosméticos.',
        'assets/img/productos/tarro-cosmetico-50.jpg',
        FALSE,
        'Diseño elegante que realza la presentación de productos premium.',
        'Caja x 100 unidades',
        'INVIMA',
        'Disponible'
    ),
    (
        'Galón Industrial 4L',
        '$4.800',
        'Nacional',
        'HDPE Alta Densidad',
        'Envases Industriales',
        'Químicos',
        'Galón resistente para productos químicos y de limpieza industrial.',
        'assets/img/productos/galon-industrial-4l.jpg',
        FALSE,
        'Resistente a químicos, ideal para productos de limpieza y desinfectantes.',
        'Paquete x 25 unidades',
        'UN Approved',
        'Disponible'
    ),
    (
        'Frasco Farmacéutico Ámbar 100ml',
        '$1.800',
        'Importado',
        'Vidrio Ámbar Tipo I',
        'Envases Farmacéuticos',
        'Farmacéutica',
        'Frasco ámbar que protege de la luz UV, ideal para medicamentos.',
        'assets/img/productos/frasco-ambar-100.jpg',
        TRUE,
        'Cumple todas las normas farmacéuticas. Protección UV garantizada.',
        'Caja x 48 unidades',
        'USP Standards',
        'Disponible'
    ),
    (
        'Tapa Twist-Off 63mm',
        '$180',
        'Nacional',
        'Hojalata',
        'Tapas y Complementos',
        'Alimentos',
        'Tapa metálica con botón de seguridad para frascos de conserva.',
        'assets/img/productos/tapa-twist-63.jpg',
        FALSE,
        'Compatible con todos nuestros frascos de boca 63mm. Sellado al vacío garantizado.',
        'Bolsa x 100 unidades',
        'FDA Approved',
        'Disponible'
    ),
    (
        'Botella Spray 250ml',
        '$2.100',
        'Nacional',
        'PET + Atomizador',
        'Envases Plásticos',
        'Limpieza',
        'Botella con atomizador ajustable para productos de limpieza y jardinería.',
        'assets/img/productos/botella-spray-250.jpg',
        TRUE,
        'Atomizador de alta calidad con múltiples configuraciones de spray.',
        'Paquete x 24 unidades',
        'ISO 9001',
        'Disponible'
    ),
    (
        'Frasco Gotero 30ml',
        '$1.500',
        'Importado',
        'Vidrio + Gotero',
        'Envases Farmacéuticos',
        'Farmacéutica',
        'Frasco con gotero de precisión para aceites esenciales y medicamentos.',
        'assets/img/productos/frasco-gotero-30.jpg',
        FALSE,
        'Ideal para aceites esenciales, tinturas y medicamentos líquidos.',
        'Caja x 100 unidades',
        'INVIMA',
        'Disponible'
    ),
    (
        'Contenedor 1000ml Hermético',
        '$3.500',
        'Nacional',
        'PP + Silicona',
        'Envases Plásticos',
        'Alimentos',
        'Contenedor hermético con cierre de seguridad para alimentos.',
        'assets/img/productos/contenedor-1000.jpg',
        TRUE,
        'Sistema de cierre hermético con 4 pestañas. Apto para microondas y congelador.',
        'Caja x 36 unidades',
        'FDA Approved',
        'Disponible'
    ),
    (
        'Bolsa Stand-Up 500g',
        '$450',
        'Nacional',
        'Laminado Kraft',
        'Envases Plásticos',
        'Alimentos',
        'Bolsa tipo doypack con zipper y ventana transparente.',
        'assets/img/productos/bolsa-standup-500.jpg',
        TRUE,
        'Perfecta para café, snacks y productos gourmet. Excelente presentación en góndola.',
        'Paquete x 100 unidades',
        'ISO 22000',
        'Por encargo'
    );

-- ========================================
-- ESPECIFICACIONES (Producto ID 1-10)
-- ========================================
INSERT INTO
    especificaciones (producto_id, specification)
VALUES
    -- Producto 1: Frasco de Vidrio 250ml
    (1, 'Capacidad: 250ml'),
    (1, 'Boca: 63mm'),
    (1, 'Altura: 110mm'),
    -- Producto 2: Botella PET 500ml
    (2, 'Capacidad: 500ml'),
    (2, 'Rosca: 28mm'),
    (2, 'Peso: 25g'),
    -- Producto 3: Tarro Cosmético 50g
    (3, 'Capacidad: 50g'),
    (3, 'Diámetro: 65mm'),
    (3, 'Color: Transparente/Negro'),
    -- Producto 4: Galón Industrial 4L
    (4, 'Capacidad: 4 Litros'),
    (4, 'Boca: 38mm'),
    (4, 'Color: Natural/Blanco'),
    -- Producto 5: Frasco Farmacéutico Ámbar 100ml
    (5, 'Capacidad: 100ml'),
    (5, 'Rosca: DIN18'),
    (5, 'Color: Ámbar'),
    -- Producto 6: Tapa Twist-Off 63mm
    (6, 'Diámetro: 63mm'),
    (6, 'Color: Dorado/Plateado'),
    (6, 'Con pasteurización'),
    -- Producto 7: Botella Spray 250ml
    (7, 'Capacidad: 250ml'),
    (7, 'Trigger spray'),
    (7, 'Colores variados'),
    -- Producto 8: Frasco Gotero 30ml
    (8, 'Capacidad: 30ml'),
    (8, 'Pipeta de vidrio'),
    (8, 'Color: Transparente/Ámbar'),
    -- Producto 9: Contenedor 1000ml Hermético
    (9, 'Capacidad: 1000ml'),
    (9, 'Rectangular'),
    (9, 'Apilable'),
    -- Producto 10: Bolsa Stand-Up 500g
    (10, 'Capacidad: 500g'),
    (10, 'Con ventana'),
    (10, 'Válvula opcional');

-- ========================================
-- BENEFICIOS (Producto ID 1-10)
-- ========================================
INSERT INTO
    beneficios (producto_id, benefit)
VALUES
    -- Producto 1: Frasco de Vidrio 250ml
    (1, 'Apto para alimentos'),
    (1, 'Esterilizable'),
    (1, 'Reutilizable'),
    -- Producto 2: Botella PET 500ml
    (2, 'Ligero'),
    (2, 'Irrompible'),
    (2, '100% Reciclable'),
    -- Producto 3: Tarro Cosmético 50g
    (3, 'Doble pared'),
    (3, 'Sellado hermético'),
    (3, 'Diseño premium'),
    -- Producto 4: Galón Industrial 4L
    (4, 'Alta resistencia química'),
    (4, 'Manija ergonómica'),
    (4, 'Graduado'),
    -- Producto 5: Frasco Farmacéutico Ámbar 100ml
    (5, 'Protección UV'),
    (5, 'Grado farmacéutico'),
    (5, 'Hermético'),
    -- Producto 6: Tapa Twist-Off 63mm
    (6, 'Botón de seguridad'),
    (6, 'Recubrimiento interno'),
    (6, 'Reutilizable'),
    -- Producto 7: Botella Spray 250ml
    (7, 'Atomizador ajustable'),
    (7, 'Resistente a químicos'),
    (7, 'Ergonómico'),
    -- Producto 8: Frasco Gotero 30ml
    (8, 'Gotero de precisión'),
    (8, 'Vidrio resistente'),
    (8, 'Tapa de seguridad'),
    -- Producto 9: Contenedor 1000ml Hermético
    (9, 'Hermético 100%'),
    (9, 'Apto microondas'),
    (9, 'Libre de BPA'),
    -- Producto 10: Bolsa Stand-Up 500g
    (10, 'Barrera de oxígeno'),
    (10, 'Zipper resellable'),
    (10, 'Base estable');

-- ========================================
-- DATOS INICIALES: Noticias (3 artículos)
-- ========================================
INSERT INTO
    noticias (title, author, excerpt, imageUrl, avatarUrl)
VALUES
    (
        'Cómo Reutilizar Envases Plásticos de Forma Segura',
        'Equipo SurtiEnvases',
        'Aprende las mejores prácticas para darle una segunda vida a tus envases plásticos sin comprometer la seguridad alimentaria.',
        'assets/img/blog/blog-example1.jpg',
        'assets/img/surtienvases/avatars/default.jpg'
    ),
    (
        'Ventajas de los Envases de Vidrio para Alimentos',
        'Usuario Invitado',
        'Descubre por qué el vidrio sigue siendo la mejor opción para conservar alimentos y bebidas manteniendo su calidad.',
        'assets/img/blog/blog-example2.jpg',
        'assets/img/surtienvases/avatars/default.jpg'
    ),
    (
        'Guía Completa: Elegir el Envase Correcto para tu Producto',
        'Usuario Invitado',
        'Factores clave a considerar al seleccionar envases: material, tamaño, certificaciones y compatibilidad con tu producto.',
        'assets/img/blog/blog-example3.jpg',
        'assets/img/surtienvases/avatars/default.jpg'
    );

-- ========================================
-- FIN DEL SCRIPT
-- ========================================