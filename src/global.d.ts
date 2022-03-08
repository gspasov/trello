/// <reference types="svelte" />
declare type DndEvent = import("svelte-dnd-action").DndEvent;
type GenericDndEvent<T> = DndEvent & { items: T[] };
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (
      event: CustomEvent<GenericDndEvent> & { target: EventTarget & T }
    ) => void;
    onfinalize?: (
      event: CustomEvent<GenericDndEvent> & { target: EventTarget & T }
    ) => void;
  }
}
