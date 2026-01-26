
/* --- MOCK DATA BASED ON USER CSV FILES --- */

export const MARCAS = [
    "BAIC", "Brilliance", "BYD", "Changan", "Chery", "Chevrolet", "DFM", "DFSK", "Dongfeng", "FAW", "Foton", "GAC Gonow", "Geely", "Great Wall", "Hafei", "Haima", "Haval", "JAC", "Jetour", "Jinbei", "JMC", "Karry", "KYC", "Lifan", "Mahindra", "Maxus", "MG", "Omoda", "Suzuki", "Yuejin", "Zotye", "ZX Auto"
];

export const MODELOS = {
    "BAIC": ["Plus", "X25", "X35", "New X35"],
    "Brilliance": ["FRV", "FSV", "H220", "H230", "Konect", "Konect Turbo", "Splendor", "T30 / T32", "V3", "V5", "X30"],
    "BYD": ["F0", "F3", "New F3", "F3R", "G3", "S6"],
    "Changan": ["Alsvin", "Alsvin Aut", "Benni", "CM10", "CM5", "CS1", "CS1 Cross", "CS15 VVT", "New CS15", "CS35", "New CS35", "CS35 Plus", "New CS35 Plus Aut", "CS55 Turbo", "CS75", "CS75 VVT", "CV1", "CV2", "CX70 Turbo", "CX70 VVT", "Eado", "Hunter", "M201", "MD201", "MD301", "MS201", "MS301", "S100", "New S100", "S200", "New S200", "S300", "New S300"],
    "Chery": ["A516", "Arrizo 3", "Arrizo 5", "Beat", "Destiny", "Face", "Fulwin HB", "Fulwin 2 HB", "Fulwin Sedan", "Fulwin 2 Sedan", "Grand Tiggo", "New Grand Tiggo", "IQ", "K60", "New Tiggo", "S21", "Skin", "Tiggo", "Tiggo 2 Pro", "Tiggo 2 Pro Max", "Tiggo 2 VVT", "Tiggo 3", "New Tiggo 3", "Tiggo 3 Pro", "Tiggo 4", "Tiggo 5", "Tiggo 7", "Tiggo 7 Pro Turbo", "Tiggo 8 Pro Turbo", "Tiggo 8 Turbo", "New Tiggo 8"],
    "Chevrolet": ["Captiva", "Captiva Turbo", "Grove", "N300 Max", "New N300 Max", "N300 Work", "N400", "Sail", "New Sail", "Spark GT"],
    "DFM": ["A30", "AX3", "AX4", "Cargo Van", "H30", "Joyear S500", "Joyear X3", "Joyear XL", "S30", "S50", "SX5", "SX6"],
    "DFSK": ["580", "C21", "C22", "C31", "C32", "C37", "Cargo Truck Serie V", "Cargo Van C25"],
    "Dongfeng": ["DF2500 VVT", "DF2900 VVT"],
    "FAW": ["Mamut T80 / V80"],
    "Foton": ["Aumark 613", "Aumark 613 Euro IV", "BJ1027", "K1", "Midi", "Midi Cargo", "Midi Cargo Van", "Midi Cargo 1.5cc", "Midi Truck", "New Midi Truck", "OLN", "Terracota", "TM3", "View"],
    "GAC Gonow": ["Way"],
    "Geely": ["CK (Old)", "New CK", "Coolray Turbo Aut", "New Coolray Turbo", "Emgrand EC7", "Emgrand X7 Sport", "GC5", "LC", "LC Cross", "MK RSI", "MK Sedan"],
    "Great Wall": ["Deer", "Florid Cross VVT", "Florid LE", "Haval 3 (Old)", "New Haval H3", "Haval 5", "Haval 6 (Old)", "New Haval H6", "Haval 7", "Haval H2", "Hover", "M4", "Poer MT", "Poer Plus Turbo Aut", "Safe", "Socool", "Voleex C10", "Voleex C20", "Voleex C30 (Neblinero LED)", "Voleex C30 (Neblinero Redondo)", "Voleex C30 Plus (Doble Neblinero)", "Voleex C50", "Wingle", "Wingle 5", "New Wingle 5", "Wingle 6", "Wingle 7"],
    "Hafei": ["Minyi Cargo", "Minyi Pick-Up", "Ruiyi", "Zhongi"],
    "Haima": ["F-Star", "Haima 2", "Haima 3"],
    "Haval": ["Haval 6 (Old)", "Jolion Turbo", "New Haval H3"],
    "JAC": ["A137 Sedan", "A137 Sport (No VVT)", "A137 Sport (No VVT) - Mitsubishi", "A137 Sport VVT", "Grand S3", "HFC1035", "J2 (3 Cilindros)", "J4", "J5 (B-CLS)", "J6 Cross", "JS2", "JS3", "JS4", "Refine Bencinera", "Refine Diesel", "Refine M4 Turbo Diesel", "New Refine VVT", "Rein", "Rein 4x2", "S2", "S3", "S5 Con Turbo", "S5 Sin Turbo", "Sunray", "Sunray (Motor Cummins)", "Sunray (Motor JAC)", "T6 Bencinero VVT", "T6 Diesel", "T8 Turbo Diesel", "T9 Diesel 4x4", "Urban 1040", "Urban 1042", "Urban 1061", "Urban 1083", "Urban 1035", "X200 Diesel (Euro 5)"],
    "Jetour": ["Dashing", "X70", "X70 Plus Aut"],
    "Jinbei": ["Haise Bencinero", "Haise Diesel"],
    "JMC": ["Carrying", "Convey", "Grand Avenue Turbo Diesel 4x2", "New Vigus Work Turbo Euro 6", "Vigus 5", "Vigus Plus", "Vigus Work"],
    "Karry": ["Q22"],
    "KYC": ["T3 Gran Mamut", "X5", "X5 Plus"],
    "Lifan": ["320", "330", "520", "530", "620", "Foison", "Foison One", "Furgon", "Pick Up", "Van", "X60", "X7"],
    "Mahindra": ["KUV 100", "New Pick Up", "Pick Up (Old)", "Pick Up Euro V", "Scorpio Mawk", "XUV 500", "New XUV 500"],
    "Maxus": ["C35", "C35-L", "Deliver 9 / V9 Cargo Diesel", "Deliver 9 / V9 Pasajeros Diesel", "EV30 Aut (Electrico)", "G10 (Ejecutiva)", "G10 (Ejecutiva) Tubo Diesel", "G10 Cargo Turbo Diesel", "New T60", "T60", "T80", "T90 Bi-Turbo", "V80 Escolar", "V80 Pasajeros"],
    "MG": ["350", "360", "550", "GS", "GT Turbo", "New GT Turbo", "HS Turbo", "MG3", "New MG3 Hybrid", "MG3 Cross", "New MG5", "MG6", "One Aut", "RX5 Turbo", "ZS", "ZX", "ZX Turbo"],
    "Omoda": ["C5 Aut"],
    "Suzuki": ["Alto 1000", "Alto 800", "Baleno", "Celerio", "K10", "Swift", "SX4"],
    "Yuejin": ["1.042"],
    "Zotye": ["Hunter", "New Hunter"],
    "ZX Auto": ["Admiral (Old)", "New Admiral", "Grand Tigger", "New Grand Tigger", "New TUV", "Terralord Turbo Diesel", "TUV Grand Tigger"]
};

export const CATEGORIAS = [
    { id: 'aceite-motor', name: 'Aceite Motor', icon: '🛢️', image: '/images/categorias/aceite-motor.jpeg' },
    { id: 'caja-cambio', name: 'Caja de Cambio', icon: '⚙️', image: '/images/categorias/transmision-cat.jpeg' },
    { id: 'carroceria', name: 'Carrocería', icon: '🚗', image: '/images/categorias/carroceria-cat.jpeg' },
    { id: 'correas', name: 'Correas', icon: '⛓️', image: '/images/categorias/correas-cat.jpeg' },
    { id: 'direccion-suspension', name: 'Dirección y Suspensión', icon: '🚙', image: '/images/categorias/suspension-cat.jpeg' },
    { id: 'electricos', name: 'Eléctricos', icon: '⚡', image: '/images/categorias/electricos-cat.jpeg' },
    { id: 'embrague', name: 'Embrague', icon: '🔧', image: '/images/categorias/embragues-cat.jpeg' },
    { id: 'encendido', name: 'Encendido', icon: '🔥', image: '/images/categorias/encendido-cat.jpeg' },
    { id: 'filtros', name: 'Filtros', icon: '🛁', image: '/images/categorias/filtros-cat.jpeg' },
    { id: 'focos', name: 'Focos', icon: '💡', image: '/images/categorias/focos-cat.jpeg' },
    { id: 'frenos', name: 'Frenos', icon: '🛑', image: '/images/categorias/frenos-cat.jpeg' },
    { id: 'inyeccion', name: 'Inyección', icon: '💉', image: '/images/categorias/inyeccion-cat.jpeg' },
    { id: 'motor', name: 'Motor', icon: '🔩', image: '/images/categorias/motor-cat.jpeg' },
    { id: 'plumillas', name: 'Plumillas', icon: '🌧️', image: '/images/categorias/plumillas-cat.jpeg' },
    { id: 'refrigeracion', name: 'Refrigeración y Ventilación', icon: '❄️', image: '/images/categorias/refrigeracion-cat.jpeg' },
    { id: 'rodamiento', name: 'Rodamiento', icon: '◎', image: '/images/categorias/rodamientos-cat.jpeg' },
    { id: 'rueda', name: 'Rueda', icon: '🔘', image: '/images/categorias/rueda-cat.jpeg' },
    { id: 'sensores', name: 'Sensores', icon: '📡', image: '/images/categorias/sensores-cat.jpeg' },
];

// Sample products based on the CSV files uploaded
export const PRODUCTOS_BASE = [
    { id: 1, nombre: "Filtro de Aceite JAC T6 Diesel", sku: "JTC133RC", precio: 12990, categoria: "filtros", marca: "JAC", modelo: "T6", img: "🛢️" },
    { id: 2, nombre: "Pastilla Freno Delantera MG ZS", sku: "M4258RC", precio: 24500, categoria: "frenos", marca: "MG", modelo: "ZS", img: "🛑" },
    { id: 3, nombre: "Kit Embrague Chery Tiggo 2", sku: "TX715RC", precio: 89900, categoria: "embrague", marca: "Chery", modelo: "Tiggo 2", img: "⚙️" },
    { id: 4, nombre: "Amortiguador Delantero Great Wall M4", sku: "GW-M4-001", precio: 45000, categoria: "direccion-suspension", marca: "Great Wall", modelo: "M4", img: "🔩" },
    { id: 5, nombre: "Bomba de Agua Changan CS15", sku: "BA1828RC", precio: 32000, categoria: "refrigeracion", marca: "Changan", modelo: "CS15", img: "💧" },
    { id: 6, nombre: "Óptico Derecho Brilliance H230", sku: "BL015RC", precio: 65000, categoria: "carroceria", marca: "Brilliance", modelo: "H230", imageSrc: "/repuesto-foco-haval.jpg", img: "💡" },
    { id: 7, nombre: "Bobina Encendido Haval H6 1.5", sku: "F01R00A052", precio: 28900, categoria: "electricos", marca: "Haval", modelo: "H6", img: "⚡" },
    { id: 8, nombre: "Disco de Freno Maxus T60", sku: "MAXT537RC", precio: 38900, categoria: "frenos", marca: "Maxus", modelo: "T60", img: "💿" },
    { id: 9, nombre: "Radiador Motor Chery Arrizo 3", sku: "J52-52051", precio: 55000, categoria: "refrigeracion", marca: "Chery", modelo: "Arrizo 3", img: "🌡️" },
    { id: 10, nombre: "Sensor Oxígeno DFSK 580", sku: "SMW251370", precio: 42000, categoria: "electricos", marca: "DFSK", modelo: "580", img: "🔌" },
    { id: 11, nombre: "Aceite 5W30 Sintético Ravenol 4L", sku: "RAV-5W30", precio: 36900, categoria: "aceite-motor", marca: "Universal", modelo: "Universal", img: "🛢️" },
    { id: 12, nombre: "Filtro Aire MG ZX 1.5", sku: "M3716RC", precio: 9900, categoria: "filtros", marca: "MG", modelo: "ZX", img: "💨" }
];
