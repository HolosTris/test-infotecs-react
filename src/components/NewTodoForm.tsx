import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import { ITodo, Todo } from "../types/types";
import cl from "./NewTodoForm.module.css";

interface NewTodoFormProps {
  addNewTodo: (newTodo: Todo) => void;
}

const NewTodoForm: FC<NewTodoFormProps> = ({ addNewTodo }) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const button = (
    <button className={cl.button} onClick={activateForm}>
      New Todo
    </button>
  );

  return (
    <form className={cl.form}>
      {" "}
      {!isActive ? (
        button
      ) : (
        <>
          <input
            type="text"
            className={cl.input}
            value={title}
            onChange={editTitle}
            placeholder="Todo title"
          />
          <textarea
            className={cl.textarea}
            value={body}
            onChange={editBody}
            placeholder="Todo body"
          />
          <button className={cl.button} onClick={finishCreatingTodo}>
            Add
          </button>
        </>
      )}
    </form>
  );

  function activateForm() {
    setIsActive(true);
  }

  function editTitle(ev: ChangeEvent<HTMLInputElement>) {
    setTitle(ev.target.value);
  }

  function editBody(ev: ChangeEvent<HTMLTextAreaElement>) {
    setBody(ev.target.value);
  }

  function finishCreatingTodo() {
    const newTodo = new Todo(title, body);

    addNewTodo(newTodo);

    setTitle("");
    setBody("");
    setIsActive(false);
  }
};

export default NewTodoForm;
