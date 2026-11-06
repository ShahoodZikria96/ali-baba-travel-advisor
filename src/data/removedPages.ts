/**
 * Canada is now offered ONLY as a group tour (/tour-packages/canada-group-tour/).
 * Canada visa consultancy, reconsideration and judicial review are no longer sold,
 * so those pages are removed and their URLs redirect to the group tour (see deploy/htaccess).
 *
 * The lists below are applied to content from the admin/API as well as to code-defined content
 * (src/lib/content.ts), so a page cannot reappear because it still exists in the admin database.
 * To bring a page back: delete its slug here and remove its redirect from deploy/htaccess.
 */
export const removedCountrySlugs = new Set(["canada"]);
export const removedRefusalSlugs = new Set(["canada"]);
export const removedGuideSlugs = new Set(["canada-visitor-visa-from-pakistan", "canada-business-visitor-visa-from-pakistan"]);

/** Visa-consultancy service pages about Canada (any slug starting with "canada"). */
export const isRemovedServiceSlug = (slug: string) => /^canada/.test(slug);

/** Canada visa success stories / videos (shown only if they describe a Canada visa result, not the group tour). */
export const isRemovedStory = (country: string, category: string) => /canada/i.test(country) && /visa|refus|reconsider/i.test(category);
export const isRemovedVideoTitle = (title: string) => /canada/i.test(title) && /visa|refus|reconsider|judicial/i.test(title);
