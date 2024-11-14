import {
    createContext,
    Dispatch,
    SetStateAction,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

// Third party
import { useQuery } from "@tanstack/react-query";

// Controller
import { defaultOrder } from "./ProjectsContext.controller";

// Custom
import { getRepoData } from "../http/getRepoData";
import extractErrorMessage from "../utils/extractErrorMessage";
import backupData from "../data/backup-data.json";

// Types
import { RepoData, TaggedRepoData } from "../types";

interface ProjectsProviderProps {
    children: ReactElement;
}

export const ProjectsContext = createContext({
    repos: undefined as TaggedRepoData[] | undefined,
    updateFeaturedTopics: (() => {}) as (selectedTopic: string) => void,
    selectedProject: null as TaggedRepoData | null,
    setSelectedProject: (() => {}) as Dispatch<
        SetStateAction<TaggedRepoData | null>
    >,
    featuredTopics: new Set<string>(),
    isError: false,
});

const ProjectsContextProvider = ({
    children,
}: ProjectsProviderProps): ReactElement => {
    const [repos, setRepos] = useState<RepoData[] | undefined>(undefined);
    const [selectedProject, setSelectedProject] =
        useState<TaggedRepoData | null>(null);
    const [featuredTopics, setFeaturedTopics] = useState<Set<string>>(
        new Set()
    );
    const taggedRepos: TaggedRepoData[] | undefined = useMemo(() => {
        if (!repos) {
            return;
        }

        return repos.map((repo) => {
            const { topics } = repo;

            return {
                ...repo,
                isFeatured:
                    featuredTopics.size === 0
                        ? true
                        : topics.some((topic) => featuredTopics.has(topic)),
            };
        });
    }, [repos, featuredTopics]);

    const { data, isError, error } = useQuery({
        queryKey: ["repos"],
        queryFn: getRepoData,
        staleTime: 240_000,
        retry: false,
    });

    const updateFeaturedTopics = useCallback(
        (selectedTopic: string) => {
            const topicsCopy = featuredTopics
                ? new Set([...featuredTopics])
                : undefined;

            if (!topicsCopy) {
                return;
            }

            if (topicsCopy.has(selectedTopic)) {
                topicsCopy.delete(selectedTopic);
            } else {
                topicsCopy.add(selectedTopic);
            }

            setFeaturedTopics(topicsCopy);
        },
        [featuredTopics]
    );

    useEffect(() => {
        if (data) {
            const orderedProjects = defaultOrder(data);

            setRepos(orderedProjects);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            setRepos(backupData);

            console.error(extractErrorMessage(error));
        }
    }, [isError, error]);

    return (
        <ProjectsContext.Provider
            value={{
                repos: taggedRepos,
                updateFeaturedTopics,
                selectedProject,
                setSelectedProject,
                featuredTopics,
                isError,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsContextProvider;
