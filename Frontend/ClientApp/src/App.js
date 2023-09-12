import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default function App() {
    const [notes, setNotes] = useState([]);

    // Función para agregar una nota
    const handleAddNote = (newNote) => {
        setNotes([...notes, newNote]);
    };
 

    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    if (route.path === '/add-note') {
                        return (
                            <Route
                                key={index}
                                {...rest}
                                element={React.cloneElement(element, { onAddNote: handleAddNote })}
                            />
                        );
                    }
                   

                    if (route.path === '/my-notes') {
                        return (
                            <Route
                                key={index}
                                {...rest}
                                element={element}
                                notes={notes}
                                
                            />
                        );
                    }

                    if (route.path === '/archived-notes') {
                        return (
                            <Route
                                key={index}
                                {...rest}
                                element={element}
                                notes={notes}
                                 
                            />
                        );
                    }

                    if (route.path === '/active-notes') {
                        return (
                            <Route
                                key={index}
                                {...rest}
                                element={element}
                                notes={notes}
                                
                            />
                        );
                    }


                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </Layout>
    );
}
