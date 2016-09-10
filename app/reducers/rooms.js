const initialState = {
  rooms: [],
};

export default function rooms(state = initialState, action) {
  switch (action.type) {

    case 'Something':
      return state;

    default:
      return state;
  }
}
