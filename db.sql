CREATE DATABASE inventoryApp;

--inventory tables 

CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    item_desc TEXT,
    sku VARCHAR(100) UNIQUE,
    ean VARCHAR(13) UNIQUE,  -- EAN con longitud estándar de 13 dígitos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    extra_field_1 VARCHAR(255) DEFAULT NULL,  -- Campo 1 para futuras extensiones
    extra_field_2 VARCHAR(255) DEFAULT NULL,  -- Campo 2 para futuras extensiones
    extra_field_3 VARCHAR(255) DEFAULT NULL,  -- Campo 3 para futuras extensiones
    extra_field_4 VARCHAR(255) DEFAULT NULL,  -- Campo 4 para futuras extensiones
    extra_field_5 VARCHAR(255) DEFAULT NULL   -- Campo 5 para futuras extensiones
);

CREATE TABLE storage_locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    location_code VARCHAR(50) NOT NULL UNIQUE,
    description_loc TEXT,
    extra_field_1 VARCHAR(255) DEFAULT NULL,  -- Campo 1 para futuras extensiones
    extra_field_2 VARCHAR(255) DEFAULT NULL,  -- Campo 2 para futuras extensiones
    extra_field_3 VARCHAR(255) DEFAULT NULL,  -- Campo 3 para futuras extensiones
    extra_field_4 VARCHAR(255) DEFAULT NULL,  -- Campo 4 para futuras extensiones
    extra_field_5 VARCHAR(255) DEFAULT NULL,  -- Campo 5 para futuras extensiones
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    location_id INT NOT NULL,
    quantity INT NOT NULL,
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    in_work_quantity INT NOT NULL,            -- Cantidad reservada para pickings
    extra_field_1 VARCHAR(255) DEFAULT NULL,  -- Campo 1 para futuras extensiones
    extra_field_2 VARCHAR(255) DEFAULT NULL,  -- Campo 2 para futuras extensiones
    extra_field_3 VARCHAR(255) DEFAULT NULL,  -- Campo 3 para futuras extensiones
    extra_field_4 VARCHAR(255) DEFAULT NULL,  -- Campo 4 para futuras extensiones
    extra_field_5 VARCHAR(255) DEFAULT NULL,  -- Campo 5 para futuras extensiones
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES storage_locations(id) ON DELETE CASCADE
);


--shipment_tables


--auxiliar tables

CREATE TABLE ean_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    ean VARCHAR(13) UNIQUE NOT NULL,  -- Código EAN de 13 dígitos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    extra_field_1 VARCHAR(255) DEFAULT NULL,  -- Campo 1 para futuras extensiones
    extra_field_2 VARCHAR(255) DEFAULT NULL,  -- Campo 2 para futuras extensiones
    extra_field_3 VARCHAR(255) DEFAULT NULL,  -- Campo 3 para futuras extensiones
    extra_field_4 VARCHAR(255) DEFAULT NULL,  -- Campo 4 para futuras extensiones
    extra_field_5 VARCHAR(255) DEFAULT NULL,  -- Campo 5 para futuras extensiones
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);
