import type { PreinitializedWritableAtom } from "nanostores";

export type Observable = PreinitializedWritableAtom<boolean> & object;
