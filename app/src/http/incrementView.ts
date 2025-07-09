// Third party
import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
import { ViewCounts } from '../types';

type IncrementViewRequest =
    | {
          projectId: string;
          isGitHubView: boolean;
      }
    | {
          projectId: string;
          isDemoView: boolean;
      };

interface ErrorResponse {
    message: string;
}

const VIEW_COUNT_API_URL: string | undefined = import.meta.env
    .VITE_VIEW_COUNT_API_URL;

const incrementView = async (
    incrementViewRequest: IncrementViewRequest
): Promise<ViewCounts> => {
    try {
        const response: AxiosResponse<ViewCounts> = await axios.patch(
            `${VIEW_COUNT_API_URL}`,
            incrementViewRequest
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
