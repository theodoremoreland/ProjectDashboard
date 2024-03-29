import React from "react";

// Custom components
import README from "../../README/README";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({ projectData }) => {
    return (
        <section className="project-detail">
            <h1 className="project-detail__title">{projectData.name}</h1>
            <p className="project-detail__description">{projectData.description}</p>

            <h2>README.md preview</h2>
            <p>Below is a preview of this project's root README. Some functionality may be lost.</p>
            <article>
                <README name={projectData.name} link={projectData.readme} />
            </article>
        </section>
    );
};

export default ProjectDetail;
