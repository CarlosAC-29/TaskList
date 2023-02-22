import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'




export default function TaskForm() {


  const navigate = useNavigate()
  const params = useParams()
  const [load, setLoad] = useState(false)
  const [editing, setEditing] = useState(false)

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const loadtask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    setTask({ title: data.title, description: data.description })
    setEditing(true)
  }

  useEffect(() => {
    if (params.id) {
      loadtask(params.id)
    }
  }, [params.id])


  const handleChange = e => {
    e.preventDefault();
    setTask({ ...task, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    if (editing) {
      const res = await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json(task)
      console.log(data)
    } else {
      const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json(task);
      console.log(task)
      console.log(data)
    }

    setLoad(false)


    navigate('/')
  }

  return (
    <Grid container direction='column' alignItems='center' justifyItems='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }} style={{
          backgroundColor: '#E9C59C',
          padding: '1rem',
          boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant='h5' textAlign='center' sx={{ fontFamily: 'Red Hat Display' }}>
            {editing ? 'EDIT TASK' : 'CREATE TASK'}
          </Typography>
          <CardContent sx={{ color: '#381810' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
              <TextField
                
                name='title'
                value={task.title}
                onChange={handleChange}
                variant='filled'
                placeholder='testing'
                label='Write your title'
                color='warning'
                sx={{ width: '100%', display: 'block', margin: '.5rem 0', }}

                inputProps={{ style: { color: '#381810' } }}
                InputLabelProps={{ style: { color: '#381810', fontFamily: 'Red Hat Display' } }}
              />

              <TextField
              
                name='description'
                value={task.description}
                onChange={handleChange}
                variant='filled'
                placeholder='testing'
                label='Write your description'
                multiline
                rows={4}
                color='warning'
                sx={{ display: 'block', margin: '.5rem 0' }}

                inputProps={{ style: { color: '#381810' } }}
                InputLabelProps={{ style: { color: '#381810', fontFamily: 'Red Hat Display', fontWeight: 'light' } }}
              />

              <Button variant='contained' color='primary' type='submit' sx={{ background:'#12A884', '&:hover':{background: '#0B785E'} ,fontFamily: 'Red Hat Display' }} disabled={!task.title || !task.description}>
                {load ? <CircularProgress color='inherit' size={24} /> : 'save'}
              </Button>

            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
