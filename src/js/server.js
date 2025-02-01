import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Прокси запросов к vipchanger.com
app.get('/proxy/exprates', async (req, res) => {
  try {
    const response = await axios.get(
      'https://vipchanger.com/res/xml/exprates.xml'
    );
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем доступ
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Ошибка при получении данных с vipchanger.com');
  }
});

app.listen(port, () => {
  console.log(`Прокси сервер запущен на http://localhost:${port}`);
});
