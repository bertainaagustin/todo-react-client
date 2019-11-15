import React from 'react';
import {connect} from 'react-redux';
import ToDoService from '../../../services/ToDoService';

class ToDoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            en_edicion: false,
            asignando_responsable : false,
            tarea: '',
            responsable_seleccionado_Id: props.responsables[0].id
        }
        this.habilitarEdicion = this.habilitarEdicion.bind(this);
        this.habilitarAsignarResponsable = this.habilitarAsignarResponsable.bind(this);
        this.cambioInput = this.cambioInput.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addResponsible = this.addResponsible.bind(this);
        this.cancel = this.cancel.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.removeItem = this.removeItem.bind(this);       
        this.toDoService = new ToDoService(props.token); // Instancio el servicio

    }
    habilitarAsignarResponsable(e)
    {
        this.setState({
            asignando_responsable : true
        })
    }
    habilitarEdicion(e) {
        this.setState({
            en_edicion: true,
            tarea: this.props.item.name            
        });
        e.preventDefault();
    }

    cambioInput(e) {
        if (e.target.name==="tarea") {
            this.setState({tarea: e.target.value});
        }
        if (e.target.name==="responsable") {
            this.setState({responsable_seleccionado_Id: e.target.value});
        }
    }    

    async updateItem() {
        const obj = {
            id: this.props.item.id,
            name: this.state.tarea,
            isComplete: this.props.item.isComplete,
            responsible: this.props.item.responsible
        }
        await this.toDoService.putTarea(obj);
        this.props.onUpdate(obj);
        this.setState({
            en_edicion: false,
            tarea: ''
        });        
    }

    async addResponsible() {
        const id = this.props.item.id;
        const changes={
            "field": "Responsible",
            "value": this.state.responsable_seleccionado_Id
        };
        const pos = this.props.responsables.findIndex(responsable =>{ 
            return responsable.id === this.state.responsable_seleccionado_Id
        });
        const obj = {
            id: this.props.item.id,
            name: this.state.tarea,
            isComplete: this.props.item.isComplete,
            responsible: this.props.responsables[pos]
        };
        await this.toDoService.patchTarea(id, changes);
        this.props.onUpdate(obj);
        this.setState({
            asignando_responsable: false
        });
    }


    async toggleDone() {
        const obj = {
            id: this.props.item.id,
            name: this.props.item.name,
            isComplete: !this.props.item.isComplete,
            responsible : this.props.item.responsible
        }
        await this.toDoService.putTarea(obj);
        this.props.onUpdate(obj);    
    }

    async removeItem()
    {
        const id = this.props.item.id;
        await this.toDoService.deleteTarea(id);
        this.props.onDelete(id);
    }

    cancel() {
        this.setState({
            en_edicion: false,
            tarea: '',
            asignando_responsable: false
        });
    }



    render() {
        var contenidoTarjeta;
        var nombreResponsable;

        this.props.item.responsible ? nombreResponsable=this.props.item.responsible.userName : nombreResponsable="Sin Asignar"

        contenidoTarjeta = <>
                            {
                            this.props.item.isComplete?
                                <><button className="btn btn-success" onClick={this.toggleDone}><i className="fa fa-check"></i></button> &nbsp;</>
                            : <><button className="btn btn-outline-secondary" onClick={this.toggleDone}><i className="fa fa-check"></i></button> &nbsp;</>
                            } 
                            <div className="float-right">                           
                            { 
                            !this.props.item.responsible ?                            
                                <><button className="btn btn-primary" onClick={this.habilitarAsignarResponsable}><i className="fa fa-user-plus"></i></button>&nbsp;</>                            
                            : null
                            }                                 
                                <button className="btn btn-primary" onClick={this.habilitarEdicion}><i className="fa fa-pencil"></i></button> &nbsp;
                                <button className="btn btn-danger" onClick={this.removeItem}><i className="fa fa-trash"></i></button> &nbsp;
                            </div>
                            {`${this.props.item.name} (Responsable: ${nombreResponsable})`}
                            </>

        const listadoResponsables = this.props.responsables.map(unItem => {
            return <option value={unItem.id} key={unItem.id}>{unItem.userName}</option>
        })        
        if (this.state.en_edicion) {
            contenidoTarjeta = 
                                <div className="input-group mb-3 todo-item">
                                    <input type="text" className="form-control" name="tarea" placeholder="Nueva tarea" value={this.state.tarea} onChange={this.cambioInput}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-success" type="button" onClick={this.updateItem}><i className="fa fa-check"></i></button>
                                        <button className="btn btn-outline-danger" type="button" onClick={this.cancel}><i className="fa fa-times"></i></button>
                                    </div>
                                </div>                                
        }
        if (this.state.asignando_responsable) {
            contenidoTarjeta = 
                                <div className="input-group mb-3 todo-item">
                                    <select name="responsable" className="custom-select" value={this.state.responsable_seleccionado_Id} onChange={this.cambioInput}>
                                        {listadoResponsables}
                                    </select>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-success" type="button" onClick={this.addResponsible}><i className="fa fa-check"></i></button>
                                        <button className="btn btn-outline-danger" type="button" onClick={this.cancel}><i className="fa fa-times"></i></button>
                                    </div>
                                </div>
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{contenidoTarjeta}</h5>
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
        onUpdate: (obj) => {dispatch({type:'UPDATE_ITEM', data: obj})},
        onDelete: (id) => {dispatch({type:'REMOVE_ITEM', data: id})}
    }
}

export default connect(mapToProps,mapDispatch)(ToDoItem);