const estadoInicial = {
    user: '',
    taskList: [],
    token: '',
    responsablesList : [],
    actividadesList: []
}
export default function(estadoActual = estadoInicial, action) 
{
    var pos = 0;
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...estadoActual,
                taskList: [
                    ...estadoActual.taskList,
                    action.data
                ]
            }
        case 'ADD_ACTIVITY':
            return {
                ...estadoActual,
                actividadesList: [
                    action.data,
                    ...estadoActual.actividadesList                    
                ]
            }
        case 'REMOVE_ITEM':
            pos = estadoActual.taskList.findIndex(unItem =>{ 
                return unItem.id === action.data
            })

            return {
                ...estadoActual,
                taskList: [
                    ...estadoActual.taskList.slice(0, pos),
                    ...estadoActual.taskList.slice(pos+1)
                ]
            }
        case 'INIT':
            return {
                ...estadoActual,
                taskList: action.data.tareas,
                responsablesList: action.data.usuarios,
                actividadesList: action.data.actividades
            }

        case 'UPDATE_ITEM':

            pos = estadoActual.taskList.findIndex(unItem =>{ 
                return unItem.id === action.data.id
            })

            return {
                ...estadoActual,
                taskList: [
                    ...estadoActual.taskList.slice(0, pos),
                    action.data,
                    ...estadoActual.taskList.slice(pos+1)
                ]
            }

        case 'SET_TOKEN':
            return {
                ...estadoActual,
                token: action.data
            }

        case 'SET_USER':
            return {
                ...estadoActual,
                user: action.data
            }
        default:
            return {...estadoActual};
    }
}