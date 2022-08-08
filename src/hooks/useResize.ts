import { CSSProperties, MouseEvent, RefObject, useRef, useState } from "react";

interface ISizeParams {
  height?: number;
  width?: number;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
}

function useResize(
  params: ISizeParams
): [
  RefObject<HTMLElement>,
  (event: MouseEvent) => void,
  (event: MouseEvent) => void,
  (event: MouseEvent) => void
] {
  const { height, width, minHeight, minWidth, maxHeight, maxWidth } = params;

  const startSize = {
    height: height,
    width: width,
  };

  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    size: { ...startSize },
    lastSize: { ...startSize },
  });

  // Создаём ссылку на нужный элемент.
  // Именно ссылку, потому что иначе мы не будем знать настоящих размеров элемента и опираться только на maxWidth и maxHeight. Что не подходит для маленького экрана
  const elemRef = useRef<HTMLElement>(null);
  const elem = elemRef.current;

  const { isDragging } = dragInfo;

  // Здесь запоминаем начальное положение курсора при нажатии на компонент WidthChanger и начинаем изменение размера
  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    if (!isDragging)
      setDragInfo({
        ...dragInfo,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      });
    console.log(dragInfo.lastSize);
  };

  // Здесь, собственно, изменяем размер относительно начального положения курсора и опираясь на настоящие размеры элемента section компонента TodoList во время окончания прошлого ресайза
  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (isDragging) {
      const { origin, lastSize, size } = dragInfo;

      if (lastSize.height) {
        const newHeight = clientY - (origin.y - lastSize.height);

        size.height =
          maxHeight && newHeight > maxHeight
            ? maxHeight
            : minHeight && newHeight < minHeight
            ? minHeight
            : newHeight;
      }

      if (lastSize.width) {
        const newWidth = clientX - (origin.x - lastSize.width);

        size.width =
          maxWidth && newWidth > maxWidth
            ? maxWidth
            : minWidth && newWidth < minWidth
            ? minWidth
            : newWidth;
      }

      // console.log(clientX, origin.x, size.width, lastSize.width);

      setDragInfo({ ...dragInfo });
    }
  };

  // Задаём и запоминаем настоящие размеры списка todo
  const handleMouseUp = () => {
    if (isDragging) {
      const { size } = dragInfo;

      const actualSize = {
        width: size.width && elem?.offsetWidth,
        height: size.height && elem?.offsetHeight,
      };

      setDragInfo({
        ...dragInfo,
        isDragging: false,
        size: { ...actualSize },
        lastSize: { ...actualSize },
      });
    }
  };

  // Задаём стили изменяемого элемента. В данном случае - это элемент section из TodoList
  if (elem?.style) {
    maxHeight && (elem.style.maxHeight = `${maxHeight}px`);

    maxWidth && (elem.style.maxWidth = `${maxWidth}px`);

    minHeight && (elem.style.minHeight = `${minHeight}px`);

    minWidth && (elem.style.minWidth = `${minWidth}px`);

    dragInfo.size.height &&
      (elem.style.minHeight = `${dragInfo.size.height}px`);

    dragInfo.size.width && (elem.style.width = `${dragInfo.size.width}px`);
  }

  return [elemRef, handleMouseDown, handleMouseMove, handleMouseUp];
}

export default useResize;
