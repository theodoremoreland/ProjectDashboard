import { RepoData } from '../types';

export const defaultOrder = (projects: RepoData[]): RepoData[] => {
    if (projects.length === 0) return [];

    const featuredProjectNames: string[] = [
        'OrderDashboard',
        'EssentialWorkers',
        'ProjectList',
        'PortfolioExample',
        'WebCaesar',
        'Blogz',
        'WeatherDashboard',
        'TypeRace',
        'BellyButtonBiodiversity',
        'JavaScriptQuiz',
        'HawaiiClimateDataAPI',
        'TopWine',
    ];
    //.sort(() => Math.random() - 0.5); // Randomize order of first set of featured projects

    featuredProjectNames.push(
        'Episodic',
        'html-me-something',
        'MovieIon',
        'ShelfCheck',
        'REDB',
        'YelpETL',
        'STLServiceCalls',
        'MyMovieList',
        'ScrabbleScorer',
        'NodeJsQuiz'
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
