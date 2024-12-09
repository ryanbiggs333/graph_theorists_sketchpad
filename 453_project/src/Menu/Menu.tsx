import React, { useState } from 'react';
import styles from './Menu.module.css';

interface MenuProps {
    addVertex: (label: string, color: string) => void;
    addEdge: () => void;
}

const Menu: React.FC<MenuProps> = ({ addVertex, addEdge }) => {
    const [label, setLabel] = useState('');
    const [color, setColor] = useState('#000000');

    const handleAddVertex = () => {
        addVertex(label, color);
        setLabel('');
        setColor('#000000');
    };

    return (
        <div className={styles.Menu}>
            <input
                type="text"
                placeholder="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            />
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <button onClick={handleAddVertex}>Add Vertex</button>
            <button onClick={addEdge}>Add Edge</button>
        </div>
    );
};

export default Menu;