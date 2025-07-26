// React
import { useMemo } from 'react';

// Custom
import { ViewCounts } from '../types';

/**
 * Custom hook to get the explored count for a project.
 * @param {ViewCounts | undefined} viewCounts - The view counts object from context.
 * @param {number} projectId - The ID of the project to get the explored count for.
 * @param {boolean} isError - Flag indicating if there was an error fetching explored counts.
 * @returns {string | null | 'Unregistered'} The formatted explored count or null if error and '' if explored count is not available.
 */
const useExploredCount = (
    viewCounts: ViewCounts | undefined,
    projectId: number,
    isError: boolean
): string | null => {
    const viewCount: number | string | null = useMemo(() => {
        if (isError) {
            return null;
        }

        if (viewCounts && viewCounts[projectId]) {
            return viewCounts[projectId].explore_views || '';
        }

        return '';
    }, [viewCounts, projectId, isError]);

    const formattedExploredCount: number | string | null = useMemo(() => {
        if (viewCount === null || viewCount === '') {
            return viewCount;
        }

        return `${viewCount.toLocaleString()} explored`;
    }, [viewCount]);

    return formattedExploredCount;
};

export default useExploredCount;
