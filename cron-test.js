import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Определяем __dirname (в ESM его нет)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к лог-файлу в public/
const logFile = path.join(__dirname, '../public/cron-test.log');
const logMessage = `[${new Date().toISOString()}] ✅ CRON запущен!\n`;

// Запись в файл
fs.appendFileSync(logFile, logMessage, 'utf8');

console.log('✅ Тестовый CRON-запуск записан в', logFile);
