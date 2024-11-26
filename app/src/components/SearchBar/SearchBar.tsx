import {
    useState,
    useContext,
    useCallback,
    useEffect,
    useRef,
    ReactElement,
} from "react";

// Third party
import Fuse, { FuseResult } from "fuse.js";

// Context
import { ProjectsContext } from "../../contexts/ProjectsContext";

// Types
import { TaggedRepoData } from "../../types";

// Images
import CancelIcon from "../../images/icons/cancel.svg?react";

// Styles
import "./SearchBar.css";

const SearchBar = (): ReactElement => {
    const { repos, setSelectedProject } = useContext(ProjectsContext);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<
        FuseResult<TaggedRepoData>[] | TaggedRepoData[] | undefined
    >(repos);
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearchResultClick = useCallback(
        (projectData: TaggedRepoData) => {
            setSearchValue("");
            setSelectedProject(projectData);
        },
        [setSelectedProject]
    );

    const handleCancelClick = useCallback(() => {
        setSearchValue("");
        inputRef?.current?.focus();
    }, [inputRef]);

    useEffect(() => {
        const input = inputRef.current;
        const focusHandler = () => setShowResults(true);

        if (input) {
            input.addEventListener("focus", focusHandler);
        }

        return () => {
            if (input) {
                input.removeEventListener("focus", focusHandler);
            }
        };
    }, [inputRef]);

    useEffect(() => {
        const hasFocus = inputRef?.current === document.activeElement;

        if (hasFocus && searchValue && repos) {
            const fuse = new Fuse(repos, {
                keys: ["name", "topics"],
                threshold: 0.3,
            });
            const results = fuse.search(searchValue);

            results.sort((a, b) => {
                return a.refIndex - b.refIndex;
            });

            setSearchResults(results);
        }
    }, [searchValue, repos]);

    return (
        <>
            {searchValue && showResults && (
                <div
                    id="clickaway-area"
                    onClick={() => setShowResults(false)}
                ></div>
            )}
            <div id="search-bar">
                <input
                    ref={inputRef}
                    id="search"
                    type="text"
                    placeholder="Search..."
                    autoComplete="off"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue && (
                    <span id="delete" onClick={handleCancelClick}>
                        <CancelIcon className="icon" />
                    </span>
                )}
                {searchValue && showResults && (
                    // Wrapper is here solely for the purpose of positioning data attribute (i.e. result count) in desired location
                    <div
                        className="search-results-wrapper"
                        data-result-count={`${
                            searchResults?.length || 0
                        } results`}
                    >
                        <ul id="search-results">
                            {searchResults && searchResults?.length > 0 ? (
                                searchResults.map((searchResult) => {
                                    const repo =
                                        Object.prototype.hasOwnProperty.call(
                                            searchResult,
                                            "item"
                                        )
                                            ? (
                                                  searchResult as FuseResult<TaggedRepoData>
                                              ).item
                                            : undefined;

                                    if (!repo) {
                                        return null;
                                    }

                                    const matchingTopics = new Fuse(
                                        repo.topics,
                                        {
                                            threshold: 0.3,
                                        }
                                    );
                                    const topics =
                                        matchingTopics.search(searchValue);

                                    return (
                                        <li
                                            key={repo.name}
                                            className="search-result"
                                            onClick={() =>
                                                handleSearchResultClick(repo)
                                            }
                                        >
                                            <p className="title">{repo.name}</p>
                                            <img
                                                src={repo.image}
                                                alt={repo.name}
                                            />
                                            <div className="topics">
                                                {topics.length > 0 ? (
                                                    topics.map(
                                                        (topicResult) => {
                                                            const topic =
                                                                topicResult.item;

                                                            return (
                                                                <span
                                                                    key={topic}
                                                                    className="topic"
                                                                >
                                                                    {topic}
                                                                </span>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <p className="none">
                                                        No matching topics
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="search-result">
                                    No results found
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
