import React, { useState, useEffect, useRef } from 'react';
import NoteEditor from './NoteEditor'; // Importa el componente de edición
import './Table.css'; 

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null); // Estado para la nota en edición
    const [sortedNotes, setSortedNotes] = useState([]); // Estado para las notas ordenadas
    const rowRefs = useRef({}); // Referencias a las filas de la tabla

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        // Cuando las notas cambian, actualiza las notas ordenadas
        setSortedNotes([...notes]);
    }, [notes]);

    const fetchNotes = async () => {
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
                console.error('Error al obtener la lista de notas:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener la lista de notas:', error);
        }
    };

    const handleToggleState = async (noteToToggle) => {
        try {
            // Copia la nota para evitar la mutación directa del estado
            const updatedNote = { ...noteToToggle };

            // Cambia el estado de la nota
            updatedNote.estado = updatedNote.estado === 'Actived' ? 'Archived' : 'Actived';

            // Realiza una solicitud PUT para actualizar la nota en el servidor
            const response = await fetch(`https://localhost:7135/api/Notes/${updatedNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote),
            });

            if (response.ok) {
                // Si la solicitud se completó con éxito, actualiza el estado local
                const updatedNotes = notes.map((note) => {
                    if (note.id === updatedNote.id) {
                        return updatedNote;
                    }
                    return note;
                });

                setNotes(updatedNotes);
            } else {
                console.error('Error al actualizar el estado de la nota:', response.statusText);
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la nota:', error);
        }
    };

    const handleDeleteNote = async (noteToDelete) => {
        try {
            // Realiza una solicitud DELETE para eliminar la nota en el servidor
            const response = await fetch(`https://localhost:7135/api/Notes/${noteToDelete.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Si la solicitud se completó con éxito, actualiza el estado local eliminando la nota
                const updatedNotes = notes.filter((note) => note.id !== noteToDelete.id);
                setNotes(updatedNotes);
            } else {
                console.error('Error al eliminar la nota:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar la nota:', error);
        }
    };

    const handleEditNote = (note) => {
        // Abre el editor de notas con la nota seleccionada
        setEditingNote(note);
    };

    const handleSaveNote = (editedNote) => {
        // Guarda los cambios en la nota y cierra el editor
        // Puedes implementar la lógica para actualizar la nota en el servidor aquí
        // Luego, actualiza el estado local y cierra el editor
        const updatedNotes = notes.map((note) => (note.id === editedNote.id ? editedNote : note));
        setNotes(updatedNotes);
        setEditingNote(null);
    };

    const handleCancelEdit = () => {
        // Cancela la edición y cierra el editor
        setEditingNote(null);
    };

    const handleSortByCategory = () => {
        // Ordena las notas por categoría
        const sorted = [...sortedNotes].sort((a, b) => {
            if (a.categoria < b.categoria) return -1;
            if (a.categoria > b.categoria) return 1;
            return 0;
        });

        setSortedNotes(sorted);
    };

    return (
        <div className="my-notes">
            <h2>Post-it notes</h2>
           

            <button onClick={handleSortByCategory}>Sort</button> {/* Botón para ordenar */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Text</th>
                        <th>State</th>
                        <th>Action buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedNotes.map((note) => (
                        <tr
                            key={note.id}
                            ref={(el) => (rowRefs.current[note.id] = el)} // Guarda la referencia a la fila
                            tabIndex={0} // Hace que la fila sea enfocable
                        >
                            <td>{note.titulo}</td>
                            <td>{note.categoria}</td>
                            <td>{note.texto}</td>
                            <td>{note.estado}</td>
                            <td>
                                <button onClick={() => handleToggleState(note)}>Toggle State</button>
                                <span style={{ margin: '0 5px' }}></span> {/* Espacio entre botones */}
                                <button onClick={() => handleDeleteNote(note)}>Delete</button>
                                <span style={{ margin: '0 5px' }}></span> {/* Espacio entre botones */}
                                <button onClick={() => handleEditNote(note)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Renderiza el editor de notas si se está editando una nota */}
            {editingNote && (
                <NoteEditor
                    note={editingNote}
                    onSave={handleSaveNote}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default MyNotes;