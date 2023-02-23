//Funciones

const { Client } = require('pg');
const {db} = require('../config')



const getAllTasks = async (req, res, next) => {

    const client = new Client({
        connectionString: db.database_url
    })

    console.log(db.database_url)

    try {
        await client.connect(); 
        const allTask = await client.query('SELECT * FROM task')
        await client.end();
        res.json(allTask.rows)

    } catch (error) {
        next(error)
    }

}

const getTask = async (req, res, next) => {

    const client = new Client({
        connectionString: db.database_url
    })

    try {
        await client.connect(); 
        const { id } = req.params
        const result = await client.query('SELECT * FROM task WHERE id = $1', [id])
        if (result.rows.length === 0) return res.status(404).json({
            message: "task no found"
        })
        res.json(result.rows[0])
        await client.end();
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const { title, description } = req.body

    const client = new Client({
        connectionString: db.database_url
    })

    try {
        await client.connect(); 
        const result = await client.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description])
        res.json(result.rows[0])
        await client.end();
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {

    const { id } = req.params
    const { title, description } = req.body
    const client = new Client({
        connectionString: db.database_url
    })


    try {
        await client.connect(); 
        const result = await client.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])
        console.log(result)
    
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
    
    
        res.json(result.rows[0])
        await client.end();
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    const { id } = req.params
    const client = new Client({
        connectionString: db.database_url
    })

    try {
        await client.connect(); 
        const result = await client.query('DELETE FROM task where id = $1', [id])

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Task no found"
            })
        }

        res.sendStatus(204)
        await client.end();
    } catch (error) {
        next(error)
    }


}


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}