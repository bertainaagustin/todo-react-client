import React from 'react';
import {connect} from 'react-redux';
import ToDoService from '../../services/ToDoService';
import ToDoItem from './ToDoItem/ToDoItem';
import ToDoAddItem from './TodoAddItem/ToDoAddItem';
import dotenv from 'dotenv';
import ManageUsersService from '../../services/ManageUsersService';
import Activity from './Activity/Activity';
import ActivityService from '../../services/ActivityService';
dotenv.config();


class ToDo extends React.Component {
    
    constructor(props) {
        super(props);
        this.toDoService = new ToDoService(props.token); // Instancio el servicio
        this.manageUsersService = new ManageUsersService(props.token); // Instancio el servicio
        this.activityService = new ActivityService(props.token); // Instancio el servicio
    }

    async componentDidMount() {
        var tareas = await this.toDoService.getTareas(); // Uso el servicio instanciado
        var usuarios = await this.manageUsersService.getUsers();
        var actividades = await this.activityService.getActivities();
        this.props.onInit({tareas, usuarios, actividades});
    }

    render() {
        var listadoTareas = this.props.tareas.map(unItem => {
            return <ToDoItem item={unItem} key={unItem.id}/>
        })
        var listadoActividades = this.props.actividades.map(unActivity => {
            return <Activity actividad={unActivity} key={unActivity.id}/>
        })
        return (
            <>
                <h1>{process.env.REACT_APP_NOMBRE_PROYECTO}</h1>
                <ToDoAddItem />
                <h2> Tareas </h2>
                <div className="itemList mb-3">
                    {listadoTareas}
                </div>
                <h2> Historia </h2>
                <div className="actividadList mb-3">
                    {listadoActividades}
                </div>                
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tareas: state.taskList,
        actividades: state.actividadesList,
        token: state.token
    }
}

const mapActions = (dispatch) => {
    return {
        onInit: (listadosIniciales) => dispatch({type: 'INIT', data: listadosIniciales})
    }
}

const functionRespuesta = connect(mapStateToProps, mapActions);
export default functionRespuesta(ToDo);