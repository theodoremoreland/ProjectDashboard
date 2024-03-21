import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function TimelineLoadingScreen() {

    return (
        <SkeletonTheme color="#242b31d7" highlightColor="#444">
            <div className="filtersContainer">
                <div className="mb-5" xs={6}>
                    <Skeleton  height={"180%"}/>
                </div>
                <div className="mb-5" xs={6}>
                    <Skeleton height={"180%"}/>
                </div>
                <div className="mb-5" xs={6}>
                    <Skeleton height={"180%"}/>
                </div>
                <div className="mb-5" xs={6}>
                    <Skeleton height={"180%"}/>
                </div>
            </div>
            <div className="timeline">
                <div>
                    <Skeleton height={"100%"} width={"100%"}/>
                </div>
            </div>
            <div className="sortButtonGroupContainer">
                <div xs={{span: 6, offset: 6}}>
                    <Skeleton height={"150%"}/>
                </div>
            </div>
        </SkeletonTheme>
    );

};