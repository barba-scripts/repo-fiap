const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*/', (req, res, next) => {
  const indexPath = path.join(__dirname, req.path, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

app.get('*', (req, res, next) => {
  const filePath = path.join(__dirname, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>404 - Página não encontrada</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .error-container {
              text-align: center;
            }
            h1 { font-size: 4em; margin: 0; }
            p { font-size: 1.5em; }
            a { color: white; text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>404</h1>
            <p>Página não encontrada</p>
            <a href="/">← Voltar para a página inicial</a>
          </div>
        </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Servindo arquivos de: ${__dirname}`);
});

