import { createContext, ReactElement, useEffect, useState } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import getViewCounts from '../../http/getViewCounts';
import extractErrorMessage from '../../utils/extractErrorMessage';

// Types
import { ViewCounts } from '../../types';

interface ViewCountProviderProps {
    children: ReactElement;
}

export const ViewCountContext = createContext({
    viewCounts: undefined as ViewCounts | undefined,
    isError: false,
    isFetched: false,
    isFetching: false,
});

const ViewCountProvider = ({
    children,
}: ViewCountProviderProps): ReactElement => {
    const [viewCounts, setViewCounts] = useState<ViewCounts | undefined>(
        undefined
    );

    const { data, isError, error, isFetched, isFetching } = useQuery({
        queryKey: ['view-counts'],
        queryFn: getViewCounts,
        staleTime: 240_000,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            setViewCounts(data);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            console.error(extractErrorMessage(error));
        }
    }, [isError, error]);

    return (
        <ViewCountContext.Provider
            value={{
                viewCounts,
                isError,
                isFetched,
                isFetching,
            }}
        >
            {children}
        </ViewCountContext.Provider>
    );
};

export default ViewCountProvider;
