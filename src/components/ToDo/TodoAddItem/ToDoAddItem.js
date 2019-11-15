import React from 'react';
import {connect} from 'react-redux';
import ToDoService from '../../../services/ToDoService';

class ToDoAddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tarea: '',
            mensaje_error: ''
        }
        this.cambioInput = this.cambioInput.bind(this);
        this.save = this.save.bind(this);
        this.toDoService = new ToDoService(props.token); // Instancio el servicio
    }

    cambioInput(e) {
        if (e.target.name==="tarea") {
            this.setState({tarea: e.target.value});
        }
    }

    async save() {
        if (this.state.tarea==='') {
            this.setState({mensaje_error: 'Debe asignar un nombre a la tarea nueva'});
            return;
        }
        this.setState({mensaje_error: ''});
        const obj = {
            name: this.state.tarea,
            isComplete: false
        }
        const respuesta = await this.toDoService.postTarea(obj);
        this.props.onSave(respuesta);
    }

    render() {
        const mensajeError = this.state.mensaje_error==='' ? null : <div className="alert alert-danger">{this.state.mensaje_error}</div>;

        return (
            <div>{mensajeError}
                <div className="input-group mb-3 todo-add">
                    <input type="text" className="form-control" name="tarea" placeholder="Nueva tarea" value={this.state.tarea} onChange={this.cambioInput}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" onClick={this.save}><i className="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapToProps = (state) => {
    return {
        responsables: state.responsablesList,
        token: state.token
    }
}

const mapDispatch = (dispatch) => {
    return {
        onSave: (obj) => {dispatch({type:'ADD_ITEM', data: obj})}
    }
}

export default connect(mapToProps,mapDispatch)(ToDoAddItem);