import React, { useState } from 'react';

const NoteEditor = ({ note, onSave, onCancel }) => {
    const [editedNote, setEditedNote] = useState(note);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedNote({ ...editedNote, [name]: value });
    };

    const handleSave = () => {
        onSave(editedNote);
    };

    return (
        <div className="card">
            <form className="form">
                <h2>Edit Note</h2>
                <div className="title">Title</div>
                <input
                    type="text"
                    placeholder="Enter title"
                    name="titulo"
                    className="input"
                    value={editedNote.titulo}
                    onChange={handleInputChange}
                />
                <div className="label">Category</div>
                <select
                    name="categoria"
                    className="input"
                    value={editedNote.categoria}
                    onChange={handleInputChange}
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
                    value={editedNote.texto}
                    onChange={handleInputChange}
                />
                <div className="label">State</div>
                <select
                    name="estado"
                    className="input"
                    value={editedNote.estado}
                    onChange={handleInputChange}
                >
                    <option value="Active">Actived</option>
                    <option value="Archived">Archived</option>
                </select>
            </form>
            <button className="button-confirm" onClick={handleSave}>Save</button>
            <button className="button-cancel" onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default NoteEditor;
