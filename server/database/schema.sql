DROP DATABASE IF EXISTS wickiecodeschool;
CREATE DATABASE wickiecodeschool;
USE wickiecodeschool;

-- Table des catégories de cours
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Table des sujets
CREATE TABLE topic (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Table des cours
CREATE TABLE course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_category INT,
    title VARCHAR(255) NOT NULL,
    corpus TEXT NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    topic_id INT,
    FOREIGN KEY (id_category) REFERENCES category(id) ON DELETE SET NULL,
    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE SET NULL
);

-- Table des utilisateurs
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname_user VARCHAR(100) NOT NULL,
    lastname_user VARCHAR(100) NOT NULL,
    age_user INT,
    role_user ENUM('aspirant', 'viking', 'jaarl', 'thor', 'odin') NOT NULL,
    level_user INT DEFAULT 1,
    xp_user INT DEFAULT 0
);

-- Table des workshops
CREATE TABLE workshop (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_workshop VARCHAR(255) NOT NULL,
    is_public TINYINT(1) DEFAULT 1
);

-- Relation entre cours et workshops
CREATE TABLE course_has_workshop (
    course_id INT,
    workshop_id INT,
    PRIMARY KEY (course_id, workshop_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (workshop_id) REFERENCES workshop(id) ON DELETE CASCADE
);

-- Table des commentaires sur les cours
CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_course INT,
    text_comment TEXT NOT NULL,
    resource TEXT,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- Table des solutions soumises par les utilisateurs
CREATE TABLE solution (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_course INT,
    corpus_solution TEXT NOT NULL,
    isValidated tinyint DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- Table des commentaires sur les solutions
CREATE TABLE comment_solution (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_solution INT,
    id_user_target INT,
    text_comment_solution TEXT NOT NULL,
    isValidated BOOLEAN DEFAULT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_solution) REFERENCES solution(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user_target) REFERENCES user(id) ON DELETE CASCADE
);

-- Table des prérequis des cours
CREATE TABLE prerequisite (
    id_course INT,
    id_course_required INT,
    PRIMARY KEY (id_course, id_course_required),
    FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (id_course_required) REFERENCES course(id) ON DELETE CASCADE
);

-- Table des badges et des récompenses
CREATE TABLE badge (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Attribution des badges aux utilisateurs
CREATE TABLE user_badge (
    id_user INT,
    id_badge INT,
    date_obtention DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_badge),
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_badge) REFERENCES badge(id) ON DELETE CASCADE
);

-- Suivi de la progression des utilisateurs
CREATE TABLE progress (
    id_user INT,
    id_course INT,
    status ENUM('en cours', 'terminé') NOT NULL DEFAULT 'en cours',
    date_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_completed TIMESTAMP NULL,
    PRIMARY KEY (id_user, id_course),
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- Table des quizzes liés aux cours
CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_course INT,
    question TEXT NOT NULL,
    type_question ENUM('QCM', 'ouvert', 'vrai/faux') NOT NULL,
    FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- Réponses aux quizzes
CREATE TABLE answer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_quiz INT,
    id_user INT,
    response TEXT NOT NULL,
    is_correct TINYINT(1),
    FOREIGN KEY (id_quiz) REFERENCES quiz(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- Table de validation des cours par des utilisateurs expérimentés
CREATE TABLE validation (
    id_validator INT,
    id_submitter INT,
    id_course INT,
    date_validation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('validé', 'rejeté') NOT NULL DEFAULT 'validé',
    PRIMARY KEY (id_validator, id_submitter, id_course),
    FOREIGN KEY (id_validator) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_submitter) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- Créer un trigger qui se déclenche après insertion d'un commentaire validé
DELIMITER $$

CREATE TRIGGER auto_validate_solution
AFTER INSERT ON comment_solution
FOR EACH ROW
BEGIN
    DECLARE current_count INT;

    -- Calcul du nombre de validations pour la solution concernée
    SELECT COUNT(*) INTO current_count 
    FROM comment_solution c 
    WHERE c.id_solution = NEW.id_solution AND c.isValidated = 1;

    -- Vérifier si le seuil de validation (ex: 2) est atteint
    IF current_count >= 2 THEN
        UPDATE solution 
        SET isValidated = 1 
        WHERE id = NEW.id_solution;
    END IF;
END$$

DELIMITER ;


-- Insertion des utilisateurs
INSERT INTO user (firstname_user, lastname_user, age_user, role_user, level_user, xp_user) VALUES
('Bjorn', 'Ironside', 20, 'aspirant', 1, 50),
('Ragnar', 'Lothbrok', 35, 'viking', 5, 500),
('Floki', 'Karak', 30, 'jaarl', 7, 1000),
('Harald', 'Fairhair', 28, 'aspirant', 1, 40),
('Lagertha', 'Shieldmaiden', 32, 'aspirant', 1, 60),
('Ubbe', 'Ragnarsson', 25, 'aspirant', 1, 30),
('Odin', 'Allfather', 1000, 'odin', 10, 5000);

-- Insérer un cours en Markdown
INSERT INTO course (id_category, title, corpus, is_active, topic_id) VALUES
(1, 'Créer sa première page web', '# Introduction\nApprenez à créer une page web avec HTML et CSS.\n\n## Exemple\n```html\n<!DOCTYPE html>\n<html>\n<head><title>Hello World</title></head>\n<body><h1>Hello, World!</h1></body>\n</html>\n```', 1, 1);

-- Insérer un quiz sur ce cours
INSERT INTO quiz (id_course, question, type_question) VALUES
(1, 'Quelle est la balise principale d’une page HTML ?', 'QCM');

-- Insérer une réponse au quiz
INSERT INTO answer (id_quiz, id_user, response, is_correct) VALUES
(1, 1, '<html>', 1);

-- Insérer une solution soumise
INSERT INTO solution (id_user, id_course, corpus_solution) VALUES
(1, 1, '<!DOCTYPE html>\n<html>\n<head><title>Hello World</title></head>\n<body><h1>Hello, World!</h1></body>\n</html>');

INSERT INTO comment_solution(id_user, id_solution, id_user_target, text_comment_solution, isValidated)VALUES
(4,1,1,'ça semble correcte, je valide !',1),
(5,1,1,'il manque la langue à préciser dans ton doctype',0),
(1,1,1,'bien vu l\'aveugle ! je vais corriger ça tout de suite !',null);

-- Validation du cours pour dire qu'il est correcte
INSERT INTO validation (id_validator, id_submitter, id_course, status) VALUES
(3, 2, 1, 'validé');

