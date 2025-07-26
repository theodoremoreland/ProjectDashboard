const getExploreProjectSessionStorageKey = (projectId: number): string => {
    return `explored-project-${projectId}`;
};

export default getExploreProjectSessionStorageKey;
