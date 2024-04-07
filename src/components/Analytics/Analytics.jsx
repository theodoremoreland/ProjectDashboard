import React, { useMemo } from 'react';

import { PieChart } from '@mui/x-charts/PieChart';

// Styles
import './Analytics.css';

const getCourseCounts = (projects) => {
    const lc101 = { id: 1, value: 0, label: 'LaunchCode LC101' };
    const dataAnalyticsBootCamp = { id: 2, value: 0, label: 'Wash U Data Analytics Boot Camp' };
    const fullStackFlex = { id: 3, value: 0, label: 'SMU Full Stack Flex' };
    const lindenwoodUniversity = { id: 4, value: 0, label: 'Lindenwood University' };

    projects.forEach((project) => {
        if (project.topics.includes('lc101')) {
            lc101.value += 1;
        } else if (project.topics.includes('data-analytics-bootcamp')) {
            dataAnalyticsBootCamp.value += 1;
        } else if (project.topics.includes('full-stack-bootcamp')) {
            fullStackFlex.value += 1;
        } else if (project.topics.includes('lindenwood-university')) {
            lindenwoodUniversity.value += 1;
        }
    });

    return [lc101, dataAnalyticsBootCamp, fullStackFlex, lindenwoodUniversity];
};

const getContextCounts = (projects) => {
    const personal = { id: 1, value: 0, label: 'Personal' };
    const professional = { id: 2, value: 0, label: 'Professional' };
    const academic = { id: 3, value: 0, label: 'Academic' };

    projects.forEach((project) => {
        if (project.topics.includes('personal')) {
            personal.value += 1;
        } else if (project.topics.includes('professional')) {
            professional.value += 1;
        } else if (project.topics.includes('coursework') || project.topics.includes('exercise')) {
            academic.value += 1;
        }
    });

    return [personal, professional, academic];
};

const getTotalDeployments = (projects) => {
    let totalDeployments = 0;

    projects.forEach((project) => {
        totalDeployments += project.demo_link ? 1 : 0; // If there is a demo link, count the project as deployed
    });

    return totalDeployments;
};

const getTotalFeatures = (projects) => {
    let totalFeatures = 0;

    projects.forEach((project) => {
        totalFeatures += project.topics.length > 0 ? 1 : 0;
    });

    return totalFeatures;
};

const getTotalStars = (projects) => {
    let totalStars = 0;

    projects.forEach((project) => {
        totalStars += project.stars;
    });

    return totalStars;
};

const Analytics = ({ projects, handleClose }) => {
    const courseCounts = useMemo(() => getCourseCounts(projects), [projects]);
    const contextCounts = useMemo(() => getContextCounts(projects), [projects]);
    const totalDeployments = useMemo(() => getTotalDeployments(projects), [projects]);
    const totalFeatures = useMemo(() => getTotalFeatures(projects), [projects]);
    const totalStars = useMemo(() => getTotalStars(projects), [projects]);

    return (
        <section id="analytics">
            <header>
                <button type="button" title="Close" className="x" onClick={handleClose}>x</button>
            </header>
            <h1>Analytics</h1>
            <div id="kpis">
                <div id="total-features" className="kpi">
                    <span>Total features</span>
                    <span>{totalFeatures}</span>
                </div>
                <div id="total-deployments" className="kpi">
                    <span>Total deployments</span>
                    <span>{totalDeployments}</span>
                </div>
                <div id="total-stars" className="kpi">
                    <span>Total stars</span>
                    <span>{totalStars}</span>
                </div>
            </div>
            <div id="scatter">

            </div>
            <div id='pie-charts'>
                <PieChart
                    series={[
                        {
                        data: courseCounts,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <PieChart
                    series={[
                        {
                        data: contextCounts,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
        </section>
    );
};

export default Analytics;