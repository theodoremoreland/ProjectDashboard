// Custom
import { octokit } from '../constants/octokit';
import { REPO_OWNER } from '../constants/RepoOwner';
import { CommitActivityResponse, CommitActivityData } from '../types';

// NOTE: Update to use https://docs.github.com/en/rest/metrics/statistics?apiVersion=2026-03-10#get-all-contributor-commit-activity
export const getCommitActivity = async (
    repo: string
): Promise<CommitActivityData> => {
    const response: CommitActivityResponse = await octokit.request(
        'GET /repos/{owner}/{repo}/stats/commit_activity',
        {
            owner: REPO_OWNER,
            repo,
        }
    );

    if (response.status === 202) {
        throw new Error(
            `GitHub is still calculating commit activity for ${repo}. Please try again later.`
        );
    }

    return response.data;
};
