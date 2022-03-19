import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PageRender from './customRouter/PageRender';
import Landing from './components/layout/Landing';
import Auth from './components/auth/Auth';
import PrivateRoute from './customRouter/PrivateRoute';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route
                    path='/signin'
                    element={<Auth authRoute='signin' />}></Route>
                <Route
                    path='/signup'
                    element={<Auth authRoute='signup' />}></Route>
                <Route
                    path='/:page'
                    element={
                        <PrivateRoute>
                            <PageRender />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/:page/:id'
                    element={
                        <PrivateRoute>
                            <PageRender />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
