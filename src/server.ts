import express, { Router } from 'express';

interface ServerOptions {
  port: number;
  routes: Router;
  clientPath: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly clientPath: string;

  constructor(options: ServerOptions) {
    const { port, routes, clientPath } = options;
    this.port = port;
    this.routes = routes;
    this.clientPath = clientPath;
  }

  async start() {
    this.app.use(this.routes);

    this.app.use(express.static(this.clientPath));

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
