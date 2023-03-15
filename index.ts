import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Auth Service Running');
});

app.post('/login',(req: Request, res: Response) => {
    //TODO
});

app.post('/signup',(req: Request, res: Response) => {
    //TODO
});

app.listen(port, () => {
  console.log(`Auth Service is running at http://localhost:${port}`);
});