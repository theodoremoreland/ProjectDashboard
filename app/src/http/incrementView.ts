// Third party
import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
import { ViewCounts, View } from '../types';

type IncrementViewRequest = { projectId: string } & View;

interface ErrorResponse {
    message: string;
}

const VIEW_COUNT_API_URL: string | undefined = import.meta.env
    .VITE_VIEW_COUNT_API_URL;
const VIEW_COUNT_API_KEY: string | undefined = import.meta.env
    .VITE_VIEW_COUNT_API_KEY;

const incrementView = async (
    incrementViewRequest: IncrementViewRequest
): Promise<ViewCounts> => {
    try {
        const response: AxiosResponse<ViewCounts> = await axios.patch(
            `${VIEW_COUNT_API_URL}`,
            incrementViewRequest,
            {
                headers: {
                    'x-api-key': VIEW_COUNT_API_KEY,
                    'Content-Type': 'application/json',
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

export default incrementView;
