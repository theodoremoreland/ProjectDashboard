// GitHub
import { Endpoints } from '@octokit/types';

// Custom
import { octokit } from '../constants/octokit';
import { REPO_OWNER } from '../constants/RepoOwner';

type CommitActivityResponse =
    Endpoints['GET /repos/{owner}/{repo}/stats/commit_activity']['response'];

type CommitActivityData =
    Endpoints['GET /repos/{owner}/{repo}/stats/commit_activity']['response']['data'];

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

    return response.data;
};
