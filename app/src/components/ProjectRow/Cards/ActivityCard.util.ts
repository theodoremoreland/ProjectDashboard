import { CommitActivityData } from '../../../types';

export const getCommitsPerWeek = (
    commitActivity: CommitActivityData | undefined
): number[] => {
    if (!commitActivity) {
        return [];
    }

    const allWeeks = commitActivity.flatMap((contributor) => contributor.weeks);
    const commitsPerWeek: { [weekStart: number]: number } = {};

    allWeeks.forEach((week) => {
        if (!week.w || !week.c) {
            return;
        }

        commitsPerWeek[week.w] = (commitsPerWeek[week.w] || 0) + week.c;
    });

    return Object.values(commitsPerWeek);
};
