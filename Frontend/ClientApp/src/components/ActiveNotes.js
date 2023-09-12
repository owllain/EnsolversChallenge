import React, { useState, useEffect, useRef } from 'react';
import './Table.css'; 

const ActiveNotes = () => {
    const [notes, setNotes] = useState([]);
    const rowRefs = useRef({}); // Referencias a las filas de la tabla

    useEffect(() => {
        fetchActiveNotes();
    }, []);

    const fetchActiveNotes = async () => {
        try {
            const response = await fetch('https://localhost:7135/api/Notes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                console.error('Error al obtener la lista de notas activas:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener la lista de notas activas:', error);
        }
    };

    return (
        <div className="active-notes">
            <h2>Actived notes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Text</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {notes
                        .filter((note) => note.estado === 'Actived')
                        .map((note) => (
                            <tr
                                key={note.id}
                                ref={(el) => (rowRefs.current[note.id] = el)}
                                tabIndex={0}
                            >
                                <td className="td">{note.titulo}</td>
                                <td className="td">{note.categoria}</td>
                                <td className="td">{note.texto}</td>
                                <td className="td">{note.estado}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveNotes;
