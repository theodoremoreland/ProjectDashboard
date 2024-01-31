export const createWordCloudData = (projects) => {
  let allTopicsList = [];

  projects.forEach((project) => {
    allTopicsList.push(...project.topics);
  });

  const allTopicsString = allTopicsList.join();
  const topics = new Set(allTopicsList);
  const wordCloudData = [...topics].map((topic) => {
    const topicRegExp = new RegExp(`[^a-z]${topic}[^a-z]`, "g");
    const matches = allTopicsString.match(topicRegExp) || [];

    return { text: topic, value: matches.length };
  });

  const frameworks = {
    "react-native": "React-Native",
    flask: "Flask",
    "spring-boot": "Spring-Boot",
    junit: "jUnit",
    jest: "Jest",
    jasmine: "Jasmine",
    unittest: "unittest",
  };
  const competencies = {
    "web-development": "web-development",
    "mobile-development": "mobile-development",
    "data-engineering": "data-engineering",
    "data-analytics": "data-analytics",
  };
  const languages = {
    python: "Python",
    javascript: "JavaScript",
    java: "Java",
    typescript: "TypeScript",
    sql: "SQL",
    plpgsql: "PLpgSQL",
    vba: "VBA",
    bash: "Bash",
    html: "HTML",
    css: "CSS",
  };
  const tools = {
    react: "React",
    node: "Node",
    pandas: "Pandas",
    docker: "Docker",
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    mongodb: "MongoDB",
    matplotlib: "Matplotlib",
  };

  const frameworksWordCloudData = () => {
    const frameworksTopics = wordCloudData.filter((topic) =>
      Object.keys(frameworks).includes(topic.text)
    );
    return frameworksTopics.map((topic) => {
      return { text: frameworks[topic.text], value: topic.value };
    });
  };
  const competenciesWordCloudData = () => {
    const competencyTopics = wordCloudData.filter((topic) =>
      Object.keys(competencies).includes(topic.text)
    );
    return competencyTopics.map((topic) => {
      return { text: competencies[topic.text], value: topic.value };
    });
  };
  const languagesWordCloudData = () => {
    const languageTopics = wordCloudData.filter((topic) =>
      Object.keys(languages).includes(topic.text)
    );
    return languageTopics.map((topic) => {
      return { text: languages[topic.text], value: topic.value };
    });
  };
  const toolsWordCloudData = () => {
    const toolTopics = wordCloudData.filter((topic) =>
      Object.keys(tools).includes(topic.text)
    );
    return toolTopics.map((topic) => {
      return { text: tools[topic.text], value: topic.value };
    });
  };

  return {
    frameworks: frameworksWordCloudData(),
    competencies: competenciesWordCloudData(),
    languages: languagesWordCloudData(),
    tools: toolsWordCloudData(),
  };
};

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
    "HawaiiClimateDataAPI",
    "EssentialWorkers",
    "PortfolioExample",
    "html-me-something",
    "ScrabbleScorer",
    "NodeJsQuiz",
    "TechJobsPersistent",
    "PasswordGenerator",
  ];

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

export const filterProjects = (
  projects,
  filtersCurrentlyInUse,
  wordCloudData,
  sortValue
) => {
  if ([...filtersCurrentlyInUse].length > 0) {
    let filteredProjectsSet = new Set();
    const frameworkFilters = wordCloudData["frameworks"]
      .map((data) => data.text)
      .filter((topic) => filtersCurrentlyInUse.has(topic));
    const competencyFilters = wordCloudData["competencies"]
      .map((data) => data.text)
      .filter((topic) => filtersCurrentlyInUse.has(topic));
    const languageFilters = wordCloudData["languages"]
      .map((data) => data.text)
      .filter((topic) => filtersCurrentlyInUse.has(topic));
    const toolFilters = wordCloudData["tools"]
      .map((data) => data.text)
      .filter((topic) => filtersCurrentlyInUse.has(topic));
    const orderedFilterGroups = [
      competencyFilters,
      languageFilters,
      frameworkFilters,
      toolFilters,
    ]; // List filters in terms of hierarchy

    const createFilteredProjectsArray = (
      filteredProjectsArray,
      orderedFilterGroups
    ) => {
      const processedLastFilterGroup = orderedFilterGroups.length === 0;

      if (!processedLastFilterGroup) {
        let projectsMatchingFilterGroup = [];
        const filterGroup = orderedFilterGroups[0];
        const userDidNotSelectTopicForFilterGroup = filterGroup.length === 0;

        for (const topic of filterGroup) {
          let projectsMatchingTopic = filteredProjectsArray.filter((project) =>
            project.topics.includes(topic.toLowerCase())
          );
          projectsMatchingFilterGroup = [
            ...projectsMatchingFilterGroup,
            ...projectsMatchingTopic,
          ];
        }

        // if user didn't select topic, assign everything filtered thus far, else assign updated filter even if now empty
        filteredProjectsArray = userDidNotSelectTopicForFilterGroup
          ? filteredProjectsArray
          : projectsMatchingFilterGroup;
        orderedFilterGroups.shift();

        return createFilteredProjectsArray(
          filteredProjectsArray,
          orderedFilterGroups
        );
      } else {
        return filteredProjectsArray;
      }
    };

    const filteredProjectsArray = createFilteredProjectsArray(
      projects,
      orderedFilterGroups
    );
    filteredProjectsArray.forEach((project) =>
      filteredProjectsSet.add(project)
    );

    // filtered projects should be sorted as to reapply the sort the user already applied
    return sortProjects([...filteredProjectsSet], sortValue);
  } else {
    // filtered projects should be sorted as to reapply the sort the user already applied
    return sortProjects(projects, sortValue);
  }
};
