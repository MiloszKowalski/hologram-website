import type {
  ChainModifiers,
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeProjectFields {
  name: EntryFieldTypes.Symbol;
  client: EntryFieldTypes.Symbol;
  director: EntryFieldTypes.Symbol;
  dop: EntryFieldTypes.Symbol;
  fullVideoUrl: EntryFieldTypes.Symbol;
  thumbnail: EntryFieldTypes.AssetLink;
  stills: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeProjectSkeleton = EntrySkeletonType<
  TypeProjectFields,
  "project"
>;
export type TypeProject<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProjectSkeleton, Modifiers, Locales>;
export type TypeProjectCollection<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = EntryCollection<TypeProjectSkeleton, Modifiers, Locales>;

export type ProjectCollection = TypeProjectCollection<
  "WITHOUT_UNRESOLVABLE_LINKS",
  "en-US"
>;
