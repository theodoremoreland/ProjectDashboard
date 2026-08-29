// GitHub
import { OctokitResponse } from '@octokit/types';

// Custom
import { octokit } from '../constants/octokit';

// Types
import { CommitActivity } from '../types';

export const getCommitActivity = async (): Promise<CommitActivity[]> => {
    const response: OctokitResponse<CommitActivity[]> = await octokit.request(
        'GET /repos/{owner}/{repo}/stats/commit_activity',
        {
            owner: 'octocat',
            repo: 'hello-world',
        }
    );

    return response.data;
};
