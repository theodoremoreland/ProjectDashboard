// React
import React, { useEffect, useState, useCallback } from "react";

// Controller
import { getRepoData } from "./App.controller.js";

// Third party
import { useQuery } from "@tanstack/react-query";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Custom Components
import Timeline from "./components/Timeline/Timeline";
import TimelineLoadingScreen from "./components/Timeline/LoadingScreen/LoadingScreen";

// Custom
import extractErrorMessage from "./utils/extractErrorMessage.js";
import backupData from "./data/backup-data.json";

// Images
import octocatIcon from "./images/Octocat.png";
import linkedInIcon from "./images/LI-In-Bug.png";

// Custom Styles
import "./reset.css";
import "./App.css";

function App() {
  const [repos, setRepos] = useState(undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = useCallback(() => setShowErrorModal(false), []);
  const handleShowErrorModal = useCallback(() => setShowErrorModal(true), []);

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
      handleShowErrorModal();
      setRepos(backupData);
    }
  }, [isError, handleShowErrorModal]);

  return (
    <>
      <Modal
        show={showErrorModal}
        onHide={handleCloseErrorModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Something went wrong</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There was an issue loading projects from GitHub. As a result, backup
          data will be used instead. The information that you see may be
          outdated and some features may not work as intended.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseErrorModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="overlay" />
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
      <main className="content">
        <header className="timelineContainerHeader">
          <h2 className="timelineContainerTitle">Projects</h2>
          <ul>
            <li className="timelineContainerSubtitle">
              A dynamically generated list of my GitHub projects via GitHub API.
            </li>
            <li className="timelineContainerSubtitle">
              Projects can be filtered and sorted.
            </li>
            <li className="timelineContainerSubtitle">
              Click on the blue icon next to a project's name to render its
              README.
            </li>
            <li className="timelineContainerSubtitle">
              Click on the project's thumbnail to view its code on GitHub.
            </li>
          </ul>
          <div className="headerIconsContainer">
            <a
              href="https://github.com/theodoremoreland"
              rel="noopener noreferrer"
              target="_blank"
              title="My GitHub Profile"
            >
              <Image className="octocatIcon" src={octocatIcon} fluid />
            </a>
            <a
              href="https://www.linkedin.com/in/theodore-moreland/"
              rel="noopener noreferrer"
              target="_blank"
              title="My LinkedIn Profile"
            >
              <Image className="linkedInIcon" src={linkedInIcon} fluid />
            </a>
          </div>
        </header>
        <section className="timelineContainer">
          {repos !== undefined ? (
            <Timeline projects={repos} />
          ) : (
            <TimelineLoadingScreen />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
