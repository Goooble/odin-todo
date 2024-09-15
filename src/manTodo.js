const todoCont = [];

function todo(title, description = null, date = null, priority = null, project = "inbox"){
    var state = false;

    function getState(){
        return state;
    }
    return{getState}
}

function createTodo(title, description, date, priority, project){
    todoCont.unshift(todo(title, description, date, priority, project));
}

function deleteTodo(todo){
    todoCont.forEach((item, index) => {
        if(item === todo){
            todoCont.splice(index, 1);
        } 
    })
}

export {todoCont, createTodo, deleteTodo};