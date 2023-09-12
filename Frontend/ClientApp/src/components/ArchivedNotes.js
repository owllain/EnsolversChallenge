import React, { useState, useEffect, useRef } from 'react';
import './Table.css'; 

const Archived = () => {
    const [notes, setNotes] = useState([]);
    const rowRefs = useRef({}); // Referencias a las filas de la tabla

    useEffect(() => {
        fetchArchivedNotes();
    }, []);

    const fetchArchivedNotes = async () => {
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
                console.error('Error al obtener la lista de notas archivadas:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener la lista de notas archivadas:', error);
        }
    };

    return (
        <div className="archived-notes">
            <h2>Archived notes</h2>
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
                        .filter((note) => note.estado === 'Archived')
                        .map((note) => (
                            <tr
                                key={note.id}
                                ref={(el) => (rowRefs.current[note.id] = el)} // Guarda la referencia a la fila
                                tabIndex={0} // Hace que la fila sea enfocable
                            >
                                <td>{note.titulo}</td>
                                <td>{note.categoria}</td>
                                <td>{note.texto}</td>
                                <td>{note.estado}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Archived;
