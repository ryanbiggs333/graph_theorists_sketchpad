import React, { useState, useEffect } from "react";
import styles from './Vertex.module.css';

interface VertexProps {
    id: number;
    label: string;
    x: number;
    y: number;
    color: string;
    size: number;
    onClick: () => void;
    onDrag: (id: number, x: number, y: number) => void;
    selected: boolean;
}

const Vertex: React.FC<VertexProps> = ({ id, color, label, x, y, size, onClick, onDrag, selected=false }) => {
    const [position, setPosition] = useState({ x, y });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

   const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

  const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
            const newX = e.clientX - offset.x;
            const newY = e.clientY - offset.y;
            setPosition({ x: newX, y: newY });
            onDrag(id, newX, newY);
        }
    };


    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <div
            className={`${styles.vertex} ${selected ? styles.selected : ''}`}
            style={{ top: `${position.y}px`, left: `${position.x}px`, background: color, width: `${size}px`, height: `${size}px` }}
            onMouseDown={handleMouseDown}
            onClick={onClick}
        >
            <div className="noselect">
                {label}
            </div>
        </div>
    );
};

export default Vertex;