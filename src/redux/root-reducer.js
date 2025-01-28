import { combineReducers } from "redux";
import userReducer from './user/slice'
//no root-reducer é onde vou importar todos os slices que é onde vai ter os reducers, as actions, os estados que vão ser espalhados pela aplicação
export default combineReducers({
    user: userReducer
})