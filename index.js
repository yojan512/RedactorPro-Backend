const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/redactar', (req, res) => {
  const { texto, categoria, formato } = req.body;

  // Simulación sin usar IA real
  const respuesta = `🧠 Redacción simulada desde el backend:

Formato: ${formato}
Categoría: ${categoria}
Texto base: "${texto}"

Resultado generado: Este es un texto simulado generado desde el servidor.`;

  res.json({ resultado: respuesta });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en el puerto ${PORT}`);
});
