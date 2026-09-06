// React
import { ReactElement, useEffect, useRef } from 'react';

// Styles
import './DigitalRain.css';

interface Props {
    topics: string[];
}

const DigitalRain = ({ topics }: Props): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const ctx = canvas.getContext('2d');

            // Characters: Katakana & Digits
            const katakana: string =
                'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890';
            const alphabet: string[] = katakana.split('');

            const fontSize: number = 10;
            const columns: number = canvas.width / fontSize;
            console.log(canvas.width);

            const topicMatrix: string[] = [];
            let topicMatrixIndex = 0;

            while (topicMatrix.length < columns) {
                topicMatrix.push(topics[topicMatrixIndex]);

                if (topicMatrixIndex === topics.length - 1) {
                    topicMatrixIndex = 0;
                }

                topicMatrixIndex++;
            }

            // Represents the vertical position of each char in each column. On draw each char's Y position is multiplied by font-size
            const rainDrops: number[] = Array.from({ length: columns }).fill(
                1
            ) as number[];

            const draw = () => {
                if (!ctx) return;
                // Draw a translucent background to create the trailing/fade effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#c0fe04';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < rainDrops.length; i++) {
                    // Pick a random character
                    const text =
                        alphabet[Math.floor(Math.random() * alphabet.length)];

                    // x coordinate is column index * font size; y coordinate is tracked in array
                    ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                    // Send drop back to top randomly after it crosses the bottom of the screen
                    if (
                        rainDrops[i] * fontSize > canvas.height &&
                        Math.random() > 0.975
                    ) {
                        rainDrops[i] = 0;
                    }

                    // Shorthand for rainDrops += 1, which
                    rainDrops[i]++;
                }
            };

            // Keep responsive on resize
            // window.addEventListener('resize', () => {
            //     canvas.width = window.innerWidth;
            //     canvas.height = window.innerHeight;
            // });

            intervalRef.current = setInterval(draw, 300);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="DigitalRain" />;
};

export default DigitalRain;
