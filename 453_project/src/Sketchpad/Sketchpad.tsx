import React, { useState } from "react";
import Vertex from "../Vertex/Vertex";
import Edge from "../Edge/Edge";
import Menu from "../Menu/Menu";
import styles from "./Sketchpad.module.css";

const Sketchpad: React.FC = () => {
    const [vertices, setVertices] = useState([
        { id: 1, label: 'A', x: 100, y: 100, color: 'red', size: 30 },
        { id: 2, label: 'B', x: 300, y: 300, color: 'blue', size: 30 }
    ]);

    const [edges, setEdges] = useState([
        { startX: 100, startY: 100, endX: 300, endY: 300, color: 'black', thickness: 2, directed: true }
    ]);

    const [selectedVertices, setSelectedVertices] = useState<number[]>([]);

    const handleDrag = (id: number, x: number, y: number) => {
        setVertices(vertices.map(vertex => vertex.id === id ? { ...vertex, x, y } : vertex));
        setEdges(edges.map(edge => {
            if (edge.startX === vertices.find(v => v.id === id)?.x && edge.startY === vertices.find(v => v.id === id)?.y) {
                return { ...edge, startX: x, startY: y };
            } else if (edge.endX === vertices.find(v => v.id === id)?.x && edge.endY === vertices.find(v => v.id === id)?.y) {
                return { ...edge, endX: x, endY: y };
            }
            return edge;
        }));
    };

    const addVertex = (label: string, color: string) => {
        const newVertex = {
            id: vertices.length + 1,
            label: label || `V${vertices.length + 1}`,
            x: Math.random() * 400,
            y: Math.random() * 400,
            color: color || 'green',
            size: 30
        };
        setVertices([...vertices, newVertex]);
    };

    const handleVertexClick = (id: number) => {
        console.log(`Vertex ${id} clicked`);
        if (selectedVertices.includes(id)) {
            setSelectedVertices(selectedVertices.filter(vertexId => vertexId !== id));
        } else {
            setSelectedVertices([...selectedVertices, id]);
        }
    };

    const addEdge = () => {
        if (selectedVertices.length === 0) return;

        let newEdge;
        if (selectedVertices.length === 1) {
            const vertexId = selectedVertices[0];
            const vertex = vertices.find(v => v.id === vertexId);
            if (!vertex) return;

            newEdge = {
                startX: vertex.x,
                startY: vertex.y,
                endX: vertex.x,
                endY: vertex.y,
                color: 'black',
                thickness: 2,
                directed: true
            };
        } else {
            const [startVertexId, endVertexId] = selectedVertices;
            const startVertex = vertices.find(v => v.id === startVertexId);
            const endVertex = vertices.find(v => v.id === endVertexId);
            if (!startVertex || !endVertex) return;

            newEdge = {
                startX: startVertex.x,
                startY: startVertex.y,
                endX: endVertex.x,
                endY: endVertex.y,
                color: 'black',
                thickness: 2,
                directed: true
            };
        }

        setEdges([...edges, newEdge]);
        setSelectedVertices([]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Menu addVertex={addVertex} addEdge={addEdge} />
            </div>
            <div className={styles.sketchpad}>
                {vertices.map(vertex => (
                    <Vertex
                        key={vertex.id}
                        {...vertex}
                        onDrag={handleDrag}
                        onClick={() => handleVertexClick(vertex.id)}
                        selected={selectedVertices.includes(vertex.id)}
                    />
                ))}
                {edges.map((edge, index) => (
                    <Edge key={index} {...edge} />
                ))}
            </div>
        </div>
    );
};

export default Sketchpad;