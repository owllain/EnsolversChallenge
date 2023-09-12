import React, { Component } from 'react';
import './Home.css'; // Importa el archivo CSS


export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1 className="tracking-in-expand">Welcome to Your Note Management App</h1>

                <p>This is a simple web application for managing your notes.</p>
                <p>Features:</p>
                <ul>
                    <li>Create, edit, and delete notes.</li>
                    <li>Categorize your notes for better organization.</li>
                    <li>Filter notes by category or status.</li>
                    <li>Responsive and easy-to-use interface.</li>
                </ul>
                <p>Get started:</p>
                <ol>
                    <li>Navigate to the "Notes" section to start managing your notes.</li>
                    <li>Create a new note by clicking the "New Note" button.</li>
                    <li>Edit or delete notes as needed.</li>
                    <li>Use categories and filters to organize your notes effectively.</li>
                </ol>
                <p>Enjoy using our simple and efficient note management application!</p>
            </div>
        );
    }
}
