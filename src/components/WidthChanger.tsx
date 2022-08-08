import React, {
  ComponentProps,
  DragEvent,
  FC,
  forwardRef,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import cl from "./WidthChanger.module.css";

interface WidthChangerProps {
  mouseDownHandler: (event: MouseEvent) => void;
}

const WidthChanger: FC<WidthChangerProps> = ({ mouseDownHandler }) => {
  return (
    <div className={cl.changer} onMouseDown={mouseDownHandler}>
      <div className={cl.line}></div>
    </div>
  );
};
export default WidthChanger;
