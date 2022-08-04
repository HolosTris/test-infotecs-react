import React, {
  DragEvent,
  FC,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import cl from "./WidthChanger.module.css";

interface WidthChangerProps {
  setWidth: (width: SetStateAction<number | undefined>) => void;
}

const WidthChanger: FC<WidthChangerProps> = ({ setWidth }) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  return (
    <div
      className={cl.changer}
      // draggable
      // onDragStart={(ev) => ev.preventDefault()}
      onMouseDown={startDrag}
      onMouseOver={changeWidth}
      onMouseUp={endDrag}
    >
      <div className={cl.line}></div>
      {/* <span>{"<>"}</span> */}
    </div>
  );

  function startDrag(ev: MouseEvent) {
    setIsDrag(true);
    setStartX(ev.clientX);
  }

  function changeWidth(ev: MouseEvent) {
    if (!isDrag) return;
    console.log(ev.movementX);

    const difX = ev.clientX - startX;

    setWidth((width) => {
      // if (width === undefined) return;
      console.log(width, difX);
      return width ? width + difX : difX;
    });
  }

  function endDrag(ev: MouseEvent) {
    setIsDrag(false);
    setStartX(0);
  }
};

export default WidthChanger;
