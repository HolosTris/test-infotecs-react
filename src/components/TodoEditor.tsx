import React, { FC } from "react";
import { ITodo } from "../types/types";
import cl from "./TodoEditor.module.css";

interface EditTodoFormProps {
  todo?: ITodo;
}

const EditTodoForm: FC<EditTodoFormProps> = ({ todo }) => {
  const tip = <span>(pick any todo)</span>;

  return (
    <section className={cl.editTodoForm}>
      <h3>Editing {!todo && tip}</h3>
      <input type="text" value={todo?.title} />
      <textarea className={cl.bodyTextarea}></textarea>
    </section>
  );
};

export default EditTodoForm;
