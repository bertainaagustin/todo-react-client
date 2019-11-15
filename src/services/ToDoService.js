import axios from 'axios';

export default class ToDoService {
    
    constructor(token) {
        this.http = axios;
        this.serverUrl = process.env.REACT_APP_SERVER + '/ToDo';
        this.options = {
                headers: {
                    client: 1,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
            }
        };
    }

    async getTareas() {
        const respuesta = await this.http.get(this.serverUrl,this.options);
        return respuesta.data;        
    }

    async postTarea(unToDo) {
        if (unToDo.name === "") {
            throw new Error('Debe ingresar un nombre para la tarea');
        }
        const respuesta = await this.http.post(this.serverUrl, unToDo,this.options);
        return respuesta.data;
    }

    async putTarea(unToDo) {
        if (unToDo.name === "") {
            throw new Error('Debe ingresar un nombre para la tarea');
        }
        const respuesta = await this.http.put(this.serverUrl + "/" + unToDo.id, unToDo, this.options);
        return respuesta.data;
    }

    async deleteTarea(id) {
        await this.http.delete(this.serverUrl + "/" + id, this.options);        
    }

    async patchTarea(id, changes) {
        await this.http.patch(this.serverUrl + "/" + id, changes, this.options);
    }
}