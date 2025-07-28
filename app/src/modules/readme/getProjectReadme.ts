import axios from 'axios';

const getProjectReadme = async (
    projectName: string = 'ProjectDashboard'
): Promise<string> => {
    let response = await axios.get(
        `https://raw.githubusercontent.com/theodoremoreland/${projectName}/refs/heads/main/README.md`
    );

    if (response.status === 404) {
        response = await axios.get(
            `https://raw.githubusercontent.com/theodoremoreland/${projectName}/refs/heads/master/README.md`
        );
    }

    if (response.status !== 200) {
        throw new Error(
            `Failed to fetch project README for ${projectName}. Status: ${response.status}`
        );
    }

    return response.data;
};

export default getProjectReadme;
