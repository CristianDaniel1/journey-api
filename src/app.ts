import { CLIENT_PATH, PORT } from './config/envs';
import { AppRoutes } from './routes/routes';
import { Server } from './server';

function main() {
  console.log('main');

  const server = new Server({
    port: PORT,
    routes: AppRoutes.routes,
    clientPath: CLIENT_PATH,
  });

  server.start();
}

(async () => {
  main();
})();
