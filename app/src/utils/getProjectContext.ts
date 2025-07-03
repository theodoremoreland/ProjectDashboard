import { TaggedRepoData } from '../types';

const getProjectContext = (
    projectData: TaggedRepoData
): 'Coursework / Exercise' | 'Professional' | 'Personal' => {
    if (
        projectData.topics?.some(
            (topic) => topic === 'coursework' || topic === 'exercise'
        )
    ) {
        return 'Coursework / Exercise';
    } else if (projectData.topics?.some((topic) => topic === 'professional')) {
        return 'Professional';
    } else {
        return 'Personal';
    }
};

export default getProjectContext;
