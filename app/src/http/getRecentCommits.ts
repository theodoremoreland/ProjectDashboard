// GitHub
import { Octokit } from '@octokit/core';
import { OctokitResponse } from '@octokit/types';

// Types
import { CommitResponse, CommitData } from '../types';

const accessToken = import.meta.env.VITE_GITHUB_API_ACCESS_TOKEN;
const octokit = new Octokit({ auth: accessToken });

export const getRecentCommits = async (): Promise<CommitData[]> => {
    const response: OctokitResponse<CommitResponse> = await octokit.request(
        'GET /search/commits',
        {
            q: 'author:theodoremoreland',
            sort: 'committer-date',
            order: 'desc',
            per_page: 10,
        }
    );

    return response.data.items;
};
