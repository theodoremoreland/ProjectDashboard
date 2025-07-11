// React
import { useMemo } from 'react';

// Custom
import { ViewCounts } from '../types';

/**
 * Custom hook to get the view count for a project.
 * @param {ViewCounts | undefined} viewCounts - The view counts object from context.
 * @param {number} projectId - The ID of the project to get the view count for.
 * @param {boolean} isError - Flag indicating if there was an error fetching view counts.
 * @returns {string | null | 'Unregistered'} The formatted view count or null if error and 'Unregistered' if view count is not available.
 */
const useViewCount = (
    viewCounts: ViewCounts | undefined,
    projectId: number,
    isError: boolean
): string | null => {
    const viewCount: number | string | null = useMemo(() => {
        if (isError) {
            return null;
        }

        if (viewCounts && viewCounts[projectId]) {
            return (
                viewCounts[projectId].github_views +
                viewCounts[projectId].demo_views
            );
        }

        return 'Unregistered';
    }, [viewCounts, projectId, isError]);

    const formattedViewCount: number | string | null = useMemo(() => {
        if (viewCount === null || viewCount === 'Unregistered') {
            return viewCount;
        }

        if (viewCount === 1) {
            return '1 view';
        }

        return `${viewCount.toLocaleString()} views`;
    }, [viewCount]);

    return formattedViewCount;
};

export default useViewCount;
