import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeProjectsOrderSkeleton } from "./TypeProjectsOrder";

/**
 * Fields type definition for content type 'TypeTomekPersonalActiveProjectsOrder'
 * @name TypeTomekPersonalActiveProjectsOrderFields
 * @type {TypeTomekPersonalActiveProjectsOrderFields}
 * @memberof TypeTomekPersonalActiveProjectsOrder
 */
export interface TypeTomekPersonalActiveProjectsOrderFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'projectsOrder' (projectsOrder)
   * @name projectsOrder
   * @localized false
   */
  projectsOrder: EntryFieldTypes.EntryLink<TypeProjectsOrderSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'tomekPersonalActiveProjectsOrder' (Tomek personal active projects order)
 * @name TypeTomekPersonalActiveProjectsOrderSkeleton
 * @type {TypeTomekPersonalActiveProjectsOrderSkeleton}
 * @author 0327ziSEefNBH26iqgnOk5
 * @since 2026-03-28T15:17:02.525Z
 * @version 3
 */
export type TypeTomekPersonalActiveProjectsOrderSkeleton = EntrySkeletonType<
  TypeTomekPersonalActiveProjectsOrderFields,
  "tomekPersonalActiveProjectsOrder"
>;
/**
 * Entry type definition for content type 'tomekPersonalActiveProjectsOrder' (Tomek personal active projects order)
 * @name TypeTomekPersonalActiveProjectsOrder
 * @type {TypeTomekPersonalActiveProjectsOrder}
 * @author Miłosz Kowalski<miloszkowalski@protonmail.com>
 * @since 2026-03-28T15:17:02.525Z
 * @version 3
 * @link https://app.contentful.com/spaces/r1kftmf04hrf/environments/master-2026-01-29/content_types/tomekPersonalActiveProjectsOrder
 */
export type TypeTomekPersonalActiveProjectsOrder<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTomekPersonalActiveProjectsOrderSkeleton, Modifiers, Locales>;
