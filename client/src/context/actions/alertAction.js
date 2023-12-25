export const alertSuccess =(message)=>{
    return{
        type :"SET_SUCCESS",
        alert :{type : "success", message : message},
    }
}
export const alertWarning =(message)=>{
    return{
        type :"SET_WARNING",
        alert :{type : "Warning", message : message},
    }
}
export const alertDanger =(message)=>{
    return{
        type :"SET_DANGER",
        alert :{type : "Danger", message : message},
    }
}
export const alertInfo =(message)=>{
    return{
        type :"SET_INFO",
        alert :{type : "Info", message : message},
    }
}
export const alertNull =(message)=>{
    return{
        type :"SET_NULL",
        alert :{type : "null", message : message},
    }
}