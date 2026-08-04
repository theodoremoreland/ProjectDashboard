// React
import {
    useEffect,
    useState,
    useCallback,
    useContext,
    useRef,
    ReactElement,
} from 'react';

// Custom Hooks
import useIncrementAppViewCount from './hooks/useIncrementAppViewCount';

// Context
import { ProjectsContext } from './contexts/ProjectsContext';

// Custom Components
import Analytics from './components/Analytics/Analytics';
import NavBar from './components/NavBar/NavBar';
import ProjectRow from './components/ProjectRow/ProjectRow';
import ToolBar from './components/ToolBar/ToolBar';
import Overview from './components/Modal/Overview/Overview';
import Error from './components/Modal/Error/Error';
import Scrollbar from './components/Scrollbar/Scrollbar';

// Images
import ArrowUpwardIcon from './assets/images/icons/arrow_upward.svg?react';

// Custom Styles
import './App.css';

const App = (): ReactElement => {
    // Context
    const { repos, isError, setSelectedProject } = useContext(ProjectsContext);

    // Custom Hooks
    useIncrementAppViewCount();

    // Refs
    const titleCardRef = useRef<HTMLElement>(null);
    const intervalRef = useRef<number | undefined>(undefined);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const appContentContainerRef = useRef<HTMLDivElement>(null);

    // State (boolean)
    const [showScrollToTopButton, setShowScrollToTopButton] =
        useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
    const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);

    // Handlers
    const handleCloseErrorModal = useCallback(
        () => setShowErrorModal(false),
        []
    );
    const handleShowErrorModal = useCallback(() => setShowErrorModal(true), []);

    // Other
    const scrollToTopOfAppContent = useCallback(() => {
        const appContentContainer: HTMLDivElement | null =
            appContentContainerRef.current;

        if (appContentContainer) {
            appContentContainer.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, []);

    const onAppContentContainerScroll = useCallback(() => {
        const appContentContainer: HTMLDivElement | null =
            appContentContainerRef.current;

        if (appContentContainer) {
            const scrollTop = appContentContainer.scrollTop;
            const scrollHeight =
                appContentContainer.scrollHeight -
                appContentContainer.clientHeight;
            const scrolledRatio = scrollTop / scrollHeight;

            const content = appContentContainer;
            const track = trackRef.current;
            const thumb = thumbRef.current;

            if (!content || !track || !thumb) return;

            const scrollableHeight =
                content.scrollHeight - content.clientHeight;
            const trackRemainingHeight =
                track.clientHeight - thumb.clientHeight;

            if (scrollableHeight > 0) {
                const scrollPercentage = content.scrollTop / scrollableHeight;
                thumb.style.top = `${scrollPercentage * trackRemainingHeight}px`;
            }

            if (scrolledRatio > 0.25) {
                setShowScrollToTopButton(true);
            } else {
                setShowScrollToTopButton(false);
            }
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
                <div className="move-arrows"></div>
                <div id="app-content">
                    <div className="row">
                        {repos && (
                            <section
                                id="projects"
                                ref={appContentContainerRef}
                                onScroll={onAppContentContainerScroll}
                            >
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
                        <Scrollbar
                            projects={repos}
                            trackRef={trackRef}
                            thumbRef={thumbRef}
                        />
                    </div>
                    {/* ! This logic assumes the sidebar, repo count, and limited vertical real estate are enough
                        to warrant a scroll to top button fixed beneath the sidebar. I didn't want to base the
                        logic on the actual scroll position of the app content container because unless I placed the
                        button in the area of the project grid and thus potentially obscuring the projects or being hard
                        to see, it would potentially overlap with the sidebar.
                    */}
                    {showScrollToTopButton && (
                        <div id="scroll-to-top-container" className="row">
                            <button
                                title="Scroll to top"
                                aria-label="Scroll to top"
                                type="button"
                                className="scroll-to-top"
                                onClick={scrollToTopOfAppContent}
                            >
                                <ArrowUpwardIcon className="icon" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="move-arrows"></div>
                <ToolBar setShowOverviewModal={setShowOverviewModal} />
            </main>
        </>
    );
};

export default App;
