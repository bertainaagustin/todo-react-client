import React from 'react';
import {connect} from 'react-redux';
import ToDoService from '../../services/ToDoService';
import ToDoItem from './ToDoItem/ToDoItem';
import ToDoAddItem from './TodoAddItem/ToDoAddItem';
import dotenv from 'dotenv';
import ManageUsersService from '../../services/ManageUsersService';
dotenv.config();


class ToDo extends React.Component {
    
    constructor(props) {
        super(props);
        this.toDoService = new ToDoService(props.token); // Instancio el servicio
        this.manageUsersService = new ManageUsersService(props.token); // Instancio el servicio
    }

    async componentDidMount() {
        var tareas = await this.toDoService.getTareas(); // Uso el servicio instanciado
        var usuarios = await this.manageUsersService.getUsers();
        this.props.onInit({tareas, usuarios});
    }

    render() {
        var listado = this.props.listado.map(unItem => {
            return <ToDoItem item={unItem} key={unItem.id}/>
        })
        return (
            <>
                <h1>{process.env.REACT_APP_NOMBRE_PROYECTO}</h1>
                <ToDoAddItem />
                <div>
                    {listado}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listado: state.taskList,
        token: state.token
    }
}

const mapActions = (dispatch) => {
    return {
        onInit: (listado) => dispatch({type: 'INIT', data: listado})
    }
}

const functionRespuesta = connect(mapStateToProps, mapActions);
export default functionRespuesta(ToDo);