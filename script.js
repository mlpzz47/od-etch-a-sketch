const opt = document.querySelectorAll(".painting-option");
const colorSelector = document.getElementById("color-selector")
const colorMode = document.getElementById("color");
const rainbowMode = document.getElementById("rainbow");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const darkenMode = document.getElementById("darken");
const lightenMode = document.getElementById("lighten");
const showGrid = document.getElementById("show-grid");
const cells = document.querySelectorAll(".cell")

// color mode

let colorChosen = colorSelector.value;


// rainbow mode

const getRandomColor = ()=>{
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

// eraser and clear mode

let initialColor = `#fff`

// darken mode


const darkenColor = (cell)=>{
    let brightness = parseFloat(cell.style.filter.replace("brightness(","").replace(")","")) || 1;
    if (brightness > 0.1) {
        brightness -= 0.1;
    } else if (brightness == 0) {
        brightness = 0;
    }
    return brightness;
}

// lighten mode

const lightenColor = (cell)=>{
    let opacity = cell.style.opacity || 1;
    if (opacity > 0.1) {
        opacity -= 0.1;
    } else if (opacity == 0) {
        opacity = 0;
    }
    return opacity;
}

// cell painting events

let painting = false;

const paintCell = (e)=>{
    if (!painting) return;
    const cell = e.target;
    if (colorMode.classList.contains("pressed")) {
        cell.style.backgroundColor = colorChosen;
        cell.style.filter = `brightness(1)`;
        cell.style.opacity = "1";
    } else if (rainbowMode.classList.contains("pressed")) {
        cell.style.backgroundColor = getRandomColor();
        cell.style.filter = `brightness(1)`;
        cell.style.opacity = "1";
    } else if (eraser.classList.contains("pressed")) {
        cell.style.backgroundColor = initialColor;
        cell.style.filter = `brightness(1)`;
        cell.style.opacity = "1";
    } else if (darkenMode.classList.contains("pressed")) {
        let darkened = darkenColor(cell);
        cell.style.filter = `brightness(${darkened})`;
        cell.style.opacity = "1";
    } else if (lightenMode.classList.contains("pressed")) {
        let lightened = lightenColor(cell);
        cell.style.opacity = `${lightened}`;
        cell.style.filter = `brightness(1)`;
    }
}

colorSelector.addEventListener("input", (e)=>{
    colorChosen = e.target.value;
})

const startPainting = ()=>{
    painting = true;
}

const stopPainting = ()=>{
    painting = false;
}

const paintingEvents = (cell)=>{
    cell.addEventListener("mousedown", startPainting);
    cell.addEventListener("mouseup", stopPainting);
    cell.addEventListener("mouseover", paintCell);
}



opt.forEach((button)=>{
    button.addEventListener("click", (e)=>{
        e.target.classList.toggle("pressed");
        opt.forEach((otherButton)=>{
            if (otherButton !== e.target) {
                otherButton.classList.remove("pressed");
            }
        })
        if (colorMode.classList.contains("pressed") || rainbowMode.classList.contains("pressed") || eraser.classList.contains("pressed") || darkenMode.classList.contains("pressed") || lightenMode.classList.contains("pressed")) {
            cells.forEach((cell)=>{
                paintingEvents(cell);
            })
        } else if (!colorMode.classList.contains("pressed") || !rainbowMode.classList.contains("pressed") || !eraser.classList.contains("pressed") || darkenMode.classList.contains("pressed") || lightenMode.classList.contains("pressed")) {
            cells.forEach((cell)=>{
                cell.removeEventListener("mousedown", startPainting);
                cell.removeEventListener("mouseup", stopPainting);
                cell.removeEventListener("mouseover", paintCell);
            })
        }
    })
})

clear.addEventListener("click", (e)=>{
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell)=>{
        cell.style.backgroundColor = initialColor;
        cell.style.filter = "brightness(1)";
        cell.style.opacity = "1";
    })
})

showGrid.addEventListener("click", (e)=>{
    e.target.classList.toggle("pressed")
    let cells = document.querySelectorAll(".cell");
    if (showGrid.classList.contains("pressed")) {
        cells.forEach((cell)=>{
        cell.style.border = `1px solid #0006`
        })
    } else {
        cells.forEach((cell)=>{
        cell.style.border = `none`
        })
    }
})


// changing the grid size

const grid = document.querySelector(".grid");
const gridSize = document.getElementById("size-selector")
const gridInfo = document.getElementById("size-label");

const createCells = ()=>{
    let newCell = document.createElement("div");
    newCell.setAttribute("draggable","false")
    newCell.classList.add("cell");
    grid.appendChild(newCell);
    paintingEvents(newCell);
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

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell)=>{
        cell.style.backgroundColor = initialColor;
        cell.style.filter = "brightness(1)";
        if (showGrid.classList.contains("pressed")) {
        cells.forEach((cell)=>{
        cell.style.border = "none";
        })
        showGrid.classList.remove("pressed");
        }
    })

    grid.style.gridTemplateColumns = `repeat(${rowsColumnsNumber}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rowsColumnsNumber}, 1fr)`;
    gridInfo.innerHTML = `Grid Size: <b>${rowsColumnsNumber} x ${rowsColumnsNumber}</b>`;
})