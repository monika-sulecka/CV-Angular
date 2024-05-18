import 'zone.js/node';
import express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { join } from 'path';
import { existsSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';
import createApplication from './src/main.server';

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/personal-website/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.engine('html', (filePath, options: any, callback) => {
    ngExpressEngine({
      bootstrap: createApplication as any,
      providers: [{ provide: APP_BASE_HREF, useValue: options.req.baseUrl }]
    })(filePath, options, callback);
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req: express.Request, res: express.Response) => {
    res.render(indexHtml, { req });
  });

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
