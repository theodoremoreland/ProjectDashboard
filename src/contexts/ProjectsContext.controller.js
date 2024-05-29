export const defaultOrder = (projects) => {
  if (projects.length === 0) return [];

  const featuredProjectNames = [
    "BellyButtonBiodiversity",
    "Blogz",
    "Episodic",
    "MovieIon",
    "TopWine",
    "MyMovieList",
    "TypeRace",
    "WeatherDashboard",
    "JavaScriptQuiz",
    "REDB",
    "ShelfCheck",
    "PortfolioExample",
    "HawaiiClimateDataAPI",
    "NodeJsQuiz",
    "ScrabbleScorer"
  ].sort(() => Math.random() - 0.5); // Randomize order of first set of featured projects

  featuredProjectNames.push("YelpETL", "STLServiceCalls", "Decades"); // Add remaining featured projects in exact order

  const reposSortedByFeatured = [
    ...featuredProjectNames.reduce((newProjectsArray, name) => {
      const projectMatchingGivenName = projects.find(
        (project) => project.name === name
      );
      return projectMatchingGivenName
        ? [...newProjectsArray, projectMatchingGivenName]
        : newProjectsArray;
    }, []),
    ...projects.filter(
      (project) => !featuredProjectNames.includes(project.name)
    ),
  ];

  return reposSortedByFeatured;
};

export const sortProjects = (projects, sortValue) => {
  const sortedProjects = [...projects];
  const name = sortValue.name;
  const dir = sortValue.direction;

  if (name === "default") {
    return defaultOrder(sortedProjects);
  }

  const compare = (a, b) => {
    a = name.slice(0, 4) === "date" ? new Date(a) : a;
    b = name.slice(0, 4) === "date" ? new Date(b) : b;

    if (dir === "asc") {
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      }
    } else {
      if (a < b) {
        return 1;
      } else if (b < a) {
        return -1;
      }
    }

    return 0;
  };

  sortedProjects.sort((a, b) => compare(a[name], b[name]));

  return sortedProjects;
};
