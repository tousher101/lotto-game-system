require('dotenv').config();
const express = require('express')
const app = express()
const cors=require('cors')
const compression=require('compression')
const cookieParser=require('cookie-parser')

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true, limit: '50mb'}));
app.use(compression());



app.use('/api/auth', require('./src/routers/router.auth'));
app.use('/api/admin',require('./src/routers/router.admin'));
app.use('/api/oparetor',require('./src/routers/router.oparetor'));
app.use('/api/agent',require('./src/routers/router.agent'));
app.use('/api/cashier',require('./src/routers/router.cashier'))



const port = process.env.PORT || 5000



app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
