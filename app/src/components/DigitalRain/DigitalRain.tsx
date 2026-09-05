// React
import { ReactElement, useEffect, useState, useRef, useCallback } from 'react';

// Styles
import './DigitalRain.css';

interface Props {
    topics: string[];
}

interface Props2 {
    topics: string[];
    letteringSpeed: number;
    rainDelay: number;
}

export const RainRow = ({
    topics,
    letteringSpeed,
    rainDelay,
}: Props2): ReactElement => {
    const letterIndex = useRef<number>(0);
    const wordIndex = useRef<number>(0);
    const intervalId = useRef<number | undefined>(undefined);
    const timeoutId = useRef<number | undefined>(undefined);
    const [isIntervalActive, setIsIntervalActive] = useState<boolean>(true);
    const [characters, setCharacters] = useState<string[]>([
        topics[wordIndex.current][0],
    ]);

    const indexWord = useCallback(() => {
        if (wordIndex.current === topics.length - 1) {
            wordIndex.current = 0;
        } else {
            wordIndex.current += 1;
        }

        setCharacters([topics[wordIndex.current][0]]);
        setIsIntervalActive(true);
        timeoutId.current = undefined;
    }, [wordIndex, topics]);

    const indexLetter = useCallback(() => {
        const word: string = topics[wordIndex.current];
        const isLastLetter: boolean = letterIndex.current === word.length - 1;
        console.log(word);

        // If last letter
        if (isLastLetter) {
            letterIndex.current = 0;
            setIsIntervalActive(false);
            // Countdown before switching words
            timeoutId.current = setTimeout(indexWord, rainDelay);

            // Stop adding letters
            clearInterval(intervalId.current);
        } else {
            letterIndex.current += 1;
            setCharacters((c) => [
                ...c,
                topics[wordIndex.current][letterIndex.current],
            ]);
        }
    }, [indexWord, rainDelay, topics]);

    console.log(wordIndex.current, letterIndex.current);

    useEffect(() => {
        if (intervalId.current === undefined && isIntervalActive) {
            // Interval for adding letters
            intervalId.current = setInterval(indexLetter, letteringSpeed);
        }

        return () => {
            if (intervalId.current !== undefined) {
                clearInterval(intervalId.current);
                intervalId.current = undefined;
            }
        };
    }, [letteringSpeed, rainDelay, topics, indexLetter, isIntervalActive]);

    useEffect(() => {
        return () => {
            if (timeoutId.current !== undefined) {
                clearTimeout(timeoutId.current);
                timeoutId.current = undefined;
            }
        };
    }, []);

    return (
        <div className="RainColumn">
            {characters.map((letter) => {
                return <div className="letter">{letter}</div>;
            })}
        </div>
    );
};

const DigitalRain = ({ topics }: Props): ReactElement => {
    return (
        <div className="DigitalRain">
            <RainRow topics={topics} letteringSpeed={125} rainDelay={3_000} />
        </div>
    );
};

export default DigitalRain;
