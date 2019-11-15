const estadoInicial = {
    taskList: [],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZ3VzdGluQGJlcnRhaW5hIiwianRpIjoiM2UzNmU2MTYtYjdhZS00ZjIyLWJjYjEtYTY5YTU2YzRjYWFlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxMWE3NTNmNC02ZTJkLTRjNzMtYjM1My03YzQ3YzE0OTVhMDgiLCJleHAiOjE1NzUwNzE3OTksImlzcyI6Imh0dHA6Ly95b3VyZG9tYWluLmNvbSIsImF1ZCI6Imh0dHA6Ly95b3VyZG9tYWluLmNvbSJ9.iru8GCSghL4xrFLgDoicNnwJ_hHaneRFDx27IssQN2o',
    responsablesList : []
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
                responsablesList: action.data.usuarios
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
        default:
            return {...estadoActual};
    }
}