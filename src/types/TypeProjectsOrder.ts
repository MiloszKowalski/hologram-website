import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProjectSkeleton } from "./TypeProject";

export interface TypeProjectsOrderFields {
  name: EntryFieldTypes.Symbol;
  projects: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProjectSkeleton>
  >;
}

export type TypeProjectsOrderSkeleton = EntrySkeletonType<
  TypeProjectsOrderFields,
  "projectsOrder"
>;
export type TypeProjectsOrder<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProjectsOrderSkeleton, Modifiers, Locales>;
