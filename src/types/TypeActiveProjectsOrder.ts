import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProjectsOrderSkeleton } from "./TypeProjectsOrder";

/**
 * Fields type definition for content type 'TypeActiveProjectOrder'
 * @name TypeActiveProjectOrderFields
 * @type {TypeActiveProjectOrderFields}
 * @memberof TypeActiveProjectOrder
 */
export interface TypeActiveProjectOrderFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol<"Active projects order">;
  /**
   * Field type definition for field 'projectOrder' (Project order)
   * @name Project order
   * @localized false
   */
  projectOrder: EntryFieldTypes.EntryLink<TypeProjectsOrderSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'activeProjectOrder' (Active project order)
 * @name TypeActiveProjectOrderSkeleton
 * @type {TypeActiveProjectOrderSkeleton}
 * @author 0327ziSEefNBH26iqgnOk5
 * @since 2026-01-28T22:16:38.471Z
 * @version 13
 */
export type TypeActiveProjectOrderSkeleton = EntrySkeletonType<
  TypeActiveProjectOrderFields,
  "activeProjectOrder"
>;
/**
 * Entry type definition for content type 'activeProjectOrder' (Active project order)
 * @name TypeActiveProjectOrder
 * @type {TypeActiveProjectOrder}
 * @author Miłosz Kowalski<miloszkowalski@protonmail.com>
 * @since 2026-01-28T22:16:38.471Z
 * @version 13
 * @link https://app.contentful.com/spaces/r1kftmf04hrf/environments/master-2026-01-29/content_types/activeProjectOrder
 */
export type TypeActiveProjectOrder<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeActiveProjectOrderSkeleton, Modifiers, Locales>;
