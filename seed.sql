-- Start Seed

-- Kategorie: Schule
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Schule', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Teacher', 'Lehrer', 'lee-rer'),
((SELECT id FROM cat), NULL, 'Student', 'Schüler', 'shoo-ler'),
((SELECT id FROM cat), NULL, 'School', 'Schule', 'shoo-le'),
((SELECT id FROM cat), NULL, 'Book', 'Buch', 'booh'),
((SELECT id FROM cat), NULL, 'Pen', 'Stift', 'shtift'),
((SELECT id FROM cat), NULL, 'Homework', 'Hausaufgaben', 'hows-owf-gah-ben'),
((SELECT id FROM cat), NULL, 'Pencil', 'Bleistift', 'bly-shtift'),
((SELECT id FROM cat), NULL, 'Desk', 'Schreibtisch', 'shryb-tish'),
((SELECT id FROM cat), NULL, 'Classroom', 'Klassenzimmer', 'klas-sen-zim-mer'),
((SELECT id FROM cat), NULL, 'Exam', 'Prüfung', 'proo-fung');

-- Kategorie: Arbeit
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Arbeit', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Work', 'Arbeit', 'ar-byt'),
((SELECT id FROM cat), NULL, 'Job', 'Beruf', 'be-roof'),
((SELECT id FROM cat), NULL, 'Office', 'Büro', 'byoo-ro'),
((SELECT id FROM cat), NULL, 'Boss', 'Chef', 'shef'),
((SELECT id FROM cat), NULL, 'Colleague', 'Kollege', 'kol-lee-ge'),
((SELECT id FROM cat), NULL, 'Meeting', 'Besprechung', 'be-shpre-chung'),
((SELECT id FROM cat), NULL, 'Salary', 'Gehalt', 'ge-halt'),
((SELECT id FROM cat), NULL, 'Computer', 'Computer', 'kom-pyoo-ter'),
((SELECT id FROM cat), NULL, 'Email', 'E-Mail', 'ee-mayl'),
((SELECT id FROM cat), NULL, 'Company', 'Firma', 'fir-ma');

-- Kategorie: Küche
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Küche', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Kitchen', 'Küche', 'koo-che'),
((SELECT id FROM cat), NULL, 'Plate', 'Teller', 'tel-ler'),
((SELECT id FROM cat), NULL, 'Fork', 'Gabel', 'gah-bel'),
((SELECT id FROM cat), NULL, 'Knife', 'Messer', 'mes-ser'),
((SELECT id FROM cat), NULL, 'Spoon', 'Löffel', 'luhf-fel'),
((SELECT id FROM cat), NULL, 'Pot', 'Topf', 'topf'),
((SELECT id FROM cat), NULL, 'Pan', 'Pfanne', 'pfan-ne'),
((SELECT id FROM cat), NULL, 'Oven', 'Ofen', 'oh-fen'),
((SELECT id FROM cat), NULL, 'Fridge', 'Kühlschrank', 'kool-shrank'),
((SELECT id FROM cat), NULL, 'Glass', 'Glas', 'glahs');

-- Kategorie: Familie
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Familie', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Family', 'Familie', 'fa-mee-lee-e'),
((SELECT id FROM cat), NULL, 'Mother', 'Mutter', 'moot-ter'),
((SELECT id FROM cat), NULL, 'Father', 'Vater', 'fah-ter'),
((SELECT id FROM cat), NULL, 'Brother', 'Bruder', 'broo-der'),
((SELECT id FROM cat), NULL, 'Sister', 'Schwester', 'shves-ter'),
((SELECT id FROM cat), NULL, 'Grandmother', 'Großmutter', 'gros-moot-ter'),
((SELECT id FROM cat), NULL, 'Grandfather', 'Großvater', 'gros-fah-ter'),
((SELECT id FROM cat), NULL, 'Child', 'Kind', 'kint'),
((SELECT id FROM cat), NULL, 'Aunt', 'Tante', 'tan-te'),
((SELECT id FROM cat), NULL, 'Uncle', 'Onkel', 'ong-kel');

-- Kategorie: Essen
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Essen', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Food', 'Essen', 'es-sen'),
((SELECT id FROM cat), NULL, 'Bread', 'Brot', 'brot'),
((SELECT id FROM cat), NULL, 'Water', 'Wasser', 'vas-ser'),
((SELECT id FROM cat), NULL, 'Apple', 'Apfel', 'ap-fel'),
((SELECT id FROM cat), NULL, 'Cheese', 'Käse', 'kay-ze'),
((SELECT id FROM cat), NULL, 'Meat', 'Fleisch', 'flysh'),
((SELECT id FROM cat), NULL, 'Vegetable', 'Gemüse', 'ge-moo-ze'),
((SELECT id FROM cat), NULL, 'Fruit', 'Obst', 'opst'),
((SELECT id FROM cat), NULL, 'Coffee', 'Kaffee', 'kaf-fee'),
((SELECT id FROM cat), NULL, 'Milk', 'Milch', 'milch');

-- Kategorie: Haushalt
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Haushalt', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'House', 'Haus', 'hows'),
((SELECT id FROM cat), NULL, 'Room', 'Zimmer', 'zim-mer'),
((SELECT id FROM cat), NULL, 'Bed', 'Bett', 'bet'),
((SELECT id FROM cat), NULL, 'Table', 'Tisch', 'tish'),
((SELECT id FROM cat), NULL, 'Chair', 'Stuhl', 'shtool'),
((SELECT id FROM cat), NULL, 'Door', 'Tür', 'toor'),
((SELECT id FROM cat), NULL, 'Window', 'Fenster', 'fen-ster'),
((SELECT id FROM cat), NULL, 'Key', 'Schlüssel', 'shloos-sel'),
((SELECT id FROM cat), NULL, 'Living Room', 'Wohnzimmer', 'von-zim-mer'),
((SELECT id FROM cat), NULL, 'Bathroom', 'Badezimmer', 'bah-de-zim-mer');

-- Kategorie: Sport
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Sport', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Sport', 'Sport', 'shport'),
((SELECT id FROM cat), NULL, 'Ball', 'Ball', 'bal'),
((SELECT id FROM cat), NULL, 'Team', 'Mannschaft', 'man-shaft'),
((SELECT id FROM cat), NULL, 'Game', 'Spiel', 'shpeel'),
((SELECT id FROM cat), NULL, 'Goal', 'Tor', 'tor'),
((SELECT id FROM cat), NULL, 'Player', 'Spieler', 'shpee-ler'),
((SELECT id FROM cat), NULL, 'Stadium', 'Stadion', 'shtah-dee-on'),
((SELECT id FROM cat), NULL, 'Running', 'Laufen', 'low-fen'),
((SELECT id FROM cat), NULL, 'Swimming', 'Schwimmen', 'shvim-men'),
((SELECT id FROM cat), NULL, 'Fitness', 'Fitness', 'fit-nes');

-- Kategorie: Einkaufen
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Einkaufen', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Shopping', 'Einkaufen', 'yn-kow-fen'),
((SELECT id FROM cat), NULL, 'Supermarket', 'Supermarkt', 'zoo-per-markt'),
((SELECT id FROM cat), NULL, 'Money', 'Geld', 'gelt'),
((SELECT id FROM cat), NULL, 'Price', 'Preis', 'prys'),
((SELECT id FROM cat), NULL, 'Receipt', 'Quittung', 'kvit-toong'),
((SELECT id FROM cat), NULL, 'Bag', 'Tasche', 'tah-she'),
((SELECT id FROM cat), NULL, 'Cash Register', 'Kasse', 'kas-se'),
((SELECT id FROM cat), NULL, 'Customer', 'Kunde', 'koon-de'),
((SELECT id FROM cat), NULL, 'Shop', 'Geschäft', 'ge-sheft'),
((SELECT id FROM cat), NULL, 'Expensive', 'Teuer', 'toy-er');

-- Kategorie: Stadt
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Stadt', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'City', 'Stadt', 'shtat'),
((SELECT id FROM cat), NULL, 'Street', 'Straße', 'shtrah-se'),
((SELECT id FROM cat), NULL, 'Car', 'Auto', 'ow-to'),
((SELECT id FROM cat), NULL, 'Bus', 'Bus', 'boos'),
((SELECT id FROM cat), NULL, 'Train', 'Zug', 'tsook'),
((SELECT id FROM cat), NULL, 'Station', 'Bahnhof', 'bahn-hof'),
((SELECT id FROM cat), NULL, 'Airport', 'Flughafen', 'floog-hah-fen'),
((SELECT id FROM cat), NULL, 'Park', 'Park', 'park'),
((SELECT id FROM cat), NULL, 'Church', 'Kirche', 'keer-che'),
((SELECT id FROM cat), NULL, 'Hospital', 'Krankenhaus', 'kran-ken-hows');

-- Kategorie: Natur
WITH cat AS (INSERT INTO categories (name, user_id) VALUES ('Natur', NULL) RETURNING id)
INSERT INTO vocabulary (category_id, user_id, english, german, respelling) VALUES 
((SELECT id FROM cat), NULL, 'Nature', 'Natur', 'nah-toor'),
((SELECT id FROM cat), NULL, 'Tree', 'Baum', 'bowm'),
((SELECT id FROM cat), NULL, 'Flower', 'Blume', 'bloo-me'),
((SELECT id FROM cat), NULL, 'Sun', 'Sonne', 'zon-ne'),
((SELECT id FROM cat), NULL, 'Moon', 'Mond', 'mont'),
((SELECT id FROM cat), NULL, 'Star', 'Stern', 'shtern'),
((SELECT id FROM cat), NULL, 'Water', 'Wasser', 'vas-ser'),
((SELECT id FROM cat), NULL, 'Fire', 'Feuer', 'foy-er'),
((SELECT id FROM cat), NULL, 'Earth', 'Erde', 'er-de'),
((SELECT id FROM cat), NULL, 'Sky', 'Himmel', 'him-mel');
