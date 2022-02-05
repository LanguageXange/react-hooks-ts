import React, { useRef, useState } from "react";
import { Actions } from "../reducer";
import "./styles.css";
interface myProps {
  dispatch: React.Dispatch<Actions>;
}

export const InputField: React.FC<myProps> = ({ dispatch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "ADD", payload: todo });
      setTodo("");
    }
  };
  return (
    <form
      className="input-form"
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={todo}
        placeholder="Enter your next to do task... "
        onChange={(e) => handleChange(e)}
      />
      <button type="submit"> Submit</button>
    </form>
  );
};
