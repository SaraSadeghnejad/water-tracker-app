import React, {useState} from 'react';
import {createStore, combineReducers} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import waterReducer from './src/store/water-reducer';
import Navigation from './src/navigation';

const rootReducer = combineReducers({
  water: waterReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
