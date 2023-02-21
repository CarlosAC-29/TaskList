import React from 'react'
import { Box, Button, Container, AppBar, Typography, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {

	const navigate = useNavigate()

	return (
		<Box sx={{ flexGrow: 1, backgroundColor: '#381810', margin: 0 }}>
			<AppBar position='static' color='transparent'>
				<Container>
					<Toolbar>
						<Typography sx={{flexGrow: 1, padding: '1rem', fontSize: { xl: '80px', lg: '80px', md: '80px', sm: '100x', xs: '30px' } }}>
							<Link to='/' style={{ textDecoration: 'none', color: '#FFFDF1', fontFamily: 'Pacifico' }}>TASK LIST </Link>
						</Typography>
						<Button variant='contained' sx={{ background: '#E9C59C', color: '#381810', '&:hover': { background: '#FEA035' } }} onClick={() => navigate("/tasks/new")}>
							<Typography sx={{ fontFamily: 'Red Hat Display', fontSize: { xl: '40px', lg: '40px', md: '40px', sm: '25px', xs: '25px' } }}>New Task</Typography>
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}
