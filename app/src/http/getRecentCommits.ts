// GitHub
import { Endpoints } from '@octokit/types';

// Custom
import { octokit } from '../constants/octokit';
import { REPO_OWNER } from '../constants/RepoOwner';

type RecentCommitsResponse =
    Endpoints['GET /repos/{owner}/{repo}/commits']['response'];

type RecentCommitsData =
    Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];

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
