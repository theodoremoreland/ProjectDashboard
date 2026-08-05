// GitHub
import { Octokit } from '@octokit/core';
import { OctokitResponse } from '@octokit/types';

// Types
import { CommitData } from '../types';

const accessToken = import.meta.env.VITE_GITHUB_API_ACCESS_TOKEN;
const octokit = new Octokit({ auth: accessToken });

export const getRecentCommits = async (repo: string): Promise<CommitData[]> => {
    const response: OctokitResponse<CommitData[]> = await octokit.request(
        `GET /repos/{owner}/{repo}/commits`,
        {
            owner: 'theodoremoreland',
            repo,
            per_page: 5,
            headers: {
                'X-GitHub-Api-Version': '2026-03-10',
            },
        }
    );

    return response.data;
};
