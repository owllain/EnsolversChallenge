import React from 'react';
import { Home } from "./components/Home";
import AddNote from "./components/AddNote";
import MyNotes from "./components/MyNotes";
import Actives from "./components/ActiveNotes";
import Archived from "./components/ArchivedNotes";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/add-note',
        element: <AddNote />
    },
    {
        path: '/my-notes',
        element: <MyNotes />
    },
    {
        path: '/archived-notes',
        element: <Archived />
    },
    {
        path: '/active-notes',
        element: <Actives />
    }
];

export default AppRoutes;
