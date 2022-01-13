export function clickOutside(element, callbackFunction) {
  function handleClick(event) {
    if (!element.contains(event.target)) {
      callbackFunction();
    }
  }

  document.body.addEventListener("click", handleClick);

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener("click", handleClick);
    },
  };
}
