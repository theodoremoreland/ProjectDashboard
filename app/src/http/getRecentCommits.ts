// Custom
import { octokit } from '../constants/octokit';
import { RecentCommitsResponse, RecentCommitsData } from '../types';
import { REPO_OWNER } from '../constants/RepoOwner';

export const getRecentCommits = async (
    repo: string
): Promise<RecentCommitsData> => {
    const response: RecentCommitsResponse = await octokit.request(
        `GET /repos/{owner}/{repo}/commits`,
        {
            owner: REPO_OWNER,
            repo,
            per_page: 5,
            headers: {
                'X-GitHub-Api-Version': '2026-03-10',
            },
        }
    );

    return response.data;
};
