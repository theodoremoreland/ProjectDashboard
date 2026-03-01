import { createContext, ReactElement, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { getRecentCommits } from '../../http/getRecentCommits';
import extractErrorMessage from '../../utils/extractErrorMessage';

// Types
import { CommitData } from '../../types';

interface CommitProviderProps {
    children: ReactElement;
}

export const CommitContext = createContext({
    commits: undefined as CommitData[] | undefined,
    isError: false,
});

const CommitContextProvider = ({
    children,
}: CommitProviderProps): ReactElement => {
    const [commits, setCommits] = useState<CommitData[] | undefined>(undefined);
    const { data, isError, error } = useQuery({
        queryKey: ['commits'],
        queryFn: getRecentCommits,
        staleTime: 240_000,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            setCommits(data);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            setCommits([]);

            console.error(extractErrorMessage(error));
        }
    }, [isError, error]);

    return (
        <CommitContext.Provider
            value={{
                commits,
                isError,
            }}
        >
            {children}
        </CommitContext.Provider>
    );
};

export default CommitContextProvider;
