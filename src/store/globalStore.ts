import { atom } from "nanostores";

export const isModalOpen = atom<boolean>(false);

export const splitTextInstances = new Set<{
  name: string;
  x: globalThis.SplitText;
}>();
