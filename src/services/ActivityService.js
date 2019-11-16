import axios from 'axios';

export default class ActivityService {
    constructor(token) {
        this.http = axios;
        this.serverUrl = process.env.REACT_APP_SERVER + '/Activity';
        this.options = {
                headers: {
                    client: 1,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
            }
        };
    }
    async getActivities() {
        const respuesta = await this.http.get(this.serverUrl,this.options);
        return respuesta.data;        
    }

    async postActivity(unActivity) {
        const respuesta = await this.http.post(this.serverUrl, unActivity,this.options);
        return respuesta.data;
    }
}