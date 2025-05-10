const opt = document.querySelectorAll(".option");
const grid = document.querySelector(".grid");
const gridSize = document.getElementById("size-selector")
const gridInfo = document.getElementById("size-label");

const initialSize = parseInt(gridSize.value);
grid.style.gridTemplateColumns = `repeat(${initialSize},1fr)`;
grid.style.gridTemplateRows = `repeat(${initialSize},1fr)`;
gridInfo.innerHTML = `Grid Size: <b>${initialSize} x ${initialSize}</b>`

const createCells = ()=>{
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    grid.appendChild(newCell)
}

const deleteCells = ()=>{
    const lastCell = grid.lastElementChild;
    lastCell.remove();
}

gridSize.addEventListener("input", ()=>{
    let rowsColumnsNumber = parseInt(gridSize.value);
    let totalCells = rowsColumnsNumber * rowsColumnsNumber;
    while (totalCells > grid.children.length){
        createCells();
    } while (totalCells <= grid.children.length){
        deleteCells();
    }
    grid.style.gridTemplateColumns = `repeat(${rowsColumnsNumber}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rowsColumnsNumber}, 1fr)`;
    gridInfo.innerHTML = `Grid Size: <b>${rowsColumnsNumber} x ${rowsColumnsNumber}</b>`;
})

let cantidadHijos = grid.children.length;

console.log(cantidadHijos);
