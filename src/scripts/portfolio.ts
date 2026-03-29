export const hideProjects = () => {
  const projectsGrids = document.querySelectorAll(".projects-grid");
  const expanded = Array.from(projectsGrids).toSpliced(0, 1);

  for (const grid of expanded) {
    grid.classList.remove("grid-rows-[1fr]");
    grid.classList.add("grid-rows-[0fr]");
  }

  seeMoreButton!.classList.remove("opacity-0");
  seeMoreButton!.classList.add("opacity-100");

  visibleSegments = 1;
  ScrollSmoother.refresh();
};
