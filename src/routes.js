import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import moment from 'moment/moment.js';


const database = new Database();
moment.locale('pt-BR');

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body
      const date = moment().format("DD/MM/YYYY");
      console.log(date);
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at : date,
        updated_at: date,
      }
      console.log(new Date())
      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
]