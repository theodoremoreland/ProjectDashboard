import React from "react";

// Custom components
import README from "../../README/README";

// Custom styles
import "./ProjectDetail.css";

const ProjectDetail = ({projectData}) => {
    return (
        <section className="project-detail">
            <README name={projectData.name} link={projectData.readme} />
        </section>
    );
};

export default ProjectDetail;
