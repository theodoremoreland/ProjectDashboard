// React
import { useEffect } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { getProjectReadme, getImagesFromReadme } from '../../modules/readme';

export const useReadmeImages = (projectName: string) => {
    // Query to fetch the project README
    const {
        data: readme,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['projectReadme', projectName],
        queryFn: () => getProjectReadme(projectName),
        refetchOnWindowFocus: false,
    });

    // Extract images from the README
    const images: string[] = getImagesFromReadme(readme || '');

    // Effect to handle errors
    useEffect(() => {
        if (isError) {
            console.error('Failed to fetch README or extract images.');
        }
    }, [isError]);

    return { images, isFetching, isError };
};
