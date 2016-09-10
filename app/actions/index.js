export const SET_USER_APP_TOKEN = 'SET_USER_APP_TOKEN';
export const SET_USER_APP_TOKEN_SUCCESS = 'SET_USER_APP_TOKEN_SUCCESS';

export const CONNECT_WITH_JID = 'CONNECT_WITH_JID';

export const ROSTER_UPDATE = 'ROSTER_UPDATE';

export const MUC_AVAILABLE = 'MUC_AVAILABLE';
export const MUC_DECLINE = 'MUC_DECLINE';
export const MUC_ERROR = 'MUC_ERROR';
export const MUC_INVITE = 'MUC_INVITE';
export const MUC_JOIN = 'MUC_JOIN';
export const MUC_LEAVE = 'MUC_LEAVE';
export const MUC_SUBJECT = 'MUC_SUBJECT';
export const MUC_UNAVAILABLE = 'MUC_UNAVAILABLE';
export const MUC_DESTROYED = 'MUC_DESTROYED';


const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) =>
    Object.assign({}, acc, { [type]: `${base}_${type}` })
  , {});
}

export const ROOM = createRequestTypes('ROOM');

function action(type, payload = {}) {
  return { type, ...payload };
}

export const room = {
  request: () => action(ROOM.REQUEST),
  success: (response) => action(ROOM.SUCCESS, { response }),
  failure: (error) => action(ROOM.FAILURE, { error }),
};


export const ConnectWithJid = (jid, password) => action(CONNECT_WITH_JID, { jid, password });

export const rosterUpdate = (msg) => action(ROSTER_UPDATE, { msg });

export const mucAvailable = (msg) => action(MUC_AVAILABLE, { msg });
export const mucDeclined = (msg) => action(MUC_DECLINE, { msg });
export const mucError = (msg) => action(MUC_ERROR, { msg });
export const mucInvite = (msg) => action(MUC_INVITE, { msg });
export const mucJoin = (msg) => action(MUC_JOIN, { msg });
export const mucLeave = (msg) => action(MUC_LEAVE, { msg });
export const mucSubject = (msg) => action(MUC_SUBJECT, { msg });
export const mucUnavailable = (msg) => action(MUC_UNAVAILABLE, { msg });
export const mucDestroyed = (msg) => action(MUC_DESTROYED, { msg });
