import app from './app.js';
import 'dotenv/config'

//console.log(process.env.DATABASE);
app.listen(app.get('port'));

console.log(`server on port ${app.get('port')}`);