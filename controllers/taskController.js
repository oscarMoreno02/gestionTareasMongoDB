require('express-group-routes')
const {
    response,
    request
} = require('express');
const Conexion = require('../database/ConexionSequelize');
const bcrypt = require('bcrypt');

const allTask = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllTask()
        .then(data => {

            res.status(200).json({
                msg: 'Listado encontrado',
                data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                msg: 'No se encontraron tareas'
            })
        })
}
const getTaskDone = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getTaskByStatus(true)
        .then(data => {

            res.status(200).json({
                msg: 'Listado encontrado',
                data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                msg: 'No se encontraron tareas'
            })
        })
}
const getTaskUndone = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getTaskByStatus(false)
        .then(data => {

            res.status(200).json({
                msg: 'Listado encontrado',
                data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                msg: 'No se encontraron tareas'
            })
        })
}
const allAvailableTask = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllAvailableTask()
        .then(data => {

            res.status(200).json({
                msg: 'Listado encontrado',
                data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                msg: 'No se encontraron tareas'
            })
        })
}

const uniqueTask = (req, res = response) => {
    const conexion = new Conexion()
    console.log(req.params.id)
    conexion.getTask(req.params.id)
        .then(data => {
            res.status(200).json({
                msg: 'Tarea encontrada',
                data
            })

        })
        .catch(err => {

            console.log(err)
            res.status(200).json({
                msg: 'No exite una tarea con ese id'
            })
        })
}

const editTaskStatus = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateTaskStatus(req.params.id)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
            console.log(err);
            res.status(203).json('Error al actualizar')
        });
}

const fullUpdate= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullTask(req.params.id,req.body)
    .then(data => {
        console.log(data)
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {
        console.log(err);
        res.status(203).json('Error al actualizar')
    });

}
const editTaskProgress = (req, res = response) => {
    const conexion = new Conexion()
    let progress = req.body.progress
    if (progress) {

        conexion.updateTaskProgress(req.params.id, progress)
            .then(data => {
                res.status(202).json('Actualizado correctamente')
            })
            .catch(err => {
                console.log(err);
                res.status(203).json('Error al actualizar')
            });
    } else {
        res.status(400).json('No se ha introducido el progreso de la tarea')
    }
}

const addTaskTime = (req, res = response) => {
    const conexion = new Conexion()
    let time = req.body.time
    if (time) {

        conexion.updateTaskTime(req.params.id, time)
            .then(data => {
                res.status(202).json('Actualizado correctamente')
            })
            .catch(err => {
                console.log(err);
                res.status(203).json('Error al actualizar')
            });
    } else {
        res.status(400).json('No se ha introducido el progreso de la tarea')
    }
}
const editTaskAssignment = (req, res = response) => {
    const conexion = new Conexion()
    let assignment = req.body.assignment
    if (assignment) {

        conexion.updateTaskAssignment(req.params.id, assignment)
            .then(data => {
                res.status(202).json('Asignado correctamente')
            })
            .catch(err => {
                console.log(err);
                res.status(203).json('Error al asignar')
            });
    } else {
        res.status(400).json('Argumentos no validos')
    }
}
const dropTaskAssignment = (req, res = response) => {
    const conexion = new Conexion()

    conexion.updateTaskAssignment(req.params.id, null)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
            console.log(err);
            res.status(203).json('Error al actualizar')
        })

}
const insertTask = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertTask(req.body)
        .then(data => {

            res.status(201).json({
                msg: 'Tarea registrada correctamente'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(203).json('Error en el registro')
        })
}

const removeTask = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteTask(req.params.id)
        .then(msg => {

            res.status(202).json({
                msg: 'Exito en la eliminacion'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(203).json({
                err: 'Error en la eliminacion'
            })
        })
}
const getTaskOfUser = (req, res = response) => {
    const conx = new Conexion();

    conx.getTaskUserId(req.params.id)
        .then(msg => {
            console.log('Listado correcto!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(203).json({
                'msg': 'No se han encontrado registros'
            });
        });
}
const getTaskOfAllUser = (req, res = response) => {
    const conx = new Conexion();

    conx.getTaskAllUser()
        .then(msg => {
            console.log('Listado correcto!');
            res.status(200).json(msg);
        })
        .catch(err => {
            console.log('No hay registros');
            res.status(203).json({
                'msg': 'No se han encontrado registros'
            });
        });
}
const evaluateUsers = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getTaskByStatus(false)
        .then(taskListUndone => {
            conexion.getTaskByStatus(true)
                .then(taskListDone => {
                    let task = taskCorrect(req.params.id, taskListUndone)
                    if (task == false) {
                        res.status(400).json('Tarea ya realizada')
                    } else {
                        conexion.getAllUser()
                            .then(userList => {
                                let freeUsers = userAvailables(userList, taskListUndone)
                                let puntuations = puntuateUsers(task, taskListDone, freeUsers)
                              
                                res.status(200).json(puntuations)
                            })
                    }
                })
        })
        .catch(err => {
            console.log(err);
            res.status(203).json('Error al actualizar')
        });
}
taskCorrect = (id, taskList) => {
    let correct = false
    let i = 0
    while (i < taskList.length) {
        if (id == taskList[i].id) {
            return taskList[i]
        }

        i++
    }
    return correct
}
userAvailables = (userList, taskList) => {
    let freeList = []
    for (let i = 0; i < userList.length; i++) {
        let x = 0
        let free = true
        while (free == true && x < taskList.length) {
            if (taskList[x].assignment == userList[i].id) {
                free = false
            }
            x++
        }
        if (free) {
            freeList.push(userList[i])
        }
    }
    return freeList
}
puntuateUsers = (taskToDo, taskDoneList, userList) => {
    let users=userList
    for (let i=0;i<userList.length;i++){
        users[i].dataValues.points=1
        for(let x=0;x<taskDoneList.length;x++){
            if(taskDoneList[x].assignment==users[i].id){
                users[i].dataValues.points=users[i].dataValues.points+basePoints(taskToDo,taskDoneList[x])
            }
        }
    }
    return users
}
basePoints = (taskToDo, referenceTask) => {
    let base=1
    let baseTable=[
        {
            d:'s',
            points:10
        },
        {
            d:'m',
            points:20
        },
        {
            d:'l',
            points:30
        },
        {
            d:'xl',
            points:40
        },
    ]
    let i=0;
    let search=true
    while(search && i<baseTable.length){
        if(taskToDo.difficulty==baseTable[i].d){
            search=false
        }else{
            i++
        }
    }
    let x=0
    search=true
    while(search && x<baseTable.length){
        if(referenceTask.difficulty==baseTable[x].d){
            search=false
            base=baseTable[x].points
        }else{
            x++
        }
    }
 
    if(x<i){
        base=base+(base/(1+(x-i/10)))
    }
    if(x>i){
        base=base+(base*(1+(i-x/10)))
    }
   
    if(referenceTask.time_estimated>referenceTask.time_dedicated){
        base=base*(((referenceTask.time_estimated-referenceTask.time_dedicated)/10)+1)

    }else{
        base=base/(((referenceTask.time_dedicated-referenceTask.time_estimated)/10)+1)
    }

    console.log('llega')
    return base
}
module.exports = {
    allTask,
    uniqueTask,
    editTaskStatus,
    insertTask,
    removeTask,
    editTaskProgress,
    addTaskTime,
    editTaskAssignment,
    dropTaskAssignment,
    allAvailableTask,
    getTaskOfUser,
    getTaskOfAllUser,
    getTaskDone,
    getTaskUndone,
    evaluateUsers,
    fullUpdate
}