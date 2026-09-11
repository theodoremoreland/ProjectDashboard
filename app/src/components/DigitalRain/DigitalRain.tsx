// React
import { ReactElement, useCallback, useEffect, useRef, useMemo } from 'react';

// Custom
import { properCase } from './DigitalRain.utils';

// Styles
import './DigitalRain.css';

interface Props {
    topics: string[];
    shouldAnimate: boolean;
}

const FONT_SIZE: number = 16;
const KATAKANA: string[] =
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890'.split('');

const DigitalRain = ({ topics, shouldAnimate }: Props): ReactElement => {
    const casedTopics = useMemo(() => properCase(topics), [topics]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number | undefined>(undefined);
    const lastAnimate = useRef<number>(0);
    const chosenColumnIndexRef = useRef<number | undefined>(undefined);
    const chosenTopicIndexRef = useRef<number>(0);

    const size = useCallback(() => {
        if (!canvasRef.current) return;

        const dpr: number = window.devicePixelRatio || 1;
        canvasRef.current.width = canvasRef.current.clientWidth * dpr;
        canvasRef.current.height = canvasRef.current.clientHeight * dpr;
    }, []);

    useEffect(() => {
        size();

        window.addEventListener('resize', size);

        return () => window.removeEventListener('resize', size);
    }, [size]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas && shouldAnimate) {
            const ctx: CanvasRenderingContext2D | null =
                canvas.getContext('2d');

            const columns: number = canvas.width / FONT_SIZE;
            // Track the vertical 'y' position of each column
            const columnPositions: number[] = Array.from({
                length: columns,
            }).fill(1) as number[];

            const topicsThatFitCanvas: string[] = casedTopics.filter(
                (topic: string) => {
                    return topic.length * FONT_SIZE < canvas.height;
                }
            );
            let renderingTopic:
                | {
                      char: string;
                      hasRendered: boolean;
                  }[]
                | undefined = topicsThatFitCanvas[chosenTopicIndexRef.current]
                .split('')
                .map((letter: string) => {
                    return {
                        char: letter,
                        hasRendered: false,
                    };
                });

            const draw = () => {
                if (!ctx) return;
                // Draw a translucent background to create the trailing/fade effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#e2e2e2c0';
                ctx.font = FONT_SIZE + 'px custom-regular';

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
                        renderingTopic?.reduce((prev, curr) => {
                            if (!curr.hasRendered) {
                                return prev + 1;
                            } else {
                                return prev;
                            }
                        }, 0) || 0;
                    const hasEnoughSpaceToRenderRemainingTopicCharacters: boolean =
                        canvas.height - i * FONT_SIZE >
                        numberOfCharactersLeftToRender * FONT_SIZE;

                    if (chosenColumnIndexRef.current === i && renderingTopic) {
                        ctx.fillStyle = '#e2ff04';

                        for (let j = 0; j < renderingTopic.length; j++) {
                            const char = renderingTopic[j];

                            if (char.hasRendered === false) {
                                ctx.fillText(
                                    char.char,
                                    i * FONT_SIZE,
                                    columnPositions[i] * FONT_SIZE
                                );
                                char.hasRendered = true;
                                break;
                            }
                        }
                    } else {
                        const randomKatakanaCharacter: string =
                            KATAKANA[
                                Math.floor(Math.random() * KATAKANA.length)
                            ];
                        ctx.fillStyle = '#e2e2e2c0';
                        ctx.fillText(
                            randomKatakanaCharacter,
                            i * FONT_SIZE,
                            columnPositions[i] * FONT_SIZE
                        );
                    }

                    if (
                        columnPositions[i] * FONT_SIZE > canvas.height &&
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

            const animate = (time: number) => {
                const delta = time - lastAnimate.current;

                if (delta >= 64) {
                    draw();
                    lastAnimate.current = time;
                }

                animationFrameIdRef.current = requestAnimationFrame(animate);
            };

            animationFrameIdRef.current = requestAnimationFrame(animate);
        } else if (!shouldAnimate) {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        }

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [shouldAnimate, casedTopics]);

    return <canvas ref={canvasRef} className="DigitalRain" />;
};

export default DigitalRain;
