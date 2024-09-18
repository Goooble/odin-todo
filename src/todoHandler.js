

function todo(title, description = null, date = null, priority = null, project = "inbox"){
    var checked = false;
    function getTitle(){
        return title;
    }
    function getState(){
        return checked;
    }

    function checkTodo(){
        checked = true;
    }
    return{getState, getTitle, checkTodo}
}

function createTodo(title, description, date, priority, project){
    return todo(title, description, date, priority, project);
}

function deleteTodo(todo, cont){
    cont.forEach((item, index) => {
        if(item === todo){
            cont.splice(index, 1);
        } 
    })
}


  

export {createTodo, deleteTodo};