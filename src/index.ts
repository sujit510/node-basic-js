import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Response, Request } from 'express';

// @ts-ignore
const app: Express = express();
const port = process.env.APP_PORT || 8000;

/**
 * NOTE:
 * body-parser is an NPM package that parses incoming request bodies in a middleware before 
 * your handlers, available under the req.body property. 
 * app.use(bp.json()) looks at requests where the Content-Type: application/json header is present and
 * transforms the text-based JSON input into JS-accessible variables under req.body. 
 * app.use(bp.urlencoded({extended: true}) does the same for URL-encoded requests. 
 * the extended: true precises that the req.body object will contain values of any type instead of just strings.
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  return res.send('Hello World with Nodemon+TS!')
  // Alternate-1:
  // return res.status(200).send('Hello World with Nodemon+TS!')
});

// Sample req: POST http://localhost:8000/rParam/thisIsRouteParamaValue?sampleQueryParam=sampleQueryParamValue
app.post('/rParam/:rParam', (req: Request, res: Response) => {
  // Alternate-2:
  res.send({
    message: 'This is JSON for POST req',
    requestBody: req.body,
    requestParam: req.params,
    requestQuery: req.query
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
