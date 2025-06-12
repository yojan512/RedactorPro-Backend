const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar cliente OpenAI con la clave del .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/redactar', async (req, res) => {
  const { texto, categoria, formato } = req.body;

  try {
    const prompt = `Redacta un texto en formato ${formato}, para la categoría ${categoria}, basado en: "${texto}"`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Imprimir la respuesta completa en la consola
    console.log("🧠 Respuesta completa de OpenAI:", JSON.stringify(response, null, 2));

    const resultado = response?.choices?.[0]?.message?.content?.trim();

    if (!resultado) {
      console.error("⚠️ La respuesta de OpenAI no contiene texto válido.");
      return res.status(500).json({ error: "No se pudo generar el texto." });
    }

    res.json({ resultado });

  } catch (error) {
    console.error("❌ Error al generar texto:", error.message);
    res.status(500).json({ error: "Fallo al generar el texto." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en el puerto ${PORT}`);
});
