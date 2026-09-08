// React
import { ReactElement, useMemo } from 'react';

// Styles
import './GlyphLane.css';

const glyphs: string[] = ['#', '/', '-', '*', '='];

const GlyphLane = (): ReactElement => {
    const randomAssortment: string[] = useMemo(() => {
        const result: string[] = [];

        for (let i = 0; i < 49; i++) {
            const randomGlyph: string =
                glyphs[Math.round(Math.random() * (glyphs.length - 1))];

            result.push(randomGlyph);
        }

        return result;
    }, []);

    return (
        <div className="GlyphLane">
            {randomAssortment.map((glyph, index) => (
                <span key={`${glyph}-${index}`} className="glyph">
                    {glyph}
                </span>
            ))}
        </div>
    );
};

export default GlyphLane;
