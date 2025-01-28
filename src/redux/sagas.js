import { all } from "redux-saga/effects";
import user from "./user/saga"

//function* é uma função geradora, é como se ele fosse um async e o que vem dentro dele é o await
export default function* rootSaga(){
    return yield all([
        user,
    ])
}