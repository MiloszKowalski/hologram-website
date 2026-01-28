import type { ProjectCollection, TypeProject } from "./TypeProject";

export interface Project {
  name: string;
  client: string;
  director: string;
  dop: string;
  fullVideoUrl: string;
  thumbnail: string;
  stills: string[];
}

export const toProject = (
  contentfulProject: TypeProject<"WITHOUT_UNRESOLVABLE_LINKS", "en-US">,
): Project => ({
  client: contentfulProject.fields.client,
  director: contentfulProject.fields.director,
  dop: contentfulProject.fields.dop,
  fullVideoUrl: contentfulProject.fields.fullVideoUrl,
  name: contentfulProject.fields.name,
  thumbnail: contentfulProject.fields.thumbnail?.fields.file?.url ?? "",
  stills: contentfulProject.fields.stills.map(
    (x) => x?.fields?.file?.url ?? "",
  ),
});

export const toProjects = (projectCollection: ProjectCollection): Project[] =>
  projectCollection.items.map((x) => toProject(x));
