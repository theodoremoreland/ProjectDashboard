// React
import { ReactElement, useEffect, useRef } from 'react';

// Styles
import './DigitalRain.css';

interface Props {
    topics: string[];
    shouldAnimate: boolean;
}

const DigitalRain = ({ topics, shouldAnimate }: Props): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && shouldAnimate) {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            const ctx = canvas.getContext('2d');

            const fontSize: number = 16;
            const columns: number = canvas.width / fontSize;

            // Represents the vertical position of each char in each column. On draw each char's Y position is multiplied by font-size
            const topicMatrix: { char: string; pos: number }[][] = [];
            let topicMatrixIndex: number = 0;

            while (topicMatrix.length < columns) {
                const word: string = topics[topicMatrixIndex];
                const wordByLetterPosition: { char: string; pos: number }[] =
                    word
                        .split('')
                        .reverse()
                        .map((letter: string, index: number) => {
                            return {
                                char: letter,
                                pos: index * -1,
                            };
                        });

                topicMatrix.push(wordByLetterPosition);

                if (topicMatrixIndex === topics.length - 1) {
                    topicMatrixIndex = 0;
                }

                topicMatrixIndex++;
            }

            console.log(topicMatrix);

            const draw = () => {
                if (!ctx) return;
                // Draw a translucent background to create the trailing/fade effect
                // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                // ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#e2e2e2';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < topicMatrix.length; i++) {
                    const word: { char: string; pos: number }[] =
                        topicMatrix[i];
                    const wordLength: number = word.length;
                    const firstLetterObj: { char: string; pos: number } =
                        word[wordLength - 1];

                    for (let j = 0; j < wordLength; j++) {
                        word[j].pos++;
                        // x coordinate is column index * font size; y coordinate is tracked in array
                        ctx.fillText(
                            word[j].char,
                            i * fontSize,
                            word[j].pos * fontSize
                        );
                    }

                    // Send drop back to top randomly after it crosses the bottom of the screen
                    if (
                        firstLetterObj.pos * fontSize > canvas.height &&
                        Math.random() > 0.975
                    ) {
                        word.forEach((charObj, index) => {
                            charObj.pos = index * -1;
                        });
                    }
                }
            };

            // Keep responsive on resize
            // window.addEventListener('resize', () => {
            //     canvas.width = window.innerWidth;
            //     canvas.height = window.innerHeight;
            // });

            //intervalRef.current = setInterval(draw, 100);
        } else if (!shouldAnimate) {
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [shouldAnimate, topics]);

    return <canvas ref={canvasRef} className="DigitalRain" />;
};

export default DigitalRain;
