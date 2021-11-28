import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Home } from './src/pages/Home';

const app = express();

// Por defecto si express esta sirviendo una carpeta estatica y ve que hay un index, y que el usuario esta intentando cargar data de el, inmediatamente envia el index
app.use(express.static('./build', { index: false }));

// Todas las rutas devolvera el HTML
app.get('/*', (req, res) => {
  // render es una funcion a la que le podemos pasar jsx y lo renderizara como html
  const reactApp = renderToString(<Home />);

  return res.send(`
    <html>
      <body>
        <div id="root">${reactApp}</div>
      </body>
    </html>
    `);
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
