import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Container, Typography, Fade } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css'

export default function TaskList() {

  const navigate = useNavigate()
  const [task, setTask] = useState([])

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE"
      });
  
      setTask(task.filter(task => task.id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  const loadTask = async () => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    setTask(data)
  }


  useEffect(() => {
    loadTask()
  }, [])

  return (
    <Container sx={{padding: '20px'}}>
      {
        task.map((task, index) => (
          <Fade in={true} timeout={600}>
          <Card key={index} style={{ margin: '.9rem 0', backgroundColor: '#381810',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}>
            <CardContent style={ {display: "flex", justifyContent: 'space-between', gap: '10px'}}>
              <div style={{color: '#FFFDF1'}}>
                <Typography sx={{fontSize: '20px' ,textTransform: 'uppercase', fontWeight: 'bold', fontFamily: 'Red Hat Display'}}>
                  {task.title}
                </Typography>
                <Typography sx={{fontSize: '18px', fontFamily: 'Red Hat Display'}}>
                  {task.description}
                </Typography>
              </div>
              <div style={{width: {xl: '10%' ,lg: '10%', md: '10%', sm:'30%', xs:'30%'} ,display: 'flex', flexDirection: 'column', gap: '5px', justifyItems:'end', alignItems:'end'}}>
                <Button
                  sx={{width: '100%' ,background: '#12A884', color: '#FFFDF1', '&:hover': {background: '#0B785E'}}}
                  variant='contained'
                  color='inherit'
                  onClick={() => navigate(`/task/${task.id}/edit`)}>
                  <EditIcon /> 
                  
                  <Typography sx={{fontFamily: 'Red Hat Display' , margin: '.1rem .2rem'}}>Edit</Typography></Button>
                <Button
                  sx={{ width: '100%', background: '#F16516' ,marginLeft: '.5rem', '&:hover': {background: '#C45517'}}}
                  variant='contained'
                  onClick={() => handleDelete(task.id)}>
                  <DeleteRoundedIcon />
                  <Typography sx={{fontFamily: 'Red Hat Display' ,margin: '.1rem .2rem'}}>Delete</Typography>
                  </Button>
              </div>
            </CardContent>
          </Card>
    </Fade>
        ))
      }
    </Container>
  )
}
