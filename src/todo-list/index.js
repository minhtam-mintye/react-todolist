import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "./components/Container";
import { Dropdown } from "./components/Dropdown";
import { Heading3 } from "./components/Heading";
import { TextField } from "./components/TextField";
import { Button } from "./components/Button";
import { Table, Th, Thead, Tr } from "./components/Table";
import { connect } from "react-redux";
import {
  actChangeTask,
  actChangeTheme,
  actDeleteTask,
  actEditTask,
  actNewTask,
  actUpdateTask,
} from "../redux/action";
import { arrTheme } from "./Themes";

class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>;
    });
  };

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(actEditTask(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(actChangeTask(task.id));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(actDeleteTask(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(actDeleteTask(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName,
  //   });
  // }

  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.dispatch(actChangeTheme(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3 style={{ fontWeight: "bold", textAlign: "center" }}>
            ToDo List
          </Heading3>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
            name="taskName"
            label="Task Name"
          />
          <Button
            className="ml-2"
            onClick={() => {
              let { taskName } = this.state;
              let newTask = {
                id: Date.now(),
                taskName,
                done: false,
              };
              console.log(newTask);
              this.props.dispatch(actNewTask(newTask));
            }}
          >
            <i className="fa fa-plus"></i> Add Task
          </Button>
          {this.state.disabled ? (
            <Button
              className="ml-2"
              disabled
              onClick={() => {
                this.props.dispatch(actUpdateTask(this.state.taskName));
              }}
            >
              <i className="fa fa-upload"></i> Update Task
            </Button>
          ) : (
            <Button
              className="ml-2"
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: "",
                  },
                  () => {
                    this.props.dispatch(actUpdateTask(taskName));
                  }
                );
              }}
            >
              <i className="fa fa-upload"></i> Update Task
            </Button>
          )}

          <hr className="pb-1" style={{ backgroundColor: "gray" }} />
          <Heading3>Task ToDo</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}
const mapStateToProps = (state) => {
  return {
    themeToDoList: state.toDoReducer.themeToDoList,
    taskList: state.toDoReducer.taskList,
    taskEdit: state.toDoReducer.taskEdit,
  };
};
export default connect(mapStateToProps)(ToDoList);
