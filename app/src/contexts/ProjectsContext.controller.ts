import FeaturedProjects from '../constants/FeaturedProjects';

import { RepoData, PairwiseJaccardSimilarity } from '../types';

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

/**
 * Jaccard Similarity = (Shared topics) ÷ (Total unique topics)
 * The numerator (the intersection) requires counting the topics that exist in both the target repository and the Mega-List. This isolates the overlapping technologies.
 * The denominator (the union) requires counting every unique topic combined from the target repository and the Mega-List. By grouping them all together and removing duplicates, this number naturally equals the total count of unique topics across your entire portfolio.
 * Dividing the intersection count by the union count produces the final similarity percentage.
 * @param {TaggedRepoData[]} repos
 * @returns {number} Jaccard similarity score
 */
export const calculatePairwiseJaccardSimilarity = (
    repos: RepoData[]
): PairwiseJaccardSimilarity => {
    const jaccardScores: PairwiseJaccardSimilarity = {};
    let maxJaccardScore: number = 0;
    let minJaccardScore: number = 1;

    if (repos.length === 1) {
        return {};
    }

    for (const baseRepo of repos) {
        const baseTopics: Set<string> = new Set(baseRepo.topics);
        let totalJaccardScore: number = 0;
        let closestMatch: number = 0;

        for (const referenceRepo of repos) {
            if (referenceRepo.name === baseRepo.name) {
                continue; // Skip the selected project itself
            }

            let intersectionCount: number = 0;

            for (const topic of referenceRepo.topics) {
                if (baseTopics.has(topic)) {
                    intersectionCount++;
                }
            }

            const unionCount: number = new Set([
                ...baseTopics,
                ...referenceRepo.topics,
            ]).size;

            const jaccardScore: number =
                unionCount === 0 ? 0 : intersectionCount / unionCount;

            totalJaccardScore += jaccardScore;
            closestMatch = Math.max(closestMatch, jaccardScore);
        }

        const averageJaccardScore: number =
            totalJaccardScore / (repos.length - 1);
        maxJaccardScore = Math.max(maxJaccardScore, averageJaccardScore);
        minJaccardScore = Math.min(minJaccardScore, averageJaccardScore);

        jaccardScores[baseRepo.name] = {
            closestMatch,
            jaccardSimilarityStandard: averageJaccardScore,
            jaccardSimilarityNormalized: 0, // Placeholder for normalized score calculation
        };
    }

    const range: number = maxJaccardScore - minJaccardScore;

    Object.keys(jaccardScores).forEach((projectName) => {
        const averageScore: number =
            jaccardScores[projectName].jaccardSimilarityStandard;

        jaccardScores[projectName].jaccardSimilarityNormalized =
            range === 0 ? 1 : (averageScore - minJaccardScore) / range;
    });

    return jaccardScores;
};
