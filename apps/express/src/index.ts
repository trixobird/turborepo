import express from 'express';
import { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server');
});

const port = 4000;
app.listen(port, () => {
});
