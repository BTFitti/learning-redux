import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// Criação do middleware do Saga
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

// Executando os Sagas
sagaMiddleware.run(rootSaga);