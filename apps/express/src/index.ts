import express from 'express';
import { Express, Request, Response } from 'express';
import { logger } from "logger";


const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server');
});

const port = 4000;
app.listen(port, () => {
  logger.info(`Express server is running at http://localhost:${port}`);
});
