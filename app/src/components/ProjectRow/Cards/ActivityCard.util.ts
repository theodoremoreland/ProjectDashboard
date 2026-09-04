import { CommitActivityData, Commit } from '../../../types';

export const getCommitsPerWeek = (
    commitActivity: CommitActivityData | undefined
): number[] => {
    if (!commitActivity) {
        return [];
    }

    const allWeeks = commitActivity
        .flatMap((contributor) => contributor.weeks)
        .sort((a, b) => (a?.w || 0) - (b?.w || 0));
    const commitsPerWeek: { [weekStart: number]: number } = {};

    allWeeks.forEach((week) => {
        if (!week.w || !week.c) {
            return;
        }

        commitsPerWeek[week.w] = (commitsPerWeek[week.w] || 0) + week.c;
    });

    return Object.values(commitsPerWeek);
};

export const getRecentDelta = (
    commits: Commit[] | undefined
): [number, number] => {
    if (!commits) {
        return [0, 0];
    }

    const additions: number = commits.reduce(
        (prev, curr) => prev + curr.additions,
        0
    );
    const deletions: number = commits.reduce(
        (prev, curr) => prev + curr.deletions,
        0
    );

    return [additions, -deletions];
};
