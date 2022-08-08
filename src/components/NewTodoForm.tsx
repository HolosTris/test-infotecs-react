import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from "react";
import { IServerTodo, Todo } from "../types/types";
import cl from "./NewTodoForm.module.css";

interface NewTodoFormProps {
  addNewTodo: (newTodo: Todo) => void;
}

const NewTodoForm: FC<NewTodoFormProps> = ({ addNewTodo }) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [isValid, setIsValid] = useState(true);

  const button = (
    <button className={cl.button} onClick={activateForm}>
      New Todo
    </button>
  );

  return (
    <form className={cl.form} onSubmit={finishCreatingTodo}>
      {" "}
      {!isActive ? (
        button
      ) : (
        <>
          <input
            type="text"
            className={[cl.input, !isValid ? cl.error : ""].join(" ")}
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
          <button type="submit" className={cl.button}>
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

  function finishCreatingTodo(ev: FormEvent) {
    ev.preventDefault();

    setIsValid(checkForm());
    if (!checkForm()) return;
    const newTodo = new Todo(title, body);

    addNewTodo(newTodo);

    setTitle("");
    setBody("");
    setIsActive(false);
  }

  function checkForm() {
    if (title) return true;
    else return false;
  }
};

export default NewTodoForm;
