import 'isomorphic-fetch';
import { local } from 'services';

const API_ROOT = 'https://api.gitter.im/';

function callApi(method, endpoint, data = undefined) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${local.getAuthToken()}`,
  });

  const body = data ? JSON.stringify(data) : undefined;

  return fetch(fullUrl, {
    method,
    headers,
    mode: 'cors',
    body: body || undefined,
  })
  .then(response =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => ({ response }),
    error => ({ error: error.message || 'Something bad happened' })
  );
}

// api services
export const fetchUser = () =>
  callApi('get', 'v1/user');
export const fetchUserRooms = (userId) =>
  callApi('get', `v1/user/${userId}/rooms`);
export const fetchRooms = (query = '') =>
 callApi('get', `v1/rooms${query ? `?q=${encodeURIComponent(query)}` : ''}`);
export const joinRoom = (uri) =>
 callApi('post', 'v1/rooms', { uri });
export const addRoomToUser = (userId, id) =>
 callApi('post', `v1/user/${userId}/rooms`, { id });
export const fetchRoomMessages = (roomId, limit = 50) =>
 callApi('get', `v1/rooms/${roomId}/chatMessages?limit=${limit}`);
export const postMessage = (roomId, text) =>
 callApi('post', `v1/rooms/${roomId}/chatMessages`, { text });
export const removeUserFromRoom = (roomId, userId) =>
 callApi('delete', `v1/rooms/${roomId}/users/${userId}`);

export const fetchOAuthToken = (code) =>
 callApi('delete', 'login/oauth/token', {
   client_id: '0e51a94e7ef2ef2d3a925e682415db4eb34d83f1',
   client_secret: 'd52e82a7e04a3c1beaff559ddf2e8afbe948db64',
   code,
   redirect_uri: 'localhost:3000',
   grant_type: 'authorization_code',
 });
