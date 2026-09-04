import { CommitActivityData, Commit } from '../../../types';

export const getCommitsPerWeek = (
    commitActivity: CommitActivityData | undefined
): number[] => {
    if (!commitActivity) {
        return [];
    }

    const allDays: number[] = commitActivity
        .sort((a, b) => (a.week || 0) - (b.week || 0))
        .flatMap((activity) => activity.days);

    return allDays;
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
