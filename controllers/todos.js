const Todo = require('../models/todo')

module.exports = {
    getTodos: async (req, res) => {
        try{
            const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('index.ejs', {todos: todoItems, left: itemsLeft})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res) => {
        try{
            await Todo.create({
                todo: req.body.createTask, 
                completed: false,
                description: req.body.taskDescription
            })
            console.log(`Todo ${req.body.createTask} has been added to DB.`)
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
        try{
            await Todo.findOneAndUpdate({_id:req.body.id},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res) => {
        try{
            await Todo.findOneAndUpdate({_id:req.body.id},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res) => {
        console.log('Delete request for', req.body)
        try {
            await Todo.findOneAndDelete({_id:req.body.id})
            console.log('Deleted Todo')
            res.status(200).json('Document deleted')
        } catch(err){
            console.log(err)
        }
    }
}