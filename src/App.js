// React
import React, { useEffect, useState, useCallback, useContext } from "react";

// Context
import { ProjectsContext } from "./contexts/ProjectsContext";

// Custom Components
import Analytics from "./components/Analytics/Analytics.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail.jsx";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid.jsx";
import Help from "./components/Modal/Help/Help.jsx";
import Error from "./components/Modal/Error/Error.jsx";

// Custom Styles
import "./reset.css";
import "./App.css";

const App = () => {
  const { repos, isError, selectedProject, setSelectedProject } =
    useContext(ProjectsContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const handleCloseErrorModal = useCallback(() => setShowErrorModal(false), []);
  const handleShowErrorModal = useCallback(() => setShowErrorModal(true), []);

  useEffect(() => {
    if (isError) {
      handleShowErrorModal();
    }
  }, [isError, handleShowErrorModal]);

  return (
    <>
      {showErrorModal && <Error handleClose={handleCloseErrorModal} />}
      <header className={`titleCard ${repos ? "transition" : ""}`}>
        <h1 className={`appTitle ${repos ? "transition" : ""}`}>
          Project List
        </h1>
        {repos ? (
          <p className="appSubtitle">{repos.length} projects available</p>
        ) : (
          <p className="appSubtitle loading">Loading projects from GitHub...</p>
        )}
      </header>
      <main>
        <NavBar
          setShowAnalytics={setShowAnalytics}
          setShowHelpModal={setShowHelpModal}
        />
        <div id="app-content">
          <Sidebar />
          {repos !== undefined ? (
            <ProjectGrid
              projects={repos}
              setSelectedProject={setSelectedProject}
            />
          ) : null}
          {selectedProject && (
            <ProjectDetail
              projectData={selectedProject}
              handleClose={() => setSelectedProject(null)}
            />
          )}
          {showAnalytics && (
            <Analytics
              projects={repos}
              handleClose={() => setShowAnalytics(false)}
            />
          )}
          {showHelpModal && (
            <Help handleClose={() => setShowHelpModal(false)} />
          )}
        </div>
      </main>
    </>
  );
};

export default App;
