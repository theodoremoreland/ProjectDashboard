import FeaturedProjects from '../constants/FeaturedProjects';

import { RepoData } from '../types';

export const defaultOrder = (projects: RepoData[]): RepoData[] => {
    if (projects.length === 0) return [];

    const reposSortedByFeatured: RepoData[] = [
        ...FeaturedProjects.reduce<RepoData[]>((newProjectsArray, name) => {
            const projectMatchingGivenName: RepoData | undefined =
                projects.find((project: RepoData) => project.name === name);

            return projectMatchingGivenName
                ? [...newProjectsArray, projectMatchingGivenName]
                : newProjectsArray;
        }, []),
        ...projects.filter(
            (project) => !FeaturedProjects.includes(project.name)
        ),
    ];

    return reposSortedByFeatured;
};
