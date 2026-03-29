import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProjectsOrderSkeleton } from "./TypeProjectsOrder";

export interface TypeTomekPersonalActiveProjectsOrderFields {
  name: EntryFieldTypes.Symbol;
  projectsOrder: EntryFieldTypes.EntryLink<TypeProjectsOrderSkeleton>;
}

export type TypeTomekPersonalActiveProjectsOrderSkeleton = EntrySkeletonType<
  TypeTomekPersonalActiveProjectsOrderFields,
  "tomekPersonalActiveProjectsOrder"
>;
export type TypeTomekPersonalActiveProjectsOrder<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTomekPersonalActiveProjectsOrderSkeleton, Modifiers, Locales>;
