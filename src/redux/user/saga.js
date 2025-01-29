import { all, takeEvery, call, put, delay, takeLatest } from "redux-saga/effects";
//takeEvery - pega todo clique do usuário, se clicar 10x no botão do fetchUsers, ele vai executar 10 vezes
//takeLatest - pega apenas o ultimo clique do usuário, se ele clicar 10x no botão, ele vai pegar apenas o ultimo clique e executar uma vez, isso é bom para usuários impacientes que ficam +
//spammando o botão
import { fetchUsersSuccess, fetchUsersFailure, fetchUserByIdSuccess, fetchUserByIdFailure } from "./slice";

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
function* fetchUserById(action){
  try{
    const userId = action.payload;
    const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`)
    yield put(fetchUserByIdSuccess(response.data))

  }catch{
    yield put(fetchUserByIdFailure(error.message))
  }
}
//exportando para poder configurar o saga
export default all([
  takeLatest("user/fetchUsers", fetchUsers), 
  takeEvery("user/fetchUserById",fetchUserById)
]);
