import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import config from '../src/config';
import * as actions from './actions/index';
import {checkAuth, mapUrl} from 'utils';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import mongoose from 'mongoose';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

//Connect to mongodb
const connect = () => {
  let options = {
    server: { socketOptions: { keepAlive: 1 } }
  };
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(busboy());

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const {action, params} = mapUrl(actions, splittedUrlPath);
  checkAuth(req, splittedUrlPath).then(() => {
    if (action) {
      action(req, params)
        .then((result) => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        }, (reason) => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            console.error('API ERROR:', pretty.render(reason));
            res.status(reason.status || 500).json(reason);
          }
        });
    } else {
      res.status(404).end('NOT FOUND');
    }
  }, (result) => {
    console.error('API ERROR:', pretty.render(result));
    res.status(500).json({
      status: 500, error: result.message
    });
  })

});


if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  const Chat = require('./db/chat');
  const User = require('./db/user');

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', (criteria) => {
      Chat.list({
        criteria
      }, (err, chats) => {
        chats.forEach((chat) => {
          socket.emit('msg', chat);
        })
      });
    });

    socket.on('msg', (data) => {
      const chat = new Chat(data);
      chat.save((err, chatObj) => {
        if(err) {
          return io.emit('error', err);
        }
        Chat.populate(chatObj, [{
          path: 'user',
          select: 'name'
        }], (err, chatPop) => {
          if(err) {
            return io.emit('error', err);
          } else {
            io.emit('msg', chatObj.populate('user', 'name'));
          }
        })

      });
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
