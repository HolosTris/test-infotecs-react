import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import { ITodo } from "../types/types";
import cl from "./NewTodoForm.module.css";

interface NewTodoFormProps {
  addNewTodo: (newTodo: ITodo) => void;
}

const NewTodoForm: FC<NewTodoFormProps> = ({ addNewTodo }) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");

  const button = (
    <button className={cl.button} onClick={activateForm}>
      New Todo
    </button>
  );

  return !isActive ? (
    button
  ) : (
    <form>
      <input
        type="text"
        className={cl.input}
        value={title}
        onChange={editText}
      />
      <button className={cl.button} onClick={finishCreatingTodo}>
        Add
      </button>
    </form>
  );

  function activateForm() {
    setIsActive(true);
  }

  function editText(ev: ChangeEvent<HTMLInputElement>) {
    setTitle(ev.target.value);
  }

  function finishCreatingTodo() {
    const newTodo: ITodo = {
      id: Date.now(),
      userId: 0,
      title: title,
      completed: false,
    };

    addNewTodo(newTodo);

    setIsActive(false);
  }
};

export default NewTodoForm;
