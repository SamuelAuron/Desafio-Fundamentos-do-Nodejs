import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import moment from 'moment/moment.js';
import { buildRoutePath } from './utils/build-routh-path.js';

const database = new Database();
moment.locale('pt-BR');

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
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
    
      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]