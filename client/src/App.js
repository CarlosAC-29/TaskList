import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import { Container } from '@mui/material'
import './App.css'

function App() {


  return (
    <BrowserRouter>

      <div className='main_App'>
        <Navbar />
        <Container >
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/tasks/new' element={<TaskForm />} />
            <Route path='/task/:id/edit' element={<TaskForm />} />
          </Routes>
        </Container>
      </div>

    </BrowserRouter>
  );
}

export default App;
