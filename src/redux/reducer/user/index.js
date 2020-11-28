import {combineReducers} from "redux";
import user from "./UserReducer";

const userReducer = combineReducers({
    user
})

export default userReducer