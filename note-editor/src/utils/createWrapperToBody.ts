

export function createWrapperToBody(wrapperId: string) {

  const wrapperElement:HTMLDivElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
}