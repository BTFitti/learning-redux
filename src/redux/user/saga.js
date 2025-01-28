import { all, takeEvery, call, put, delay } from "redux-saga/effects";
import { fetchUsersSuccess, fetchUsersFailure } from "./slice";

import axios from "axios";
//api: https://jsonplaceholder.typicode.com/users/

//criando a função que vai fazer a requisição
function* fetchUsers() {
  try {
    yield delay(2000)
    //yield - esperar a resposta de uma chamada assincrona.
    const response = yield call(axios.get,"https://jsonplaceholder.typicode.com/users/");
    yield put(fetchUsersSuccess(response.data));
    
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}
//exportando para poder configurar o saga
export default all([takeEvery("user/fetchUsers", fetchUsers)]);
