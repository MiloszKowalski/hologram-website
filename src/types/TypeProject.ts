import type {
  ChainModifiers,
  Entry,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeProject'
 * @name TypeProjectFields
 * @type {TypeProjectFields}
 * @memberof TypeProject
 */
export interface TypeProjectFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'client' (Client)
   * @name Client
   * @localized false
   */
  client: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'director' (Director)
   * @name Director
   * @localized false
   */
  director: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'dop' (Dop)
   * @name Dop
   * @localized false
   */
  dop: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'fullVideoUrl' (Full video URL)
   * @name Full video URL
   * @localized false
   */
  fullVideoUrl: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'thumbnail' (Thumbnail)
   * @name Thumbnail
   * @localized false
   */
  thumbnail: EntryFieldTypes.AssetLink;
  /**
   * Field type definition for field 'stills' (Stills)
   * @name Stills
   * @localized false
   */
  stills: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

/**
 * Entry skeleton type definition for content type 'project' (Project)
 * @name TypeProjectSkeleton
 * @type {TypeProjectSkeleton}
 * @author 0327ziSEefNBH26iqgnOk5
 * @since 2026-01-21T17:46:04.496Z
 * @version 3
 */
export type TypeProjectSkeleton = EntrySkeletonType<
  TypeProjectFields,
  "project"
>;
/**
 * Entry type definition for content type 'project' (Project)
 * @name TypeProject
 * @type {TypeProject}
 * @author Miłosz Kowalski<miloszkowalski@protonmail.com>
 * @since 2026-01-21T17:46:04.496Z
 * @version 3
 * @link https://app.contentful.com/spaces/r1kftmf04hrf/environments/master-2026-01-29/content_types/project
 */
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
