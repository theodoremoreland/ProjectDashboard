import { RepoData } from "../types";

export const defaultOrder = (projects: RepoData[]): RepoData[] => {
    if (projects.length === 0) return [];

    const featuredProjectNames: string[] = [
        "OrderDashboard",
        "EssentialWorkers",
        "PortfolioExample",
        "WebCaesar",
        "Blogz",
        "WeatherDashboard",
        "TypeRace",
        "BellyButtonBiodiversity",
        "JavaScriptQuiz",
        "TopWine",
        "MovieIon",
        "Episodic",
        "HawaiiClimateDataAPI",
        "MyMovieList",
        "ScrabbleScorer",
        "NodeJsQuiz",
    ];
    //.sort(() => Math.random() - 0.5); // Randomize order of first set of featured projects

    featuredProjectNames.push(
        "html-me-something",
        "ShelfCheck",
        "REDB",
        "YelpETL",
        "STLServiceCalls"
    ); // Add remaining featured projects in exact order

    const reposSortedByFeatured: RepoData[] = [
        ...featuredProjectNames.reduce<RepoData[]>((newProjectsArray, name) => {
            const projectMatchingGivenName: RepoData | undefined =
                projects.find((project: RepoData) => project.name === name);

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
