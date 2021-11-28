import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './src/App';

const app = express();

// Por defecto si express esta sirviendo una carpeta estatica y ve que hay un index, y que el usuario esta intentando cargar data de el, inmediatamente envia el index
app.use(express.static('./build', { index: false }));

// Todas las rutas devolvera el HTML
app.get('/*', (req, res) => {
  // render es una funcion a la que le podemos pasar jsx y lo renderizara como html
  const reactApp = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  // Load el index.html
  const templateFile = path.resolve('./build/index.html');
  // Load la data
  fs.readFile(templateFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Devolvemos el contenido del templateFile con el div reemplazado por nuestra app
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
