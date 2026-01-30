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
  client: contentfulProject.fields.client.replaceAll("\\n", "\n"),
  director: contentfulProject.fields.director.replaceAll("\\n", "\n"),
  dop: contentfulProject.fields.dop.replaceAll("\\n", "\n"),
  fullVideoUrl: contentfulProject.fields.fullVideoUrl,
  name: contentfulProject.fields.name.replaceAll("\\n", "\n"),
  thumbnail: contentfulProject.fields.thumbnail?.fields.file?.url ?? "",
  stills: contentfulProject.fields.stills?.map(
    (x) => x?.fields?.file?.url ?? "",
  ),
});

export const toProjects = (projectCollection: ProjectCollection): Project[] =>
  projectCollection.items.map((x) => toProject(x));
