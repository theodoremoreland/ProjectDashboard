import { createContext, useCallback, useEffect, useState, useRef } from "react";

// Third party
import { useQuery } from "@tanstack/react-query";

// Controller
import { defaultOrder } from "./ProjectsContext.controller.js";

// Custom
import { getRepoData } from "../http/getRepoData.js";
import extractErrorMessage from "../utils/extractErrorMessage.js";
import backupData from "../data/backup-data.json";

export const ProjectsContext = createContext();

const ProjectsContextProvider = ({ children }) => {
  const [repos, setRepos] = useState(undefined);
  const featuredTopics = useRef(new Set());

  const { data, isError } = useQuery({
    queryKey: ["repos"],
    queryFn: getRepoData,
    onError: (err) => console.error(extractErrorMessage(err)),
    cacheTime: 300_000,
    staleTime: 240_000,
    retry: false,
  });

  const updateFeaturedTopics = useCallback((selectedTopic) => {
    const topicsRef = featuredTopics.current;

    if (!topicsRef) {
      return;
    }

    if (topicsRef.has(selectedTopic)) {
      topicsRef.delete(selectedTopic);
    } else {
      topicsRef.add(selectedTopic);
    }

    console.log(featuredTopics.current);
  }, []);

  useEffect(() => {
    if (data) {
      const orderedProjects = defaultOrder(data);

      setRepos(orderedProjects);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setRepos(backupData);
    }
  }, [isError]);

  return (
    <ProjectsContext.Provider
      value={{ repos, updateFeaturedTopics, featuredTopics, isError }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
