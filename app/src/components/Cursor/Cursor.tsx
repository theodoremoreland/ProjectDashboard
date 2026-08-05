// React
import { ReactElement, useCallback, useEffect, useRef } from 'react';

// Images
import DefaultCursorIcon from '../../assets/images/icons/arrow_selector_tool.svg?react';
// import PointerCursorIcon from '../../assets/images/icons/pan_tool_alt.svg?react';

// Styles
import './Cursor.css';

const Cursor = (): ReactElement => {
    const cursorRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!cursorRef.current) return;

        cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <div className="Cursor" ref={cursorRef}>
            <DefaultCursorIcon className="default" />
        </div>
    );
};

export default Cursor;
