import React from 'react';
import logo from './logo.svg';
import './App.css';
import Paperbase from './components/Paperbase';
import {RouterProvider} from 'react-router-dom';
import router from './utils/routers';
import {ThemeProvider} from '@mui/material/styles';
import theme from './utils/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App;
