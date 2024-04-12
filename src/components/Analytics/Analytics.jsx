import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// MUI
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';

// Controller
import { 
    getCourseCounts,
    getContextCounts,
    getTotalDeployments,
    getTotalFeatures,
    getTotalStars,
    getProjectFileSizes,
    getTopTechnologies
} from './Analytics.controller';

// Images
import { ReactComponent as DeploymentIcon } from '../../images/deployed-code.svg';
import { ReactComponent as StarIcon } from '../../images/star.svg';
import { ReactComponent as WeightIcon } from '../../images/weight.svg';
import { ReactComponent as CodeIcon } from '../../images/code.svg';

// Styles
import './Analytics.css';


const Analytics = ({ projects, handleClose }) => {
    const courseCounts = useMemo(() => getCourseCounts(projects), [projects]);
    const contextCounts = useMemo(() => getContextCounts(projects), [projects]);
    const technologies = useMemo(() => getTopTechnologies(projects), [projects]);

    const smallNumberIntervalRef = useRef(null);
    const largeNumberIntervalRef = useRef(null);

    const totalFeaturesRef = useRef(getTotalFeatures(projects));
    const totalDeploymentsRef = useRef(getTotalDeployments(projects));
    const totalStarsRef = useRef(getTotalStars(projects));
    const totalSizeRef = useRef(getProjectFileSizes(projects));

    const [totalDeployments, setTotalDeployments] = useState(0); 
    const [totalFeatures, setTotalFeatures] = useState(0); 
    const [totalStars, setTotalStars] = useState(0); 
    const [totalSize, setTotalSize] = useState(0); 

    const incrementSmallKpis = useCallback(() => {
        setTotalDeployments((prev) => {
            if (prev < totalDeploymentsRef.current) {
                return prev + 1;
            }

            return prev;
        });
        setTotalFeatures((prev) => {
            if (prev < totalFeaturesRef.current) {
                return prev + 1;
            }

            return prev;
        });
        setTotalStars((prev) => {
            if (prev < totalStarsRef.current) {
                return prev + 1;
            }

            return prev;
        });
    }, []);

    const incrementLargeKpis = useCallback(() => {
        setTotalSize((prev) => {
            if (prev <= totalSizeRef.current) {
                return prev + 20_000;
            }

            return totalSizeRef.current;
        });
    }, []);

    useEffect(() => {
        smallNumberIntervalRef.current = setInterval(incrementSmallKpis, 5);
        largeNumberIntervalRef.current = setInterval(incrementLargeKpis, 5);

        return () => {
            clearTimeout(smallNumberIntervalRef.current);
            clearTimeout(largeNumberIntervalRef.current);
        }
    }, [incrementLargeKpis, incrementSmallKpis]);

    useEffect(() => {
        const areSmallKpiIncrementsComplete = 
            totalDeployments === totalDeploymentsRef.current && 
            totalFeatures === totalFeaturesRef.current && 
            totalStars === totalStarsRef.current;

        if (areSmallKpiIncrementsComplete) {
            clearTimeout(smallNumberIntervalRef.current);
        }
    }, [totalDeployments, totalFeatures, totalStars]);

    useEffect(() => {
        const areLargeKpiIncrementsComplete = totalSize === totalSizeRef.current;

        if (areLargeKpiIncrementsComplete) {
            clearTimeout(largeNumberIntervalRef.current);
        }
    }, [totalSize]);


    return (
        <section id="analytics">
            <div className='row'>
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
                            <WeightIcon className='icon' /> {totalSize.toLocaleString()}+ mb
                        </span>
                    </div>
                </div>
                <button type="button" title="Close" className="close-button" onClick={handleClose}>Close</button>
            </div>
            <div className='row'>
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
        </section>
    );
};

export default Analytics;