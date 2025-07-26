// React
import { useEffect } from 'react';

// Third party
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Custom
import incrementView from '../http/incrementView';
import getExploreProjectSessionStorageKey from '../utils/getExploreProjectSessionStorageKey';

/**
 * @returns null
 * This hook increments the explored view count for the project when the component mounts.
 */
const useIncrementExploredViewCount = ({
    projectId,
}: {
    projectId: number;
}) => {
    const queryClient = useQueryClient();

    const incrementViewMutation = useMutation({
        mutationFn: incrementView,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['view-counts'] });
        },
    });

    useEffect(() => {
        const storageKey = getExploreProjectSessionStorageKey(projectId);
        const hasExplored = sessionStorage.getItem(storageKey);

        // Increment explored view count only if not already explored
        if (!hasExplored) {
            sessionStorage.setItem(storageKey, 'true');

            // Call the function to increment the explored view count
            incrementViewMutation.mutate({
                projectId: String(projectId),
                isExploreView: true,
            });
        }
    }, [incrementViewMutation, projectId]);

    return null;
};

export default useIncrementExploredViewCount;
