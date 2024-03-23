// React
import React, { useMemo } from "react";

// Custom Components
import Project from "./Project/Project";

import { defaultOrder } from "./ProjectGrid.controller";

// Custom styles
import "./ProjectGrid.css";

const ProjectGrid = ({ projects }) => {
  const orderedProjects = useMemo(() => defaultOrder(projects), [projects]);

  return (
    <section id="project-grid">
      {orderedProjects &&
        orderedProjects.map((project) => {
          return <Project key={project.name} projectData={project} />;
        })}
    </section>
  );
};

export default ProjectGrid;
