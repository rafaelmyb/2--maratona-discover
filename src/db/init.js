const Database = require("./config");

// Para se utilizar um await, é necessário colocar tudo dentro de um async
// O async fala para o js que dentro da estrutura criada, haverão await´s,
// então ele vai ter que esperar

const initDb = {
    async init() {

// Inicia a conexão com o banco
const db = await Database()

// cria algo no banco
await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);

await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at INT
)`);

// roda algo no banco
await db.run(`INSERT INTO profile (
    name, 
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "Rafael Yamada",
    "https://github.com/rafaelmyb.png",
    3000,
    5,
    5,
    4,
    70
);`)

await db.run(`INSERT INTO jobs (
    name, 
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
);`)

await db.run(`
INSERT INTO jobs (
    name, 
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Projects",
    3,
    47,
    1617514376018
);`)


// Finaliza a conexão com o banco
await db.close();

    }
}


initDb.init()