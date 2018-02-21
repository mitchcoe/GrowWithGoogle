function colorInput() {
    let color = document.getElementById('colorPicker');
    return color.value;
};

function heightInput() {
    let height = document.getElementById('inputHeight');
    return height.value;
};

function widthInput() {
    let width = document.getElementById('inputWidth');
    return width.value;
};

function pixelSize() {
    let size = document.getElementById('pixelSize');
    return size.value;
};

function makeGrid(height, width, pixel) {
    let grid = document.getElementById('pixelCanvas');

    function createRow() {
        let row = document.createElement('tr');
        grid.appendChild(row);
    };

    function createColumn() {
        let cell = document.createElement('td');
        let row = grid.lastElementChild;

        cell.style.width = `${pixel}px`;
        cell.style.height = `${pixel}px`;
        row.appendChild(cell);

        cell.addEventListener("click", () => {
            let bgColor = cell.style.backgroundColor;
            if(!bgColor) {
                cell.style.backgroundColor = colorInput();
            } else if (bgColor === 'white'){
                 cell.style.backgroundColor = colorInput();
            } else {
                cell.style.backgroundColor = 'white';
            };
        }, false);
    };
    // For loop that draws the grid
    for(let i = 0; i < height; i++) {
        createRow();
        for(let  j = 0; j < width; j++) {
            createColumn();
        };
    };
};

function colorFill() {
    let fill = document.getElementsByTagName("td");
    let fillArr = [...fill];

    fillArr.forEach(cell => {
        if(!cell.classList.contains('lock')){
            cell.style.backgroundColor = colorInput();
        };
    });
};

function whiteOut() {
    let blank = document.getElementsByTagName('td')
        blankArr = [...blank];

    blankArr.forEach(cell => {
        if(!cell.classList.contains('lock')){
            cell.style.backgroundColor = 'white';
        };
    });
};

function lockColor() {
    let check = document.getElementById('colorLock')
        pixel = document.getElementsByTagName('td')
        hide = document.getElementById('hideLock');

    check.value === "unchecked" ? check.value = "on" : check.value = "unchecked";

    pixelArr = [...pixel];
    pixelArr.forEach(cell => {
        cell.addEventListener("click", () => {
            if(check.value === "on") cell.classList.toggle("lock"); 

            if(cell.classList.contains('lock')) {
                if(hide.value !== "on") cell.textContent = "x";
            } else if((!cell.classList.contains('lock')) && cell.style.backgroundColor !== "white") {
                if(hide.value !== "on" && check.value === "on") cell.textContent = "x";
            } else {
                cell.textContent = null;
            };
        });
    });
};

// hides x marks from lock function
function hideLockMark() {
    let hide = document.getElementById('hideLock');
    hide.value ==="unchecked" ? hide.value = "on" : hide.value = "unchecked";
};

function removeLock() {
    let lock = document.getElementById('colorLock');
    let pixel = document.getElementsByTagName('td');

    pixelArr = [...pixel];
    pixelArr.forEach(cell => {
        if(cell.classList.contains('lock')) {
            cell.classList.remove('lock');
        };
        cell.textContent = null;
    });
};

function reset() {
    let grid = document.getElementById('pixelCanvas');

    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    };
};

function buttonEvents() {
    let submit = document.getElementById('submit')
        blank = document.getElementById('white')
        fill = document.getElementById('fill')
        lock = document.getElementById('colorLock')
        hide = document.getElementById('hideLock')
        noLock = document.getElementById('removeLock');
    
    submit.addEventListener("click", () =>{
        reset();
        makeGrid(heightInput(), widthInput(), pixelSize());
    }, false);

    fill.addEventListener("click", () => {
        colorFill();
    }, false);

    blank.addEventListener("click", () => {
        whiteOut();
    }, false);

    lock.addEventListener("click", () => {
        lockColor();
    }, false);

    hide.addEventListener("click", () => {
        hideLockMark();
    }, false);

    noLock.addEventListener("click", () => {
        removeLock();
    }, false);
};

window.onload = buttonEvents();