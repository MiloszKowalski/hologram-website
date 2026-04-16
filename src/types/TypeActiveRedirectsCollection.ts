import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeRedirectSkeleton } from "./TypeRedirect";

/**
 * Fields type definition for content type 'TypeActiveRedirectsCollection'
 * @name TypeActiveRedirectsCollectionFields
 * @type {TypeActiveRedirectsCollectionFields}
 * @memberof TypeActiveRedirectsCollection
 */
export interface TypeActiveRedirectsCollectionFields {
  /**
   * Field type definition for field 'name' (name)
   * @name name
   * @localized false
   */
  name: EntryFieldTypes.Symbol<"Active Redirects collection">;
  /**
   * Field type definition for field 'redirects' (redirects)
   * @name redirects
   * @localized false
   */
  redirects: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeRedirectSkeleton>
  >;
}

/**
 * Entry skeleton type definition for content type 'activeRedirectsCollection' (Active redirects collection)
 * @name TypeActiveRedirectsCollectionSkeleton
 * @type {TypeActiveRedirectsCollectionSkeleton}
 * @author 0327ziSEefNBH26iqgnOk5
 * @since 2026-04-16T20:41:20.656Z
 * @version 5
 */
export type TypeActiveRedirectsCollectionSkeleton = EntrySkeletonType<
  TypeActiveRedirectsCollectionFields,
  "activeRedirectsCollection"
>;
/**
 * Entry type definition for content type 'activeRedirectsCollection' (Active redirects collection)
 * @name TypeActiveRedirectsCollection
 * @type {TypeActiveRedirectsCollection}
 * @author Miłosz Kowalski<miloszkowalski@protonmail.com>
 * @since 2026-04-16T20:41:20.656Z
 * @version 5
 * @link https://app.contentful.com/spaces/r1kftmf04hrf/environments/master-2026-01-29/content_types/activeRedirectsCollection
 */
export type TypeActiveRedirectsCollection<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeActiveRedirectsCollectionSkeleton, Modifiers, Locales>;
