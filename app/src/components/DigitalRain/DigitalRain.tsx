// React
import { ReactElement, useCallback, useEffect, useRef, useMemo } from 'react';

// Custom
import {
    formatRenderTopic,
    generateValidRandomNumber,
    properCase,
    RenderTopic,
} from './DigitalRain.utils';

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
    const casedTopics: string[] = useMemo(() => properCase(topics), [topics]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameIdRef = useRef<number | undefined>(undefined);
    const lastAnimate = useRef<number>(0);
    const chosenColumnIndexRef = useRef<number>(15);
    const chosenTopicIndexRef = useRef<number>(0);
    const renderingTopicRef = useRef<RenderTopic>(
        formatRenderTopic(casedTopics[0])
    );

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
            const columnPositions: number[] = Array.from({
                length: columns,
            }).fill(1) as number[]; // Track the vertical 'y' position of each column
            const topicsThatFitCanvas: string[] = casedTopics.filter(
                (topic: string) => {
                    return topic.length * FONT_SIZE < canvas.height;
                }
            );

            const draw = (): void => {
                if (!ctx) return;

                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Draw a translucent background to create the trailing/fade effect
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = FONT_SIZE + 'px custom-regular';

                for (let i = 0; i < columnPositions.length; i++) {
                    const numberOfCharactersLeftToRender: number =
                        renderingTopicRef.current.reduce((prev, curr) => {
                            if (!curr.hasRendered) {
                                return prev + 1;
                            } else {
                                return prev;
                            }
                        }, 0);

                    if (
                        chosenColumnIndexRef.current === i &&
                        numberOfCharactersLeftToRender > 0
                    ) {
                        ctx.fillStyle = '#e2ff04';

                        for (
                            let j = 0;
                            j < renderingTopicRef.current.length;
                            j++
                        ) {
                            const char = renderingTopicRef.current[j];

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
                        renderingTopicRef.current[
                            renderingTopicRef.current.length - 1
                        ].hasRendered
                    ) {
                        chosenColumnIndexRef.current =
                            generateValidRandomNumber(
                                columnPositions.length,
                                chosenColumnIndexRef.current
                            );
                        renderingTopicRef.current = formatRenderTopic(
                            topicsThatFitCanvas[chosenTopicIndexRef.current]
                        );
                        chosenTopicIndexRef.current =
                            chosenTopicIndexRef.current ===
                            topicsThatFitCanvas.length - 1
                                ? 0
                                : chosenTopicIndexRef.current + 1;
                    }

                    columnPositions[i]++;
                }
            };

            const animate = (time: number) => {
                const delta = time - lastAnimate.current;

                if (delta >= 80) {
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
