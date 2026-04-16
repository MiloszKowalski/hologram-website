import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProjectSkeleton } from "./TypeProject";

/**
 * Fields type definition for content type 'TypeProjectsOrder'
 * @name TypeProjectsOrderFields
 * @type {TypeProjectsOrderFields}
 * @memberof TypeProjectsOrder
 */
export interface TypeProjectsOrderFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'projects' (Projects)
   * @name Projects
   * @localized false
   */
  projects: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeProjectSkeleton>
  >;
}

/**
 * Entry skeleton type definition for content type 'projectsOrder' (Projects order)
 * @name TypeProjectsOrderSkeleton
 * @type {TypeProjectsOrderSkeleton}
 * @author 0327ziSEefNBH26iqgnOk5
 * @since 2026-01-28T22:11:20.849Z
 * @version 7
 */
export type TypeProjectsOrderSkeleton = EntrySkeletonType<
  TypeProjectsOrderFields,
  "projectsOrder"
>;
/**
 * Entry type definition for content type 'projectsOrder' (Projects order)
 * @name TypeProjectsOrder
 * @type {TypeProjectsOrder}
 * @author Miłosz Kowalski<miloszkowalski@protonmail.com>
 * @since 2026-01-28T22:11:20.849Z
 * @version 7
 * @link https://app.contentful.com/spaces/r1kftmf04hrf/environments/master-2026-01-29/content_types/projectsOrder
 */
export type TypeProjectsOrder<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProjectsOrderSkeleton, Modifiers, Locales>;
