// React
import {
    useEffect,
    useState,
    useCallback,
    useContext,
    useRef,
    ReactElement,
} from 'react';

// Context
import { ProjectsContext } from './contexts/ProjectsContext';

// Custom Components
import Analytics from './components/Analytics/Analytics';
import NavBar from './components/NavBar/NavBar';
import ProjectRow from './components/ProjectRow/ProjectRow';
import ToolBar from './components/ToolBar/ToolBar';
import Overview from './components/Modal/Overview/Overview';
import Error from './components/Modal/Error/Error';
import NotAScrollbar from './components/NotAScrollbar/NotAScrollbar';
import Cursor from './components/Cursor/Cursor';

// Custom Styles
import './App.css';

const App = (): ReactElement => {
    // Context
    const { repos, isError, selectedProject, setSelectedProject } =
        useContext(ProjectsContext);

    // Refs
    const titleCardRef = useRef<HTMLElement>(null);
    const intervalRef = useRef<number | undefined>(undefined);
    const projectsSectionRef = useRef<HTMLDivElement>(null);

    // State (boolean)
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
    const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);

    // Handlers
    const handleCloseErrorModal = useCallback(
        () => setShowErrorModal(false),
        []
    );
    const handleShowErrorModal = useCallback(() => setShowErrorModal(true), []);
    const scrollToProject = useCallback((id: string) => {
        // Search for the ID strictly inside the parent container
        const sectionElement = projectsSectionRef.current?.querySelector(
            `#${id}`
        );

        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

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
        const titleCard: HTMLElement | null = titleCardRef.current;
        const shouldSetInterval: boolean | null | undefined =
            repos && titleCard && intervalRef.current === undefined;

        if (shouldSetInterval) {
            intervalRef.current = window.setInterval(() => {
                if (!titleCard) return;

                const titleCardStyle = getComputedStyle(titleCard);

                if (titleCardStyle.visibility === 'hidden') {
                    titleCard.style.display = 'none'; // All this to help with performance

                    window.clearInterval(intervalRef.current);
                }
            }, 500);
        }

        return () => window.clearInterval(intervalRef.current);
    }, [repos]);

    return (
        <>
            <Cursor />
            {showErrorModal && <Error handleClose={handleCloseErrorModal} />}
            <header
                ref={titleCardRef}
                className={`title-card ${repos ? 'transition' : ''}`}
            >
                <h1 className={`app-title ${repos ? 'transition' : ''}`}>
                    Project Dashboard
                </h1>
                {repos ? (
                    <p className="app-subtitle">
                        {repos.length} projects available
                    </p>
                ) : (
                    <p className="app-subtitle loading">
                        Loading projects from GitHub...
                    </p>
                )}
            </header>
            <main>
                <NavBar
                    setShowAnalytics={setShowAnalytics}
                    setShowOverviewModal={setShowOverviewModal}
                />
                <div id="app-content">
                    <div className="row">
                        {repos && (
                            <section id="projects" ref={projectsSectionRef}>
                                {repos &&
                                    repos.map((repo) => {
                                        return (
                                            <ProjectRow
                                                key={repo.name}
                                                projectData={repo}
                                                setSelectedProject={
                                                    setSelectedProject
                                                }
                                            />
                                        );
                                    })}
                            </section>
                        )}
                        {showAnalytics && repos && (
                            <Analytics
                                projects={repos}
                                handleClose={() => setShowAnalytics(false)}
                            />
                        )}
                        {showOverviewModal && (
                            <Overview
                                handleClose={() => setShowOverviewModal(false)}
                            />
                        )}
                        {repos && (
                            <NotAScrollbar
                                scrollToProject={scrollToProject}
                                projects={repos}
                                selectedProject={selectedProject || repos[0]}
                            />
                        )}
                    </div>
                    {/* ! This logic assumes the sidebar, repo count, and limited vertical real estate are enough
                        to warrant a scroll to top button fixed beneath the sidebar. I didn't want to base the
                        logic on the actual scroll position of the app content container because unless I placed the
                        button in the area of the project grid and thus potentially obscuring the projects or being hard
                        to see, it would potentially overlap with the sidebar.
                    */}
                </div>
                <ToolBar setShowOverviewModal={setShowOverviewModal} />
            </main>
        </>
    );
};

export default App;
