import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend running on PORT:${PORT}`);
})

app.get('/', (req: Request, res: Response) => {
    console.log('Accessed route "/"');
    res.send('Response from /');
})
