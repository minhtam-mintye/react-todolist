// import { DELETE, EDIT, KEYWORD, SUBMIT } from "../constant";
import * as ActionType from "./../constant";

export const actNewTask = (newTask) => {
  return {
    type: ActionType.AddTask,
    newTask,
  };
};

export const actChangeTheme = (value) => {
  return {
    type: ActionType.ChangeTheme,
    themeId: value,
  };
};

export const actChangeTask = (taskId) => ({
  type: ActionType.ChangeTask,
  taskId,
});

export const actDeleteTask = (taskId) => ({
  type: ActionType.DeleteTask,
  taskId,
});

export const actEditTask = (task) => ({
  type: ActionType.EditTask,
  task,
});

export const actUpdateTask = (taskName) => ({
  type: ActionType.UpdateTask,
  taskName,
})