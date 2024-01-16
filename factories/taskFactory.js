

const taskFactory = async (ctos = 1) => {
    let factory = []
    for(let i = 1; i <= ctos; i++) {
        const dificultades=['s','m','l','xl']
        let t = 
            {
            description: 'Tarea',
            difficulty: dificultades[Math.floor(Math.random() * dificultades.length)],
            time_estimated: Math.floor(Math.random() * (20 - 10+ 1)) + 10,
            time_dedicated: 0,
            progress: 0,
            done:false,
            assignment:null,
            createdAt: new Date(),
            updatedAt: new Date(),
            }
            factory.push(t)
    }
    return Promise.all(factory);
}

module.exports = {
    taskFactory
}
