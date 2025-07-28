import axios from 'axios';

const getProjectReadme = async (projectName: string): Promise<string> => {
    try {
        const response = await axios.get(
            `https://raw.githubusercontent.com/theodoremoreland/${projectName}/master/README.md`
        );

        return response.data;
    } catch (error) {
        console.error(
            `Error fetching README for ${projectName} from master branch:`,
            error
        );

        throw new Error(`Failed to fetch project README for ${projectName}.`);
    }
};

export default getProjectReadme;
