import { atom } from "nanostores";
import type { Project } from "../types/portfolio";

export const modalContents = atom<Project | null>(null);

export const shouldContractPortfolio = atom<boolean>(false);
