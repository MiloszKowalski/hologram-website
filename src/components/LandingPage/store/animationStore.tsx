import { atom } from "nanostores";
import type { Project } from "../../../types/portfolio";

export const isIntroFinished = atom(false);

export const canRotateUsingPointer = atom(false);

export const pinnedChild = atom(<></>);

export const parentCounter = atom(0);

export const modalContents = atom<Project | null>(null);

export const isModalOpen = atom(false);

export const isMenuVisible = atom(false);

export const showreelPosition = atom(0);

export const smoothTouch = atom(0);
