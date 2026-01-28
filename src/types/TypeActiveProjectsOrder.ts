import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProjectsOrderSkeleton } from "./TypeProjectsOrder";

export interface TypeActiveProjectOrderFields {
  name: EntryFieldTypes.Symbol<"Active projects order">;
  projectOrder: EntryFieldTypes.EntryLink<TypeProjectsOrderSkeleton>;
}

export type TypeActiveProjectOrderSkeleton = EntrySkeletonType<
  TypeActiveProjectOrderFields,
  "activeProjectOrder"
>;
export type TypeActiveProjectOrder<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeActiveProjectOrderSkeleton, Modifiers, Locales>;
