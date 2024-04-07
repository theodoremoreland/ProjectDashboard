import React, { useMemo } from 'react';

// MUI
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';

// Images
import { ReactComponent as DeploymentIcon } from '../../images/deployed-code.svg';
import { ReactComponent as StarIcon } from '../../images/star.svg';
import { ReactComponent as WeightIcon } from '../../images/weight.svg';
import { ReactComponent as CodeIcon } from '../../images/code.svg';

// Styles
import './Analytics.css';

const getTopTechnologies = (projects, limit=10) => {
    const topicsToIgnore = [
        'personal',
        'professional',
        'coursework',
        'exercise',
        'lc101',
        'data-analytics-bootcamp',
        'full-stack-bootcamp',
        'lindenwood-university',
        'web-development',
        'data-engineering',
        'data-analytics',
        'mobile-development',
        'web-scraping',
        'unit-testing',
        'rest-api',
    ];
    const technologies = {};

    projects.forEach((project) => {
        project.topics.forEach((technology) => {
            if (technologies[technology]) {
                technologies[technology] += 1;
            } else {
                technologies[technology] = 1;
            }
        });
    });

    const dataset = Object.entries(technologies)
                        .sort((a, b) => b[1] - a[1])
                        .filter(([technology, _]) => !topicsToIgnore.includes(technology))
                        .map(([technology, count]) => ({ technology, count }))
                        .slice(0, limit);

    return dataset;
};

const getProjectFileSizes = (projects) => {
    let totalSize = 0;

    projects.forEach((project) => {
        totalSize += project.size;
    });

    return totalSize;
};


const getCourseCounts = (projects) => {
    const lc101 = { id: 1, value: 0, label: 'LC101' };
    const dataAnalyticsBootCamp = { id: 2, value: 0, label: 'Wash U Data' };
    const fullStackFlex = { id: 3, value: 0, label: 'SMU Full Stack' };
    const lindenwoodUniversity = { id: 4, value: 0, label: 'Lindenwood' };
    const other = { id: 5, value: 0, label: 'Other' };

    projects.forEach((project) => {
        if (project.topics.includes('lc101')) {
            lc101.value += 1;
        } else if (project.topics.includes('data-analytics-bootcamp')) {
            dataAnalyticsBootCamp.value += 1;
        } else if (project.topics.includes('full-stack-bootcamp')) {
            fullStackFlex.value += 1;
        } else if (project.topics.includes('lindenwood-university')) {
            lindenwoodUniversity.value += 1;
        } else if (project.topics.includes('coursework') || project.topics.includes('exercise')) {
            // If the project is not associated with a course, count it as an academic project
            other.value += 1;
        }
    });

    return [lc101, dataAnalyticsBootCamp, fullStackFlex, lindenwoodUniversity, other];
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
    const totalSize = useMemo(() => getProjectFileSizes(projects), [projects]);
    const technologies = useMemo(() => getTopTechnologies(projects), [projects]);

    return (
        <section id="analytics">
            <header>
                <button type="button" title="Close" className="x" onClick={handleClose}>x</button>
            </header>
            <article>
                <div id="kpis">
                    <div id="total-features" className="kpi">
                        <span className='label'>Projects featured</span>
                        <span className='value'>
                             <CodeIcon className='icon'/> {totalFeatures}
                        </span>
                    </div>
                    <div id="total-deployments" className="kpi">
                        <span className='label'>Active deployments</span>
                        <span className='value'>
                            <DeploymentIcon className='icon'/> {totalDeployments}
                        </span>
                    </div>
                    <div id="total-stars" className="kpi">
                        <span className='label'>Stars received</span>
                        <span className='value'>
                           <StarIcon className='icon' /> {totalStars}+
                        </span>
                    </div>
                    <div id="total-size" className="kpi">
                        <span className='label'>Total file size</span>
                        <span className='value'>
                            <WeightIcon className='icon' /> {totalSize.toLocaleString()}mb
                        </span>
                    </div>
                </div>
                <div id='charts'>
                <div id='pie-charts'>
                    <h2 className='pie-chart-title'>Projects by context</h2>
                    <PieChart
                        colors={mangoFusionPalette}
                        series={[
                            {
                            data: contextCounts,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                    />
                    <h2 className='pie-chart-title'>Academic projects by course</h2>
                    <PieChart
                        colors={mangoFusionPalette}
                        series={[
                            {
                            data: courseCounts,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                    />
                </div>
                <div id="bar-chart-container">
                    <BarChart
                        colors={mangoFusionPalette}
                        dataset={technologies}
                        series={[{ dataKey: 'count', label: 'Count of projects using technology'}]}
                        xAxis={[{ scaleType: 'band', dataKey: "technology", label: 'Top 10 technologies used' }]}
                        
                    />
                </div>
                </div>
            </article>
        </section>
    );
};

export default Analytics;