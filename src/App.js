// React
import React, { useEffect, useState, useCallback, useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Context
import { ProjectsContext } from "./contexts/ProjectsContext";

// Custom Components
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid.jsx";

// Custom Styles
import "./reset.css";
import "./App.css";

function App() {
  const { repos, isError } = useContext(ProjectsContext);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = useCallback(() => setShowErrorModal(false), []);
  const handleShowErrorModal = useCallback(() => setShowErrorModal(true), []);

  useEffect(() => {
    if (isError) {
      handleShowErrorModal();
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
        <Sidebar />
        <div>
          <Header />
          {repos !== undefined ? <ProjectGrid projects={repos} /> : null}
        </div>
      </main>
    </>
  );
}

export default App;
