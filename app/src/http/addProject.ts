// Third party
import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
import { ViewCounts } from '../types';

interface AddProjectRequest {
    projectId: string;
    projectName: string;
}

interface ErrorResponse {
    message: string;
}

const VIEW_COUNT_API_URL: string | undefined = import.meta.env
    .VITE_VIEW_COUNT_API_URL;

const addProject = async (
    addProjectRequest: AddProjectRequest
): Promise<ViewCounts> => {
    try {
        const response: AxiosResponse<ViewCounts> = await axios.post(
            `${VIEW_COUNT_API_URL}`,
            addProjectRequest
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

export default addProject;
