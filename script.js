const grid = document.querySelector(".grid");
const gridSize = document.getElementById("size-selector")
const gridInfo = document.getElementById("size-label");

const createCells = ()=>{
    let newCell = document.createElement("div");
    newCell.setAttribute("draggable","false")
    newCell.classList.add("cell");
    grid.appendChild(newCell);
}

const deleteCells = ()=>{
    let lastCell = grid.lastElementChild;
    lastCell.remove();
}

const initialSize = parseInt(gridSize.value);
grid.style.gridTemplateColumns = `repeat(${initialSize},1fr)`;
grid.style.gridTemplateRows = `repeat(${initialSize},1fr)`;
gridInfo.innerHTML = `Grid Size: <b>${initialSize} x ${initialSize}</b>`
for (i = 0; i < initialSize * initialSize; i++) {
    createCells();
}

gridSize.addEventListener("input", ()=>{
    let rowsColumnsNumber = parseInt(gridSize.value);
    let totalCells = rowsColumnsNumber * rowsColumnsNumber;
    while (totalCells > grid.children.length){
        createCells();
    } while (totalCells < grid.children.length){
        deleteCells();
    }
    grid.style.gridTemplateColumns = `repeat(${rowsColumnsNumber}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rowsColumnsNumber}, 1fr)`;
    gridInfo.innerHTML = `Grid Size: <b>${rowsColumnsNumber} x ${rowsColumnsNumber}</b>`;
})


const opt = document.querySelectorAll(".option");
const colorSelector = document.getElementById("color-selector")
const colorMode = document.getElementById("color");
const rainbowMode = document.getElementById("rainbow");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const darkenMode = document.getElementById("darken");
const lightenMode = document.getElementById("lighten");
const showGrid = document.getElementById("show-grid");
const cells = document.querySelectorAll(".cell")

let colorChosen = colorSelector.value;

let painting = false;

const paintCell = (e)=>{
    if (!painting) return;
    const cell = e.target;
    if (colorMode.classList.contains("pressed")){
        cell.style.backgroundColor = colorChosen;
    }
}

const startPainting = ()=>{
    painting = true;
}

const stopPainting = ()=>{
    painting = false;
}

colorSelector.addEventListener("input", (e)=>{
    colorChosen = e.target.value;
})

opt.forEach((button)=>{
    button.addEventListener("click", (e)=>{
        e.target.classList.toggle("pressed");
        opt.forEach((otherButton)=>{
            if (otherButton !== e.target) {
                otherButton.classList.remove("pressed");
            }
        })
        if (colorMode.classList.contains("pressed")) {
            cells.forEach((cell)=>{
                cell.addEventListener("mousedown", startPainting);
                cell.addEventListener("mouseup", stopPainting);
                cell.addEventListener("mouseover", paintCell);
            })
        } else if (!colorMode.classList.contains("pressed")) {
            cells.forEach((cell)=>{
                cell.removeEventListener("mousedown", startPainting);
                cell.removeEventListener("mouseup", stopPainting);
                cell.removeEventListener("mouseover", paintCell);
            })
        }
    })
})
