import { createContext, useEffect, useState } from "react";

// Third party
import { useQuery } from "@tanstack/react-query";

// Custom
import { getRepoData } from "../http/getRepoData.js";
import extractErrorMessage from "../utils/extractErrorMessage.js";
import backupData from "../data/backup-data.json";

export const ProjectsContext = createContext();

const ProjectsContextProvider = ({ children }) => {
  const [repos, setRepos] = useState(undefined);

  const { data, isError } = useQuery({
    queryKey: ["repos"],
    queryFn: getRepoData,
    onError: (err) => console.error(extractErrorMessage(err)),
    cacheTime: 300_000,
    staleTime: 240_000,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setRepos(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setRepos(backupData);
    }
  }, [isError]);

  return (
    <ProjectsContext.Provider value={{ repos, isError }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
