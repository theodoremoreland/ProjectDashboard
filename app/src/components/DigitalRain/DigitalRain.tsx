// React
import { ReactElement, useEffect, useRef } from 'react';

// Styles
import './DigitalRain.css';

interface Props {
    topics: string[];
}

const DigitalRain = ({ topics }: Props): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let intervalId: undefined | number;
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Characters: Katakana & Digits
        const katakana =
            'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890';
        const alphabet = katakana.split('');

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Track the vertical 'y' position of each column
        const rainDrops: number[] = Array.from({ length: columns }).fill(
            1
        ) as number[];

        const draw = () => {
            if (!ctx) return;
            // Draw a translucent background to create the trailing/fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
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
                rainDrops[i]++;
            }
        };

        // Keep responsive on resize
        // window.addEventListener('resize', () => {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerHeight;
        // });

        // intervalId = setInterval(draw, 300);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return <canvas ref={canvasRef} className="DigitalRain" />;
};

export default DigitalRain;
