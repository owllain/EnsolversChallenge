import React, { useState } from 'react';
import './AddNote.css';

const AddNote = ({ onAddNote }) => {
    const [newNote, setNewNote] = useState({
        titulo: '',
        categoria: 'Task', // Valor por defecto: Task
        texto: '',
        estado: 'Active', // Valor por defecto: Active
    });

    const handleAddNote = async () => {
        if (newNote.titulo.trim() !== '') {
            try {
                const mappedNote = {
                    Id: 0, // Deja el Id en 0 si es una nueva nota
                    Titulo: newNote.titulo,
                    Categoria: newNote.categoria,
                    Texto: newNote.texto,
                    Estado: newNote.estado
                };

                const response = await fetch('https://localhost:7135/api/Notes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mappedNote),
                });

                if (response.ok) {
                    // Si la solicitud es exitosa, notifica al componente principal que se ha agregado una nota
                    onAddNote(newNote);

                    // Restablece el estado del formulario
                    setNewNote({
                        titulo: '',
                        categoria: 'Task', // Restablece el valor por defecto: Task
                        texto: '',
                        estado: 'Active', // Restablece el valor por defecto: Active
                    });
                } else {
                    // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
                    console.error('Error al agregar la nota:', response.statusText);
                }
            } catch (error) {
                console.error('Error al agregar la nota:', error);
            }
        }
    };

    return (
        <div className="card">
            <form className="form">
                <h2>New notes</h2>
                <div className="title">Title</div>
                <input
                    type="text"
                    placeholder="Enter title"
                    name="titulo"
                    className="input"
                    value={newNote.titulo}
                    onChange={(e) => setNewNote({ ...newNote, titulo: e.target.value })}
                />
                <div className="label">Category</div>
                <select
                    name="categoria"
                    className="input"
                    value={newNote.categoria}
                    onChange={(e) => setNewNote({ ...newNote, categoria: e.target.value })}
                >
                    <option value="Task">Task</option>
                    <option value="Recordatory">Recordatory</option>
                    <option value="Post-it">Post-it</option>
                    <option value="ShopList">ShopList</option>
                </select>
                <div className="label">Text</div>
                <textarea
                    placeholder="Enter text"
                    name="texto"
                    className="input"
                    value={newNote.texto}
                    onChange={(e) => setNewNote({ ...newNote, texto: e.target.value })}
                />
                <div className="label">State</div>
                <select
                    name="estado"
                    className="input"
                    value={newNote.estado}
                    onChange={(e) => setNewNote({ ...newNote, estado: e.target.value })}
                >
                    <option value="Active">Actived</option>
                    <option value="Archived">Archived</option>
                </select>
            </form>
            <button className="button-confirm" onClick={handleAddNote}>Add</button>
        </div>
    );
};

export default AddNote;
