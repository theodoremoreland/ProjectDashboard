import { TaggedRepoData } from '../types';

/**
 * Jaccard Similarity = (Shared topics) ÷ (Total unique topics)
 * The numerator (the intersection) requires counting the topics that exist in both the target repository and the Mega-List. This isolates the overlapping technologies.

The denominator (the union) requires counting every unique topic combined from the target repository and the Mega-List. By grouping them all together and removing duplicates, this number naturally equals the total count of unique topics across your entire portfolio.

Dividing the intersection count by the union count produces the final similarity percentage.
 * @param repos
 * @param selectedproject
 */
const getPairwiseJaccard = (
    repos: TaggedRepoData[],
    selectedproject: TaggedRepoData
) => {};

export default getPairwiseJaccard;
