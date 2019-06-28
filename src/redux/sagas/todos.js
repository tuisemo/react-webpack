import { delay, put, takeEvery } from "redux-saga/effects";

// Our worker Saga: 将执行异步的 pushList 任务
export function* pushListAsync() {
  yield delay(1000);
  yield put({ type: "PUSH_LIST", item: { name: "9090" } });
}

// export watcher Saga
export default function* watcher() {
  yield takeEvery("PUSH_LIST_ASYNC", pushListAsync);
}
