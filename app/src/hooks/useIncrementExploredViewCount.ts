// React
import { useRef, useEffect } from 'react';

// Third party
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Custom
import incrementView from '../http/incrementView';

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

    const hasIncrementExploredViewCountRef = useRef<boolean>(false);

    const incrementViewMutation = useMutation({
        mutationFn: incrementView,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['view-counts'] });
        },
    });

    useEffect(() => {
        // Increment explored view count only once
        if (!hasIncrementExploredViewCountRef.current) {
            hasIncrementExploredViewCountRef.current = true;

            // Call the function to increment the explored view count
            incrementViewMutation.mutate({
                projectId: String(projectId),
                isLearnMoreView: true,
            });
        }
    }, [incrementViewMutation, projectId]);

    return null;
};

export default useIncrementExploredViewCount;
