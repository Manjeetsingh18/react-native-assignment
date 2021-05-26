import React from 'react';
import {HomeScreen} from './src/screens';
import {Provider} from 'react-redux';
import createStore from './src/store/create';
const store = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};
export default App;
