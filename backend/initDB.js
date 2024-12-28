import 'dotenv/config'
import { db } from './libs/dbConnect.js'

const users = [
    {
        username: 'hl',
        email: 'hl@mail.com',
        password: '$2a$10$xcifO.Sl/wBFF/3bZ3DzFu6WZqIKGj3QE0g7S7brqAq/LTiILEIfS',
        avatar: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        username: 'mag',
        email: 'mag@mail.com',
        password: '$2a$10$842f0nG2JFUwvp4716D.Ke69ZiMoFSUbayh183WiQLWWgqQvC8XRS',
        avatar: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

const tasks = [
    {
        name: 'pick the courses',
        description: 'Take COMP8830 in S1, 2025',
        priority: 'not urgent',
        due: new Date().toISOString(),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        name: 'prepare for PTE',
        description: 'Take PTE in Feb',
        priority: 'urgent',
        due: new Date().toISOString(),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

try {
    let collection = db.collection('users')
    const resultOfAddingUsingUser = await collection.insertMany(users);
    console.log(resultOfAddingUsingUser.insertedIds)
    
    tasks[0].owner = resultOfAddingUsingUser.insertedIds[0]
    tasks[1].owner = resultOfAddingUsingUser.insertedIds[1]

    collection = db.collection('tasks')
    await collection.insertMany(tasks)

    console.log("Data added")
} catch (error) {
    console.log('[seed]', 'Error: ', error)
}

process.exit()