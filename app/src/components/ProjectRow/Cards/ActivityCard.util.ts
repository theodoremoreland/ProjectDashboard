import { CommitActivityData } from '../../../types';

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

// export const getRecentDelta = (
//     commitActivity: CommitActivityData | undefined,
//     commitCount: number = 10
// ): [number, number] => {
//     if (!commitActivity) {
//         return [0, 0];
//     }

//     const allWeeks = commitActivity
//         .flatMap((contributor) => contributor.weeks)
//         .sort((a, b) => (a?.w || 0) - (b?.w || 0));
//     const mostRecentWeeks = allWeeks.slice(0, commitCount);
// };
