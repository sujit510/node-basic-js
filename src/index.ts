import express from 'express';

// @ts-ignore
const app: any = express();
const port: any = 8000;

app.get('/', (req: any, res: any) => {
  res.send('Hello World with Nodemon+TS!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
