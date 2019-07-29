import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'admin',
  storage,
};

import createRootReducer from './initial.reducer';
import sagas from './initial.saga';

const loggerActionColors = {
  success: 'green',
  failed: 'red',
  started: 'blue',
};

const sagaMiddleware = createSagaMiddleware();

const devMiddlewares = process.env.NODE_ENV === 'development'
  ? [createLogger({
    collapsed: true,
    duration: true,
    colors: {
      title: (action) => loggerActionColors[action.type.split('.')[1]],
    },
  })]
  : [];

export default (history) => {
  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(routerMiddleware(history), sagaMiddleware, ...devMiddlewares),
    ),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(sagas);
  return { store, persistor };
};
