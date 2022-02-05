import { Todo } from "./model";
// discriminated union type
export type Actions =
  | { type: "ADD"; payload: string }
  | { type: "EDIT"; payload: Todo }
  | { type: "DRAG_COMPLETE"; payload: number }
  | { type: "DRAG_ACTIVE"; payload: number }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number };

const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DRAG_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: true } : todo
      );
    case "DRAG_ACTIVE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: false } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

export default TodoReducer;
