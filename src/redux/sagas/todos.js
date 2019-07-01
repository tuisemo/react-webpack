import { select, put, call, takeEvery } from 'redux-saga/effects';
import { getTodosList } from '@/api/demo';

// Our worker Saga: 将执行异步的 pushList 任务
export function* getTodosData() {
  const { data = [] } = yield call(getTodosList);
  yield put({
    type: 'PUSH_LIST',
    payload: data
  });
}

export function* removeTodo({ payload }) {
  const { list = [] } = yield select(state => state.todos);
  const newList = list.filter(el => {
    return el.id !== payload;
  });
  yield put({ type: 'PUSH_LIST', payload: newList });
}

// export watcher Saga
export default function* watcher() {
  yield takeEvery('GET_TODOS', getTodosData);
  yield takeEvery('REMOVE_TODO', removeTodo);
}
