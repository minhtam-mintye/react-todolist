import { combineReducers } from "redux";
import toDoReducer from "./toDoReducer";

const rootReducer = combineReducers({
    //combine child reducer
    toDoReducer,
});

export default rootReducer;
