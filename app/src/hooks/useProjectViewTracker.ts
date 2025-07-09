// React
import { useCallback, useMemo } from 'react';

// Third party
import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

// Custom
import addProject from '../http/addProject';
import incrementView from '../http/incrementView';
import { TaggedRepoData } from '../types';

type View =
    | { isGitHubView: true; isDemoView?: false }
    | { isDemoView: true; isGitHubView?: false };

const useProjectViewTracker = (
    projectData: TaggedRepoData,
    viewCount: number | null,
    view: View
) => {
    const queryClient = useQueryClient();

    const addProjectMutation = useMutation({
        mutationFn: addProject,
    });

    const incrementViewMutation = useMutation({
        mutationFn: incrementView,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['view-counts'] });
        },
    });

    const handleClick = useCallback(async () => {
        if (viewCount === null) {
            await addProjectMutation.mutateAsync({
                projectId: String(projectData.id),
                projectName: projectData.name,
            });
        }

        await incrementViewMutation.mutateAsync({
            projectId: String(projectData.id),
            isDemoView: view.isDemoView ?? false,
            isGitHubView: view.isGitHubView ?? false,
        });
    }, [
        viewCount,
        addProjectMutation,
        incrementViewMutation,
        projectData.id,
        projectData.name,
        view,
    ]);

    const debouncedHandleClick = useMemo(() => {
        return debounce(handleClick, 300);
    }, [handleClick]);

    return {
        debouncedHandleClick,
    };
};

export default useProjectViewTracker;
