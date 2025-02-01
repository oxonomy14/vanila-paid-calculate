const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'cron-test.log');
const logMessage = `[${new Date().toISOString()}] ✅ CRON запущен!\n`;

fs.appendFileSync(logFile, logMessage, 'utf8');

console.log('✅ Тестовый CRON-запуск записан в', logFile);
