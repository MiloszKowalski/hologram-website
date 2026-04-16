import type {
  ChainModifiers,
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeRedirect'
 * @name TypeRedirectFields
 * @type {TypeRedirectFields}
 * @memberof TypeRedirect
 */
export interface TypeRedirectFields {
  /**
   * Field type definition for field 'slug' (slug)
   * @name slug
   * @localized false
   */
  slug: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'url' (url)
   * @name url
   * @localized false
   */
  url: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'redirect' (Redirect)
 * @name TypeRedirectSkeleton
 * @type {TypeRedirectSkeleton}
 * @author 0327ziSEefNBH26iqgnOk5
 * @since 2026-04-16T20:39:19.700Z
 * @version 1
 */
export type TypeRedirectSkeleton = EntrySkeletonType<
  TypeRedirectFields,
  "redirect"
>;
/**
 * Entry type definition for content type 'redirect' (Redirect)
 * @name TypeRedirect
 * @type {TypeRedirect}
 * @author Miłosz Kowalski<miloszkowalski@protonmail.com>
 * @since 2026-04-16T20:39:19.700Z
 * @version 1
 * @link https://app.contentful.com/spaces/r1kftmf04hrf/environments/master-2026-01-29/content_types/redirect
 */
export type TypeRedirect<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeRedirectSkeleton, Modifiers, Locales>;

export type TypeRedirectCollection<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = EntryCollection<TypeRedirectSkeleton, Modifiers, Locales>;

export type RedirectCollection = TypeRedirectCollection<
  "WITHOUT_UNRESOLVABLE_LINKS",
  "en-US"
>;
