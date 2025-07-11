// Third party
import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
import { ViewCounts } from '../types';

interface ErrorResponse {
    message: string;
}

const VIEW_COUNT_API_URL: string | undefined = import.meta.env
    .VITE_VIEW_COUNT_API_URL;
const VIEW_COUNT_API_KEY: string | undefined = import.meta.env
    .VITE_VIEW_COUNT_API_KEY;

const getViewCounts = async (): Promise<ViewCounts> => {
    try {
        const response: AxiosResponse<ViewCounts> = await axios.get(
            `${VIEW_COUNT_API_URL}`,
            {
                headers: {
                    'x-api-key': VIEW_COUNT_API_KEY,
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError<ErrorResponse> = error;

            throw axiosError.response?.data.message;
        }

        throw error instanceof Error ? error.message : String(error);
    }
};

export default getViewCounts;
