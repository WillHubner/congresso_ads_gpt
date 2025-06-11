require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const arquivo = require('./rolesGPT.js')

const db = new sqlite3.Database('db/banco.db');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API do ChatGPT funcionando!');
});

app.post('/pergunta', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem é obrigatória.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: arquivo.gerarPrompt(message),
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const reply = response.data.choices[0].message.content.trim();    

    db.all(reply, [], (err, rows) => {
        if (err) {
        console.error('Erro ao executar SQL:', err.message);
        return res.status(500).json({ error: 'Erro ao executar SQL.', detalhes: err.message });
        }
        res.json({ response: reply, resultados: rows });
    });    

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao conectar com o ChatGPT' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
