

function todo(title, notes, date = null, priority = null){
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
    function uncheckTodo(){
        checked=false
    }
    function getNotes(){
        return notes;
    }
    function getDate(){
        return date;
    }
    function getPriority(){
        return priority;
    }
    return{getState, getTitle, checkTodo, uncheckTodo, getNotes, getDate, getPriority}
}

function createTodo(title, notes, date, priority){
    return todo(title, notes, date, priority);
}

function deleteTodo(todo, cont){
    cont.forEach((item, index) => {
        if(item === todo){
            cont.splice(index, 1);
        } 
    })
}


  

export {createTodo, deleteTodo};