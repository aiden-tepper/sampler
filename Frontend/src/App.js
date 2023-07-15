import './App.css';
import React, { useContext } from 'react';
import Login from './components/Login'
import Library from './components/Library';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Navigate } from 'react-router-dom';
import Navibar from './components/Navibar';
import Soundboard from './components/Soundboard';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { SampleContext, SampleProvider } from './contexts/SampleContext';
import { useState } from 'react';
import * as Tone from 'tone';

function App() {
  Tone.context.resume();

  return (
    <AuthProvider>
      <SampleProvider>
        <BrowserRouter>
          <Navibar />
          <Routes>
            <Route path="/" element={<Navigate to="/soundboard" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/soundboard"
              element={
                <ProtectedRoute>
                  <Soundboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to="/soundboard" />} />
          </Routes>
        </BrowserRouter>
      </SampleProvider>
    </AuthProvider>
  );
}

export default App;
