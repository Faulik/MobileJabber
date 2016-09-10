// import Primus from 'primus';

import * as actions from '../actions';
import { store } from '../../index.android';

// const socket = new Primus('91.214.69.122:5222');
//
// socket.send(
//   'xmpp.login',
//   {
//     jid: 'faul@aionlegend.ru',
//     password: 'password',
//   }
// );
//
// socket.on('xmpp.connection', (data) => {
//   console.log('Connected as', data.jid)
// });

import XMPP from 'stanza.io';

// const client = XMPP.createClient({
//   jid: 'faul@aionlegend.ru',
//   password: 'nniikk',
//   timeout: 10,
//   transport: 'bosh',
//   // transport: 'websocket',
//   boshURL: 'https://aionlegend.ru',
//   // (or `boshURL` if using 'bosh' as the transport)
// });

// const client = XMPP.createClient({
//   jid: 'anon@anon.lance.im',
//   transport: 'bosh',
//   boshURL: 'https://lance.im/http-bind',
//   // (or `boshURL` if using 'bosh' as the transport)
// });

var client = XMPP.createClient({
    jid: 'anon@anon.lance.im',
    transport: 'bosh',
    boshURL: 'http://lance.im/http-bind'
});

// var client = XMPP.createClient({
//   jid: 'anon@anon.lance.im',
//   transport: 'websocket',
//   wsURL: 'wss://lance.im/xmpp-websocket'
// });

client.on('session:started', () => {
  console.log('connected')
  client.getRoster();
  client.sendPresence();
});

client.on('roster:update', (msg) => {
  store.dispatch(actions.rosterUpdate(msg));
});

client.on('muc:available', (msg) => {
  store.dispatch(actions.mucAvailable(msg));
});

client.on('muc:declined', (msg) => {
  store.dispatch(actions.mucDeclined(msg));
});

client.on('muc:error', (msg) => {
  store.dispatch(actions.mucError(msg));
});
client.on('muc:invite', (msg) => {
  store.dispatch(actions.mucInvite(msg));
});

client.on('muc:join', (msg) => {
  store.dispatch(actions.mucJoin(msg));
});

client.on('muc:leave', (msg) => {
  store.dispatch(actions.mucLeave(msg));
});

client.on('muc:subject', (msg) => {
  store.dispatch(actions.mucSubject(msg));
});

client.on('muc:unavailable', (msg) => {
  store.dispatch(actions.mucUnavailable(msg));
});

client.on('muc:destroyed', (msg) => {
  store.dispatch(actions.mucDestroyed(msg));
});


client.connect();
console.log('connect');

client.on('auth:failed', (msg) => {
  console.log('failed')
});
client.on('disconnected', (msg) => {
  console.log('disconnected')
  console.log(msg)
});

client.on('*', (msg, data) => {
  console.log('raw:incoming')
  console.log(msg)
  console.log(data)
});

export const connect = (room, nick, password) =>
  new Promise((resolve, reject) => {
    client.connect()
    resolve();
  })
  .then(
    response => ({ response }),
    error => ({ error: error.message || 'Something bad happened' })
  );

export const joinRoom = (room, nick, password) =>
  new Promise((resolve, reject) => {
    client.joinRoom(room, nick, { joinMuc: { password } });
    resolve();
  })
  .then(
    response => ({ response }),
    error => ({ error: error.message || 'Something bad happened' })
  );
