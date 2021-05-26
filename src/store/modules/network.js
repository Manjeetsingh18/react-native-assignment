const SET_IS_CONNECTED = 'SET_IS_CONNECTED';

const initialState = {
  isConnected: true,
};

const network = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CONNECTED:
      return {
        isConnected: action.isConnected,
      };

    default:
      return state;
  }
};

//----------------------------
// Dispatch network connection
//----------------------------

export const setIsConnected = isConnected => ({
  type: 'SET_IS_CONNECTED',
  isConnected,
});

export default network;
