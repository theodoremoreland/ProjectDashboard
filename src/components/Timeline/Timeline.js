// React
import React, { useMemo } from "react";

// Custom Components
import Project from "./Project/Project";

import { defaultOrder } from "./Timeline.controller";

// Custom styles
import "./Timeline.css";

export default function Timeline(props) {
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
