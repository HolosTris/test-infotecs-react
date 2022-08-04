export function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

export function cutContent(element: HTMLElement) {
  console.log(element.offsetWidth);

  const stringCut =
    (element.offsetWidth / parseInt(element.style.fontSize)) * 1.5;
  return cutText(element.textContent || "", stringCut);
}

//Функция обрезки строк
function cutText(text: string, limit: number) {
  text = text.trim();
  if (text.length <= limit) return text;

  text = text.slice(0, limit);
  const lastSpaceId = text.lastIndexOf(" ");
  if (lastSpaceId > 0) {
    text = text.slice(0, lastSpaceId);
  }

  return text + "...";
}
