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
    const chosenColumnIndexRef = useRef<number | undefined>(undefined);
    const chosenTopicIndexRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && shouldAnimate) {
            const dpr: number = window.devicePixelRatio || 1;
            const ctx: CanvasRenderingContext2D | null =
                canvas.getContext('2d');
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;

            const fontSize: number = 16;
            const columns: number = canvas.width / fontSize;
            // Track the vertical 'y' position of each column
            const columnPositions: number[] = Array.from({
                length: columns,
            }).fill(1) as number[];

            const katakana: string[] =
                'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890'.split(
                    ''
                );
            const topicsThatFitCanvas: string[] = topics.filter(
                (topic: string) => {
                    return topic.length * fontSize < canvas.height;
                }
            );
            let renderingTopic:
                | {
                      char: string;
                      ordinal: number;
                      hasRendered: boolean;
                  }[]
                | undefined = topicsThatFitCanvas[chosenTopicIndexRef.current]
                .split('')
                .map((letter: string, index: number) => {
                    return {
                        char: letter,
                        ordinal: index,
                        hasRendered: false,
                    };
                });

            const draw = () => {
                if (!ctx) return;
                // Draw a translucent background to create the trailing/fade effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#e2e2e297';
                ctx.font = fontSize + 'px monospace';

                // Check if row is chosen
                // Randomly select a row if not
                // Check if word can be displayed (i.e. difference between position nad canvas height / fontsize > word)
                // Check if word of chosen row meets display threshold
                // If not, display word and increment display threshold
                // Once meeting display threshold set chosen row to undefined
                if (chosenColumnIndexRef.current === undefined) {
                    chosenColumnIndexRef.current = Math.floor(
                        Math.random() * columnPositions.length
                    );
                }

                if (renderingTopic === undefined) {
                    renderingTopic = topicsThatFitCanvas[
                        chosenTopicIndexRef.current
                    ]
                        .split('')
                        .map((letter: string, index: number) => {
                            return {
                                char: letter,
                                ordinal: index,
                                hasRendered: false,
                            };
                        });
                }

                for (let i = 0; i < columnPositions.length; i++) {
                    const numberOfCharactersLeftToRender: number =
                        renderingTopic.reduce((prev, curr) => {
                            if (!curr.hasRendered) {
                                return prev + 1;
                            } else {
                                return prev;
                            }
                        }, 0);
                    const hasEnoughSpaceToRenderRemainingTopicCharacters: boolean =
                        canvas.height - i * fontSize >
                        numberOfCharactersLeftToRender * fontSize;

                    if (chosenColumnIndexRef.current === i && renderingTopic) {
                        ctx.fillStyle = '#e2ff04';

                        for (let j = 0; j < renderingTopic.length; j++) {
                            const char = renderingTopic[j];

                            if (char.hasRendered === false) {
                                ctx.fillText(
                                    char.char,
                                    i * fontSize,
                                    columnPositions[i] * fontSize
                                );
                                char.hasRendered = true;
                                break;
                            }
                        }
                    } else {
                        const randomKatakanaCharacter: string =
                            katakana[
                                Math.floor(Math.random() * katakana.length)
                            ];
                        ctx.fillStyle = '#e2e2e2c0';
                        ctx.fillText(
                            randomKatakanaCharacter,
                            i * fontSize,
                            columnPositions[i] * fontSize
                        );
                    }

                    if (
                        columnPositions[i] * fontSize > canvas.height &&
                        Math.random() > 0.975
                    ) {
                        columnPositions[i] = 0;
                    }

                    if (
                        renderingTopic &&
                        renderingTopic[renderingTopic.length - 1].hasRendered
                    ) {
                        chosenColumnIndexRef.current = undefined;
                        renderingTopic = undefined;
                        chosenTopicIndexRef.current = Math.floor(
                            Math.random() * topicsThatFitCanvas.length
                        );
                    }

                    columnPositions[i]++;
                }
            };

            // Keep responsive on resize
            // window.addEventListener('resize', () => {
            //     canvas.width = window.innerWidth;
            //     canvas.height = window.innerHeight;
            // });

            // intervalRef.current = setInterval(draw, 100);
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
