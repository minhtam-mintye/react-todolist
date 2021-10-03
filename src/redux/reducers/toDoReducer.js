import { arrTheme } from "../../todo-list/Themes/index";
import { PrimaryTheme } from "../../todo-list/Themes/PrimaryTheme";
import {
  AddTask,
  ChangeTask,
  ChangeTheme,
  DeleteTask,
  EditTask,
  UpdateTask,
} from "../constant";

let initialState = {
  themeToDoList: PrimaryTheme,
  taskList: [
    { id: "task-1", taskName: "toDo", done: false },
    { id: "task-3", taskName: "Completed", done: true },
    { id: "task-2", taskName: "toDo-2", done: false },
    { id: "task-4", taskName: "Completed-2", done: true },
  ],
  taskEdit: { id: "", taskName: "toDo", done: false },
};

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case AddTask: {
      if (action.newTask.taskName.trim() === "") {
        alert("Task Name is empty");
        return { ...state };
      }
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert("Task Name is already taken");
        return { ...state };
      }
      taskListUpdate.push(action.newTask);
      state.taskList = taskListUpdate;
      return { ...state };
    }

    case ChangeTheme: {
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      if (theme) {
        console.log(theme);
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    }

    case ChangeTask: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }
      return { ...state, taskList: taskListUpdate };
    }

    case DeleteTask: {
      // let taskListUpdate = [...state.taskList];
      // taskListUpdate = taskListUpdate.filter(
      //   (task) => task.id !== action.taskId
      // );
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }

    case EditTask: {
      return { ...state, taskEdit: action.task };
    }

    case UpdateTask: {
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );
      if (index !== 1) {
        taskListUpdate[index] = state.taskEdit;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: "-1", taskName: "", done: false };
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default toDoReducer;
