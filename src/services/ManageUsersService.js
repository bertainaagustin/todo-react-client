import axios from 'axios';

export default class ManageUsersService {
    constructor(token) {
        this.http = axios;
        this.serverUrl = process.env.REACT_APP_SERVER + '/ManageUsers';
        this.options = {
                headers: {
                    client: 1,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
            }
        };
    }

    async getUsers() {
        const respuesta = await this.http.get(this.serverUrl,this.options);
        return respuesta.data;        
    }
}