import React, { useReducer } from "react";
import "./App.css";
import { InputField } from "./components/InputField";
import { TodoList } from "./components/TodoList";
import TodoReducer from "./reducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// reorganize interfaces & think about how to handle the state and dispatch
const App: React.FC = () => {
  const [state, dispatch] = useReducer(TodoReducer, []);
  // improve: debounce onChange event ??
  const onDragEnd = (result: DropResult) => {
    // source and destination based on droppableID
    const { source, destination } = result;
    // destinaiton is null if we drag to other places
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (destination.droppableId === "completedList") {
      // remember in TodoItem we convert draggablID to string
      dispatch({ type: "DRAG_COMPLETE", payload: +result.draggableId });
    }
    if (destination.droppableId === "activeList") {
      // remember in TodoItem we convert draggablID to string
      dispatch({ type: "DRAG_ACTIVE", payload: +result.draggableId });
    }
  };
  // https://www.youtube.com/watch?v=FJDVKeh7RJI
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1> To do</h1>
        <InputField dispatch={dispatch} />
        <TodoList todos={state} dispatch={dispatch} />
      </div>
    </DragDropContext>
  );
};

export default App;
