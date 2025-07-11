// React
import { useCallback, useMemo } from 'react';

// Third party
import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

// Custom
import incrementView from '../http/incrementView';
import { TaggedRepoData, View } from '../types';

const useProjectViewTracker = (projectData: TaggedRepoData, view: View) => {
    const queryClient = useQueryClient();

    const incrementViewMutation = useMutation({
        mutationFn: incrementView,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['view-counts'] });
        },
    });

    const handleClick = useCallback(async () => {
        await incrementViewMutation.mutateAsync({
            projectId: String(projectData.id),
            ...view,
        });
    }, [incrementViewMutation, projectData.id, view]);

    const debouncedHandleClick = useMemo(() => {
        return debounce(handleClick, 300);
    }, [handleClick]);

    return {
        debouncedHandleClick,
    };
};

export default useProjectViewTracker;
