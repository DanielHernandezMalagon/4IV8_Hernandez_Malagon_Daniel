-- 1. Borrar la base de datos si ya existe y crearla de nuevo
DROP DATABASE IF EXISTS liga_futbol;
CREATE DATABASE liga_futbol;
USE liga_futbol;

-- 2. Tabla de Equipos (Independiente)
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100),
    estadio VARCHAR(100)
);

-- 3. Tabla de Jugadores (Ahora depende de Equipos)
CREATE TABLE jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    posicion VARCHAR(50),
    nacionalidad VARCHAR(50),
    id_equipo INT,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id) ON DELETE SET NULL
);

-- 4. Tabla de Fichajes (Historial)
CREATE TABLE fichajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT NOT NULL,
    id_equipo INT NOT NULL,
    monto_fichaje DECIMAL(15, 2),
    fecha_contrato DATE,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id) ON DELETE CASCADE,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id) ON DELETE CASCADE
);

-- 5. Tabla de Partidos
CREATE TABLE partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo_local INT NOT NULL,
    id_equipo_visitante INT NOT NULL,
    goles_local INT DEFAULT 0,
    goles_visitante INT DEFAULT 0,
    fecha_partido DATETIME,
    FOREIGN KEY (id_equipo_local) REFERENCES equipos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_equipo_visitante) REFERENCES equipos(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- INSERTAR EQUIPOS REALES
-- ---------------------------------------------------------
INSERT INTO equipos (nombre, ciudad, estadio) VALUES 
('Real Madrid', 'Madrid', 'Santiago Bernabéu'),
('FC Barcelona', 'Barcelona', 'Spotify Camp Nou'),
('Atlético de Madrid', 'Madrid', 'Cívitas Metropolitano'),
('Real Sociedad', 'San Sebastián', 'Reale Arena'),
('Real Betis', 'Sevilla', 'Benito Villamarín'),
('Athletic Club', 'Bilbao', 'San Mamés'),
('Girona FC', 'Girona', 'Montilivi'),
('Villarreal CF', 'Villarreal', 'Estadio de la Cerámica'),
('Valencia CF', 'Valencia', 'Mestalla'),
('Sevilla FC', 'Sevilla', 'Ramón Sánchez-Pizjuán');

-- ---------------------------------------------------------
-- INSERTAR JUGADORES REALES (Asignados a sus equipos)
-- ---------------------------------------------------------
INSERT INTO jugadores (nombre, posicion, nacionalidad, id_equipo) VALUES 
-- Real Madrid (id 1)
('Kylian Mbappé', 'Delantero', 'Francia', 1),
('Vinícius Júnior', 'Extremo', 'Brasil', 1),
('Jude Bellingham', 'Mediocentro', 'Inglaterra', 1),
-- FC Barcelona (id 2)
('Lamine Yamal', 'Extremo', 'España', 2),
('Robert Lewandowski', 'Delantero', 'Polonia', 2),
('Pedri', 'Mediocentro', 'España', 2),
-- Atlético de Madrid (id 3)
('Antoine Griezmann', 'Delantero', 'Francia', 3),
('Julián Álvarez', 'Delantero', 'Argentina', 3),
-- Athletic Club (id 6)
('Nico Williams', 'Extremo', 'España', 6),
-- Valencia CF (id 9)
('Pepelu', 'Mediocentro', 'España', 9),
-- Agentes Libres (id_equipo NULL)
('Sergio Ramos', 'Defensa', 'España', NULL),
('Keylor Navas', 'Portero', 'Costa Rica', NULL);

USE liga_futbol;

-- No permitir nombres de equipos repetidos
ALTER TABLE equipos ADD UNIQUE (nombre);

-- No permitir nombres de jugadores repetidos
ALTER TABLE jugadores ADD UNIQUE (nombre);

-- No permitir montos negativos en fichajes
ALTER TABLE fichajes ADD CONSTRAINT check_monto_positivo CHECK (monto_fichaje >= 0);

-- No permitir goles negativos en partidos
ALTER TABLE partidos 
ADD CONSTRAINT check_goles_local CHECK (goles_local >= 0),
ADD CONSTRAINT check_goles_visitante CHECK (goles_visitante >= 0);