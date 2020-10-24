const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const logger = require('./middlewares/loggerInfo');
const userRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const messageRoutes = require('./routes/message');
const conversationRoutes = require('./routes/conversations');
const connectDb = require('./configuration/mongoDb');
const corsOptions = { origin: "http://localhost:3000" }
const port = process.env.PORT;

connectDb();
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(userRoutes);
app.use(contactRoutes);
app.use(messageRoutes);
app.use(conversationRoutes);

io.on("connection", socket => {
    logger.info('New client on our server');
    socket.on('login', params => {
        const {token} = params;
        jwt.verify(token,'specialvisiontoken', async (err,decodedData) => {
            if(err){
                logger.info('There is invalid data token')
                socket.emit('login-error')
            } else{
                const {nickname,_id} = decodedData;
                await User.findOne({nickname,_id}, (err,user) => {
                    if(error){
                        socket.emit('login-error');
                    }

                    if(user){
                        socket.join(`${_id}`)
                    }
                })
            }
        })
    })

    socket.on('disconnect', () => {
        logger.info('Client is disconncted')
    })
})

server.listen(port, () =>
  console.log(`VisoChat app is listening on port ${port}!`)
);