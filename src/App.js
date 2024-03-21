// React
import React, { useEffect, useState, useCallback } from "react";

// Controller
import { getRepoData } from "./App.controller.js";

// Third party
import { useQuery } from "@tanstack/react-query";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Custom Components
import ProjectGrid from "./components/ProjectGrid/ProjectGrid.js";

// Custom
import extractErrorMessage from "./utils/extractErrorMessage.js";
import backupData from "./data/backup-data.json";

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
        {repos !== undefined ? <ProjectGrid projects={repos} /> : null}
      </main>
    </>
  );
}

export default App;
