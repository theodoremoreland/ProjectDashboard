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
    | { isLearnMoreView: true };

export type ViewCounts = {
    [project_id: string]: {
        last_updated: Date;
        github_views: number;
        demo_views: number;
        learn_more_views: number;
    };
};

export enum LocalStorageKeys {
    DONT_SHOW_INTRO = 'dontShowIntro',
    INTRO_MODAL_LAST_SHOWN_DATE = 'introModalLastShownDate',
}
