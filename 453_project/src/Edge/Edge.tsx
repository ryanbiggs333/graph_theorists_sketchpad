import React from "react";
import styles from './Edge.module.css';

interface EdgeProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color?: string;
    thickness?: number;
    onClick?: () => void;
    directed?: boolean;
}

const Edge: React.FC<EdgeProps> = ({ startX, startY, endX, endY, color = 'black', thickness = 2, onClick, directed = false }) => {
    const isLoop = startX === endX && startY === endY;

    return (
        <svg className={styles.edge} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {isLoop ? (
                <path
                    d={`M ${startX} ${startY} 
                       C ${startX - 30} ${startY - 50}, 
                         ${startX + 30} ${startY - 50}, 
                         ${endX} ${endY}`}
                    stroke={color}
                    strokeWidth={thickness}
                    fill="none"
                />
            ) : (
                <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={color}
                    strokeWidth={thickness}
                />
            )}
            {directed && !isLoop && (
                <polygon
                    points={`${endX},${endY} ${endX - 5},${endY - 5} ${endX + 5},${endY - 5}`}
                    fill={color}
                />
            )}
        </svg>
    );
};

export default Edge;