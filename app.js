const inputEle = document.querySelector(".new-repair");
const listEle = document.querySelector('.repair-list ');
const checkEle = document.querySelector('.toggle');
const viewEle = document.querySelectorAll('.view');
const clearCompletedEle = document.querySelector(".clear-completed");

class RepairList {
    constructor() {
        this.repairs = [];
        this.count = 0;     //count is used to remember id of every description
        this.render();
    }

    addRepair() {
        let objCopy = Object.assign({}, repair);
        objCopy.id = this.count++;
        this.repairs.push(objCopy);
        this.render();
    }

    deleteRepair(delId) {
        let repairIndex = this.repairs.findIndex(item => item.id == delId);
        this.repairs.splice(repairIndex, 1);
        this.render();
    };

    markAsComplete(completedId) {
        let change = this.repairs.findIndex(repair => repair.id === completedId);
        if (this.repairs[change].completed === false) {
            this.repairs[change].completed = "completed";
        } else {
            this.repairs[change].completed = false;
        }
        this.render();
    };

    clearCompleted() {
        let completedArr = [];
        this.repairs.forEach(repair => {
            if (repair.completed === "completed") {
                completedArr.push(repair.id);
            }
        });
        completedArr.forEach(id => {
            repairlist.deleteRepair(id);
        });
        this.render();
    };

    render() {
        listEle.innerHTML = "";
        this.repairs.forEach(function (repair) {
            let ifCheck = "";
            if (repair.completed === "completed") {
                ifCheck = "checked";
            }
            listEle.insertAdjacentHTML('afterbegin', `
            <li data-id="${repair.id}" class="${repair.completed}">
                <div class="view">
                    <input class="toggle" type="checkbox" ${ifCheck} >
                    <label>${repair.description}</label>
                    <button class="destroy"></button>
                </div>
            </li>`);
        });
        inputEle.value = "";
    }
}

let repairlist = new RepairList();

class Repair {           // represents an individual repair job
    constructor(description, completedcheck) {
        this.description = description;
        this.completed = completedcheck;
    }
}
let repair = new Repair();

checkInfo = function (event) {           //todo onkeydown to check what we enter before press key enter
    let description = "";
    if (event.keyCode === 13) {          // enter key :: GOT REFERENCE FROM STACKOVERFLOW
        event.returnValue = false;
        description = inputEle.value;
        repair.description = description;
        repair.completed = false;
        repairlist.addRepair(description);
        return description;
    }
}

clearCompletedEle.addEventListener('click', function () {         //todo event listener for clear all marked 
    repairlist.clearCompleted();
})

listEle.addEventListener('click', function (e) {
    if (e.target.nodeName === "BUTTON") {                         //todo event for delete specific item
        const descriptionEle = e.target.closest('li');
        let id = descriptionEle.getAttribute("data-id");          // print id
        repairlist.deleteRepair(id)
    };
    if (e.target.nodeName === "INPUT") {                          //todo event for add completed mark
        const completedEle = e.target.closest('li');
        let completedId = completedEle.getAttribute('data-id');
        completedId = parseInt(completedId);
        repairlist.markAsComplete(completedId);
    }
})