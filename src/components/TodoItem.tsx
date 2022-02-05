import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../model";
import { Actions } from "../reducer";
import "./styles.css";
interface Props {
  todo: Todo;
  index: number;
  dispatch: React.Dispatch<Actions>;
}
const TodoItem: React.FC<Props> = ({ todo, dispatch, index }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleEdit = () => {
    // we only want to edit the text if it's not completed
    if (!isEditing && !todo.completed) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({
      type: "EDIT",
      payload: { id, completed: todo.completed, text: editText },
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);
  // improvement - toggleComplete trigger too many rendering
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo-item ${snapshot.isDragging ? "dragging" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : todo.completed ? (
            <s>
              <h1>{todo.text}</h1>
            </s>
          ) : (
            <h1 style={{ marginRight: "5px" }}>{todo.text}</h1>
          )}

          <div className="btn-container">
            <button onClick={() => handleEdit()} disabled={todo.completed}>
              edit
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
            >
              toggleComplete
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
            >
              delete
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
