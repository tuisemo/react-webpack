import { all } from 'redux-saga/effects';
import todos from './todos';
import counter from './counter';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([todos(), counter()]);
}
