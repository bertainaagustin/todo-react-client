import React, { Component } from 'react'

export default class Activity extends Component {
    render() {
        return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Autor: {this.props.actividad.userName}</h5>
                <p className="card-text">{this.props.actividad.details}</p>
            </div>            
        </div>
        )
    }
}
