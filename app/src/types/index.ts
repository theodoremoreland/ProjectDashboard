import { Endpoints } from '@octokit/types';

export interface RepoData {
    id: number;
    name: string;
    url: string;
    desc: string;
    date_created: string;
    date_updated: string;
    topics: string[];
    image: string;
    demo_link: string;
    readme: string;
    size: number;
    stars: number;
}

export interface TaggedRepoData extends RepoData {
    isFeatured: boolean;
}

export interface TopicCounts {
    frameworks: { [key: string]: number };
    competencies: { [key: string]: number };
    languages: { [key: string]: number };
    tools: { [key: string]: number };
}

export type View =
    | { isGitHubView: true }
    | { isDemoView: true }
    | { isExploreView: true };

export type ViewCounts = {
    [project_id: string]: {
        last_updated: Date;
        github_views: number;
        demo_views: number;
        explore_views: number;
    };
};

export type RecentCommitsResponse =
    Endpoints['GET /repos/{owner}/{repo}/commits']['response'];

export type RecentCommitsData =
    Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];

export type CommitActivityResponse =
    Endpoints['GET /repos/{owner}/{repo}/stats/commit_activity']['response'];

export type CommitActivityData =
    Endpoints['GET /repos/{owner}/{repo}/stats/commit_activity']['response']['data'];
