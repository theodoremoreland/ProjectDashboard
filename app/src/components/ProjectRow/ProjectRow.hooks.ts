// React
import { useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import extractErrorMessage from '../../utils/extractErrorMessage';
import { getTopLanguages } from '../../http/getTopLanguages';
import { getSonarMeasures } from '../../http/getSonarMeasures';
import { getRecentCommits } from '../../http/getRecentCommits';
import { getCommitActivity } from '../../http/getCommitActivity';
import getProjectReadme from '../../http/getProjectReadme';

// Types
import { Commit, CommitActivityData } from '../../types';

export const useTopLanguagesData = (projectName: string, enabled: boolean) => {
    const {
        data: topLanguagesData,
        isFetching: isTopLanguagesFetching,
        isError: isTopLanguagesError,
        error: topLanguagesError,
    } = useQuery({
        enabled: enabled,
        queryKey: ['topLanguages', projectName],
        queryFn: () => getTopLanguages(projectName),
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (isTopLanguagesError) {
            console.error(extractErrorMessage(topLanguagesError));
        }
    }, [isTopLanguagesError, topLanguagesError]);

    return {
        topLanguagesData,
        isTopLanguagesFetching,
        isTopLanguagesError,
        topLanguagesError,
    };
};

export const useReadme = (projectName: string, enabled: boolean) => {
    const {
        data: readmeData,
        error: readmeError,
        isError: isReadmeError,
        isFetching: isReadmeFetching,
    } = useQuery({
        enabled: enabled,
        queryKey: ['readme', projectName],
        queryFn: () => getProjectReadme(projectName),
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (isReadmeError) {
            console.error(`Failed to fetch README.md ${readmeError}`);
        }
    }, [isReadmeError, readmeError]);

    return {
        readmeData,
        readmeError,
        isReadmeError,
        isReadmeFetching,
    };
};

export const useSonarData = (projectName: string, enabled: boolean) => {
    const {
        data: sonarMeasuresData,
        error: sonarMeasuresError,
        isError: isSonarMeasuresError,
        isFetching: isSonarMeasuresFetching,
    } = useQuery({
        enabled: enabled,
        queryKey: ['sonarMeasures', projectName],
        queryFn: () => getSonarMeasures(projectName),
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (isSonarMeasuresError) {
            console.error('Failed to fetch Sonar measures');
        }
    }, [isSonarMeasuresError, sonarMeasuresError]);

    return {
        sonarMeasuresData,
        sonarMeasuresError,
        isSonarMeasuresError,
        isSonarMeasuresFetching,
    };
};

export const useRecentCommits = (projectName: string, enabled: boolean) => {
    const [commits, setCommits] = useState<Commit[] | undefined>(undefined);

    const {
        data: recentCommitsData,
        isError: isRecentCommitsError,
        isFetching: isRecentCommitsFetching,
        error: recentCommitsError,
    } = useQuery({
        enabled: enabled,
        queryKey: ['commits', projectName],
        queryFn: () => getRecentCommits(projectName),
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (recentCommitsData) {
            setCommits(recentCommitsData);
        }
    }, [recentCommitsData]);

    useEffect(() => {
        if (isRecentCommitsError) {
            setCommits([]);

            console.error(extractErrorMessage(recentCommitsError));
        }
    }, [isRecentCommitsError, recentCommitsError]);

    return {
        commits,
        isRecentCommitsError,
        isRecentCommitsFetching,
        recentCommitsError,
    };
};

export const useCommitActivity = (projectName: string, enabled: boolean) => {
    const [commitActivity, setCommitActivity] = useState<
        CommitActivityData | undefined
    >(undefined);

    const {
        data: commitActivityData,
        isError: isCommitActivityError,
        isFetching: isCommitActivityFetching,
        error: commitActivityError,
    } = useQuery({
        enabled: enabled,
        queryKey: ['commitActivity', projectName],
        queryFn: () => getCommitActivity(projectName),
        staleTime: Infinity,
        retry: 4,
        retryDelay: 1500,
    });

    useEffect(() => {
        if (commitActivityData) {
            setCommitActivity(commitActivityData);
        }
    }, [commitActivityData]);

    useEffect(() => {
        if (isCommitActivityError) {
            setCommitActivity([]);
        }
    }, [isCommitActivityError, commitActivityError]);
    return {
        commitActivity,
        isCommitActivityError,
        isCommitActivityFetching,
        commitActivityError,
    };
};
