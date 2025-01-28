import { all, takeEvery } from "redux-saga/effects";

//criando a função que vai fazer a requisição
function* fetchUsers(){

}
//exportando para poder configurar o saga
export default all([
    takeEvery("user/fetchUsers", fetchUsers)
])
