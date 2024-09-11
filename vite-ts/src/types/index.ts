export interface RepoData {
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
};

export interface TaggedRepoData extends RepoData {
    isFeatured: boolean;
};

export interface SortValue {
    name: string;
    direction: string;
};