import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import TodoItem from "./TodoItem";
import { Actions } from "../reducer";
import "./styles.css";
interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
}
export const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
  return (
    <div className="task-container">
      <div>
        <h1>Active</h1>

        <Droppable droppableId="activeList">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="active container"
            >
              {todos
                .filter((todo) => !todo.completed)
                .map((todo, index) => (
                  <TodoItem
                    todo={todo}
                    index={index}
                    key={todo.id}
                    dispatch={dispatch}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div>
        <h1>Completed </h1>
        <Droppable droppableId="completedList">
          {(provided, snapshot) => (
            <div
              className={`complete container ${
                snapshot.isDraggingOver ? "dragover" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos
                .filter((todo) => todo.completed)
                .map((todo, index) => (
                  <TodoItem
                    todo={todo}
                    index={index}
                    key={todo.id}
                    dispatch={dispatch}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
