# gestionTareas



# Instalación servidor

## Pasos a seguir

1. Una vez descargado el proyecto, instalamos todas las dependencias con el comando:

```bash
npm install
```

2.Copiar y configurar el archivo `.env.example` con la configuración de la base de datos (usuario, nombre de la bbdd y contraseña)
### Es importante que el nombre del  archivo final sea `.env` para funcionar correctamente


3. Con el comando `npx sequelize db:migrate`, crearemos las tablas en la base de datos.

4. Con el comando `npx sequelize db:seed:all` insertaremos los campos necesarios para entrar en la aplicación.

5. Lanzamos la aplicación con comando `nodemon`

## Usuarios

| Email | Rol |
| ----- | --- |
| root@root.com | admin |
| user@user.com | programmer |

Contraseña válida para ambos usuarios: `password`