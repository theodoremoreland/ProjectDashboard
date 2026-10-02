import { TaggedRepoData } from '../types';

/**
 * Jaccard Similarity = (Shared topics) ÷ (Total unique topics)
 * The numerator (the intersection) requires counting the topics that exist in both the target repository and the Mega-List. This isolates the overlapping technologies.
 * The denominator (the union) requires counting every unique topic combined from the target repository and the Mega-List. By grouping them all together and removing duplicates, this number naturally equals the total count of unique topics across your entire portfolio.
 * Dividing the intersection count by the union count produces the final similarity percentage.
 * @param {TaggedRepoData[]} repos
 * @param {string} selectedProjectName
 * @param {string[]} selectedProjectTopics
 * @returns {number} Jaccard similarity score
 */
const getPairwiseJaccard = (
    repos: TaggedRepoData[],
    selectedProjectName: string,
    selectedProjectTopics: string[]
): {
    high: number; // how similar is the most similar repo to the selected project .. when paired against its closest sibling, there is an N probability that a topic in their combined pool belongs to both repos
    average: number; // how similar is every repos to the selected project .. the exact probability that a topic picked from that combined list belongs to both projects
    normalized: number; // how typical is the selected project compared to all other repos .. typicality percentile
} => {
    const selectedProjectTopicSet: Set<string> = new Set(selectedProjectTopics);
    let highestJaccardScore: number = 0;
    let totalJaccardScore: number = 0;

    for (const repo of repos) {
        if (repo.name === selectedProjectName) {
            continue; // Skip the selected project itself
        }

        const topics: Set<string> = new Set(repo.topics);

        let repoIntersectionCount: number = 0;
        for (const topic of topics) {
            if (selectedProjectTopicSet.has(topic)) {
                repoIntersectionCount++;
            }
        }

        const repoUnionCount: number = new Set([
            ...topics,
            ...selectedProjectTopicSet,
        ]).size;
        const jaccardScore: number =
            repoUnionCount === 0 ? 0 : repoIntersectionCount / repoUnionCount;

        totalJaccardScore += jaccardScore;
        highestJaccardScore = Math.max(highestJaccardScore, jaccardScore);
    }

    const jaccardSimilarity = totalJaccardScore / (repos.length - 1);

    return {
        high: highestJaccardScore,
        average: jaccardSimilarity,
        normalized: 0, // Placeholder for normalized score calculation
    };
};

export default getPairwiseJaccard;

// Liklihood that at least one topic is shared between this and another
// Liklihood that another repo has all of the topics in this repo
