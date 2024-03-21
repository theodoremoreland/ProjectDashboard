// React
import React, { useMemo } from "react";

// Custom Components
import Project from "./Project/Project";

import { defaultOrder } from "./ProjectGrid.controller";

// Custom styles
import "./ProjectGrid.css";

export default function ProjectGrid(props) {
  const { projects } = props;

  const orderedProjects = useMemo(() => defaultOrder(projects), [projects]);

  return (
    <section id="project-grid">
      {orderedProjects &&
        orderedProjects.map((project, index) => {
          return <Project key={index} projectData={project} />;
        })}
    </section>
  );
}
