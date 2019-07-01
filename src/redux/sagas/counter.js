import { delay, put, takeEvery } from 'redux-saga/effects';

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}
export function* incrementAsync_params({ payload }) {
  yield delay(1000);
  yield put({ type: 'INCREMENT_PARAMS', payload });
}
export function* decrementAsync() {
  yield delay(1000);
  yield put({ type: 'DECREMENT' });
}

// export watcher Saga
export default function* watcher() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
  yield takeEvery('INCREMENT_ASYNC_PARAMS', incrementAsync_params);
  yield takeEvery('DECREMENT_ASYNC', decrementAsync);
}
