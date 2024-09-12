// React
import {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
  ReactElement,
} from "react";

// Context
import { ProjectsContext } from "./contexts/ProjectsContext";

// Custom Components
import Analytics from "./components/Analytics/Analytics";
import Sidebar from "./components/Sidebar/Sidebar";
import NavBar from "./components/NavBar/NavBar";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid";
import Help from "./components/Modal/Help/Help";
import Error from "./components/Modal/Error/Error";

// Custom Styles
import './reset.css';
import "./App.css";

const App = (): ReactElement => {
  const { repos, isError, selectedProject, setSelectedProject } =
    useContext(ProjectsContext);
  const titleCardRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);
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

  /**
   * Checks to see when titleCard animation is complete
   * then sets the display to none as to remove it from
   * the DOM's render tree (hoping this helps with performance of shine animations).
   */
  useEffect(() => {
    const titleCard = titleCardRef.current;
    const shouldSetInterval =
      repos && titleCard && intervalRef.current === undefined;

    if (shouldSetInterval) {
      intervalRef.current = window.setInterval(() => {
        const titleCardStyle = getComputedStyle(titleCard);

        if (titleCardStyle.visibility === "hidden") {
          titleCard.style.display = "none"; // All this to help with performance

          window.clearInterval(intervalRef.current);
        }
      }, 500);
    }

    return () => window.clearInterval(intervalRef.current);
  }, [repos]);

  return (
    <>
      {showErrorModal && <Error handleClose={handleCloseErrorModal} />}
      <header
        ref={titleCardRef}
        className={`titleCard ${repos ? "transition" : ""}`}
      >
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
          {repos &&
            <ProjectGrid
              projects={repos}
              setSelectedProject={setSelectedProject}
            />
          }
          {selectedProject && (
            <ProjectDetail
              projectData={selectedProject}
              handleClose={() => setSelectedProject(null)}
            />
          )}
          {showAnalytics && repos && (
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
