

const assignedRolFactory = async (ctos = 1) => {
    let factory = [
        admin = {
            id_rol: 1,
            id_user: 1,
        },
        regular = {
            id_rol: 2,
            id_user: 2,
        }
    ]
    return Promise.all(factory);
}

module.exports = {
    assignedRolFactory
}