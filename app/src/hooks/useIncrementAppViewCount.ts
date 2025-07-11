// React
import { useRef, useEffect } from 'react';

// Third party
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Custom
import incrementView from '../http/incrementView';

/**
 * @returns null
 * This hook increments this app's (Project List's) view count when the App component mounts.
 */
const useIncrementAppViewCount = () => {
    const queryClient = useQueryClient();

    const hasIncrementAppViewCountRef = useRef<boolean>(false);

    const incrementViewMutation = useMutation({
        mutationFn: incrementView,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['view-counts'] });
        },
    });

    useEffect(() => {
        // Increment app view count only once
        if (!hasIncrementAppViewCountRef.current) {
            hasIncrementAppViewCountRef.current = true;
            // Call the function to increment the app view count
            incrementViewMutation.mutate({
                projectId: String(737351449),
                isDemoView: true,
            });
        }
    }, [incrementViewMutation]);

    return null; // This hook does not return anything
};

export default useIncrementAppViewCount;
