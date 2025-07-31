const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'rage.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error("Ошибка подключения:", err.message);
    console.log("✅ Подключено к SQLite базе данных.");
});

const schemaPath = path.resolve(__dirname, 'database.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema, (err) => {
    if (err) {
        console.error("❌ Ошибка при выполнении database.sql:", err.message);
    } else {
        console.log("✅ Схема базы данных успешно применена.");
    }
});

mp.events.add("server:playerConnect", (player) => {
    const socialclub = player.socialClub || "UNKNOWN";
    const ip = player.ip || "0.0.0.0";

    console.log(`[PACKAGES/SERVER]: Player connect - ${ip} ${socialclub}`);

    db.get(`SELECT id FROM users WHERE socialclub = ?`, [socialclub], (err, row) => {
        if (err) {
            console.error("❌ Ошибка при проверке игрока в БД:", err.message);
        } else if (row) {
            console.log(`⏩ Игрок ${socialclub} уже есть в базе, пропуск добавления.`);
        } else {
            db.run(`INSERT INTO users (socialclub, ip) VALUES (?, ?)`, [socialclub, ip], function (err) {
                if (err) {
                    console.error("❌ Ошибка при добавлении игрока в БД:", err.message);
                } else {
                    console.log(`✅ Игрок ${socialclub} (${ip}) добавлен в базу с ID ${this.lastID}.`);
                }
            });
        }
    });
});
