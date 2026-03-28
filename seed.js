import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pbezubgifitnywglqijc.supabase.co';
const supabaseKey = 'sb_publishable_nFB7Gp8lKWkBgl0MM6atGw_tv6xKWrQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const categoriesData = [
  { name: 'Schule', words: [
    { en: 'Teacher', de: 'Lehrer', phon: 'lee-rer' },
    { en: 'Student', de: 'Schüler', phon: 'shoo-ler' },
    { en: 'School', de: 'Schule', phon: 'shoo-le' },
    { en: 'Book', de: 'Buch', phon: 'booh' },
    { en: 'Pen', de: 'Stift', phon: 'shtift' },
    { en: 'Homework', de: 'Hausaufgaben', phon: 'hows-owf-gah-ben' },
    { en: 'Pencil', de: 'Bleistift', phon: 'bly-shtift' },
    { en: 'Desk', de: 'Schreibtisch', phon: 'shryb-tish' },
    { en: 'Classroom', de: 'Klassenzimmer', phon: 'klas-sen-zim-mer' },
    { en: 'Exam', de: 'Prüfung', phon: 'proo-fung' },
  ]},
  { name: 'Arbeit', words: [
    { en: 'Work', de: 'Arbeit', phon: 'ar-byt' },
    { en: 'Job', de: 'Beruf', phon: 'be-roof' },
    { en: 'Office', de: 'Büro', phon: 'byoo-ro' },
    { en: 'Boss', de: 'Chef', phon: 'shef' },
    { en: 'Colleague', de: 'Kollege', phon: 'kol-lee-ge' },
    { en: 'Meeting', de: 'Besprechung', phon: 'be-shpre-chung' },
    { en: 'Salary', de: 'Gehalt', phon: 'ge-halt' },
    { en: 'Computer', de: 'Computer', phon: 'kom-pyoo-ter' },
    { en: 'Email', de: 'E-Mail', phon: 'ee-mayl' },
    { en: 'Company', de: 'Firma', phon: 'fir-ma' },
  ]},
  { name: 'Küche', words: [
    { en: 'Kitchen', de: 'Küche', phon: 'koo-che' },
    { en: 'Plate', de: 'Teller', phon: 'tel-ler' },
    { en: 'Fork', de: 'Gabel', phon: 'gah-bel' },
    { en: 'Knife', de: 'Messer', phon: 'mes-ser' },
    { en: 'Spoon', de: 'Löffel', phon: 'luhf-fel' },
    { en: 'Pot', de: 'Topf', phon: 'topf' },
    { en: 'Pan', de: 'Pfanne', phon: 'pfan-ne' },
    { en: 'Oven', de: 'Ofen', phon: 'oh-fen' },
    { en: 'Fridge', de: 'Kühlschrank', phon: 'kool-shrank' },
    { en: 'Glass', de: 'Glas', phon: 'glahs' },
  ]},
  { name: 'Familie', words: [
    { en: 'Family', de: 'Familie', phon: 'fa-mee-lee-e' },
    { en: 'Mother', de: 'Mutter', phon: 'moot-ter' },
    { en: 'Father', de: 'Vater', phon: 'fah-ter' },
    { en: 'Brother', de: 'Bruder', phon: 'broo-der' },
    { en: 'Sister', de: 'Schwester', phon: 'shves-ter' },
    { en: 'Grandmother', de: 'Großmutter', phon: 'gros-moot-ter' },
    { en: 'Grandfather', de: 'Großvater', phon: 'gros-fah-ter' },
    { en: 'Child', de: 'Kind', phon: 'kint' },
    { en: 'Aunt', de: 'Tante', phon: 'tan-te' },
    { en: 'Uncle', de: 'Onkel', phon: 'ong-kel' },
  ]},
  { name: 'Essen', words: [
    { en: 'Food', de: 'Essen', phon: 'es-sen' },
    { en: 'Bread', de: 'Brot', phon: 'brot' },
    { en: 'Water', de: 'Wasser', phon: 'vas-ser' },
    { en: 'Apple', de: 'Apfel', phon: 'ap-fel' },
    { en: 'Cheese', de: 'Käse', phon: 'kay-ze' },
    { en: 'Meat', de: 'Fleisch', phon: 'flysh' },
    { en: 'Vegetable', de: 'Gemüse', phon: 'ge-moo-ze' },
    { en: 'Fruit', de: 'Obst', phon: 'opst' },
    { en: 'Coffee', de: 'Kaffee', phon: 'kaf-fee' },
    { en: 'Milk', de: 'Milch', phon: 'milch' },
  ]},
  { name: 'Haushalt', words: [
    { en: 'House', de: 'Haus', phon: 'hows' },
    { en: 'Room', de: 'Zimmer', phon: 'zim-mer' },
    { en: 'Bed', de: 'Bett', phon: 'bet' },
    { en: 'Table', de: 'Tisch', phon: 'tish' },
    { en: 'Chair', de: 'Stuhl', phon: 'shtool' },
    { en: 'Door', de: 'Tür', phon: 'toor' },
    { en: 'Window', de: 'Fenster', phon: 'fen-ster' },
    { en: 'Key', de: 'Schlüssel', phon: 'shloos-sel' },
    { en: 'Living Room', de: 'Wohnzimmer', phon: 'von-zim-mer' },
    { en: 'Bathroom', de: 'Badezimmer', phon: 'bah-de-zim-mer' },
  ]},
  { name: 'Sport', words: [
    { en: 'Sport', de: 'Sport', phon: 'shport' },
    { en: 'Ball', de: 'Ball', phon: 'bal' },
    { en: 'Team', de: 'Mannschaft', phon: 'man-shaft' },
    { en: 'Game', de: 'Spiel', phon: 'shpeel' },
    { en: 'Goal', de: 'Tor', phon: 'tor' },
    { en: 'Player', de: 'Spieler', phon: 'shpee-ler' },
    { en: 'Stadium', de: 'Stadion', phon: 'shtah-dee-on' },
    { en: 'Running', de: 'Laufen', phon: 'low-fen' },
    { en: 'Swimming', de: 'Schwimmen', phon: 'shvim-men' },
    { en: 'Fitness', de: 'Fitness', phon: 'fit-nes' },
  ]},
  { name: 'Einkaufen', words: [
    { en: 'Shopping', de: 'Einkaufen', phon: 'yn-kow-fen' },
    { en: 'Supermarket', de: 'Supermarkt', phon: 'zoo-per-markt' },
    { en: 'Money', de: 'Geld', phon: 'gelt' },
    { en: 'Price', de: 'Preis', phon: 'prys' },
    { en: 'Receipt', de: 'Quittung', phon: 'kvit-toong' },
    { en: 'Bag', de: 'Tasche', phon: 'tah-she' },
    { en: 'Cash Register', de: 'Kasse', phon: 'kas-se' },
    { en: 'Customer', de: 'Kunde', phon: 'koon-de' },
    { en: 'Shop', de: 'Geschäft', phon: 'ge-sheft' },
    { en: 'Expensive', de: 'Teuer', phon: 'toy-er' },
  ]},
  { name: 'Stadt', words: [
    { en: 'City', de: 'Stadt', phon: 'shtat' },
    { en: 'Street', de: 'Straße', phon: 'shtrah-se' },
    { en: 'Car', de: 'Auto', phon: 'ow-to' },
    { en: 'Bus', de: 'Bus', phon: 'boos' },
    { en: 'Train', de: 'Zug', phon: 'tsook' },
    { en: 'Station', de: 'Bahnhof', phon: 'bahn-hof' },
    { en: 'Airport', de: 'Flughafen', phon: 'floog-hah-fen' },
    { en: 'Park', de: 'Park', phon: 'park' },
    { en: 'Church', de: 'Kirche', phon: 'keer-che' },
    { en: 'Hospital', de: 'Krankenhaus', phon: 'kran-ken-hows' },
  ]},
  { name: 'Natur', words: [
    { en: 'Nature', de: 'Natur', phon: 'nah-toor' },
    { en: 'Tree', de: 'Baum', phon: 'bowm' },
    { en: 'Flower', de: 'Blume', phon: 'bloo-me' },
    { en: 'Sun', de: 'Sonne', phon: 'zon-ne' },
    { en: 'Moon', de: 'Mond', phon: 'mont' },
    { en: 'Star', de: 'Stern', phon: 'shtern' },
    { en: 'Water', de: 'Wasser', phon: 'vas-ser' },
    { en: 'Fire', de: 'Feuer', phon: 'foy-er' },
    { en: 'Earth', de: 'Erde', phon: 'er-de' },
    { en: 'Sky', de: 'Himmel', phon: 'him-mel' },
  ]}
];

async function seed() {
  console.log('Starte Seeding-Prozess...');
  
  for (const cat of categoriesData) {
    // 1. Insert Category (user_id = null -> Public)
    const { data: catData, error: catError } = await supabase
      .from('categories')
      .insert([{ name: cat.name }])
      .select()
      .single();
      
    if (catError) {
      console.error(`Fehler bei Kategorie ${cat.name}:`, catError.message);
      continue;
    }
    
    console.log(`Kategorie '${cat.name}' erstellt.`);
    
    // 2. Insert Vocabulary
    const wordsToInsert = cat.words.map(w => ({
      category_id: catData.id,
      german: w.de,
      english: w.en,
      respelling: w.phon
    }));
    
    const { error: vocError } = await supabase
      .from('vocabulary')
      .insert(wordsToInsert);
      
    if (vocError) {
      console.error(`Fehler bei Vokabeln für ${cat.name}:`, vocError.message);
    } else {
      console.log(`  -> ${wordsToInsert.length} Vokabeln eingefügt.`);
    }
  }
  
  console.log('Seeding abgeschlossen! Du kannst nun weitere Wörter über die App hinzufügen.');
}

seed();
