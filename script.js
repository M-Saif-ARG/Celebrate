const addTextBtn = document.getElementById('addTextBtn');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const txt = document.getElementById('txt');
const textbox = document.getElementById('textbox');

let currentFontSize = 12;
let isBold = false;
let isItalic = false;

let undoStack = [];
let redoStack = [];

function changeFont(fontName) {
    const textElement = document.querySelector('.txt');
    textElement.style.fontFamily = fontName;
    updateHistory(textElement.innerHTML);
}

function increaseNumber(textboxId) {
    let currentValue = parseInt(document.getElementById(textboxId).value);
    document.getElementById(textboxId).value = currentValue + 1;
    txt.style.fontSize = document.getElementById(textboxId).value + 'px';
}

function decreaseNumber(textboxId) {
    let currentValue = parseInt(document.getElementById(textboxId).value);
    if (currentValue > 1) {
        document.getElementById(textboxId).value = currentValue - 1;
        txt.style.fontSize = document.getElementById(textboxId).value + 'px';
    }
}

textbox.addEventListener('input', (event) => {
    let fontSize = parseInt(event.target.value);
    if (fontSize >= 1) {
        txt.style.fontSize = fontSize + 'px';
    } else {
        event.target.value = currentFontSize;
    }
});

boldBtn.addEventListener('click', () => {
    isBold = !isBold;
    if (isBold) {
        txt.classList.add('bold');
    } else {
        txt.classList.remove('bold');
    }
});

italicBtn.addEventListener('click', () => {
    isItalic = !isItalic;
    if (isItalic) {
        txt.classList.add('italic');
    } else {
        txt.classList.remove('italic');
    }
});

function updateHistory(content) {
    undoStack.push(content);
    redoStack = [];
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push(txt.innerHTML);
        let previousState = undoStack.pop();
        txt.innerHTML = previousState;
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(txt.innerHTML);
        let nextState = redoStack.pop();
        txt.innerHTML = nextState;
    }
}

txt.addEventListener('input', () => {
    updateHistory(txt.innerHTML);
});

let draggedElement = null;

document.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('txt')) {
        draggedElement = e.target;
        let offsetX = e.clientX - draggedElement.getBoundingClientRect().left;
        let offsetY = e.clientY - draggedElement.getBoundingClientRect().top;

        const screen = document.querySelector('.screen');
        const screenRect = screen.getBoundingClientRect();

        function moveAt(e) {
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            const draggedRect = draggedElement.getBoundingClientRect();

            if (newLeft < screenRect.left) {
                newLeft = screenRect.left;
            }

            if (newTop < screenRect.top) {
                newTop = screenRect.top;
            }

            if (newLeft + draggedRect.width > screenRect.right) {
                newLeft = screenRect.right - draggedRect.width;
            }

            if (newTop + draggedRect.height > screenRect.bottom) {
                newTop = screenRect.bottom - draggedRect.height;
            }

            draggedElement.style.left = newLeft - screenRect.left + 'px';
            draggedElement.style.top = newTop - screenRect.top + 'px';
        }

        document.addEventListener('mousemove', moveAt);

        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', moveAt);
        });
    }
});

document.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('txt')) {
        draggedElement = e.target;
        let touch = e.touches[0];
        let offsetX = touch.clientX - draggedElement.getBoundingClientRect().left;
        let offsetY = touch.clientY - draggedElement.getBoundingClientRect().top;

        const screen = document.querySelector('.screen');
        const screenRect = screen.getBoundingClientRect();

        function moveAt(e) {
            let touch = e.touches[0];
            let newLeft = touch.clientX - offsetX;
            let newTop = touch.clientY - offsetY;

            const draggedRect = draggedElement.getBoundingClientRect();

            if (newLeft < screenRect.left) {
                newLeft = screenRect.left;
            }

            if (newTop < screenRect.top) {
                newTop = screenRect.top;
            }

            if (newLeft + draggedRect.width > screenRect.right) {
                newLeft = screenRect.right - draggedRect.width;
            }

            if (newTop + draggedRect.height > screenRect.bottom) {
                newTop = screenRect.bottom - draggedRect.height;
            }

            draggedElement.style.left = newLeft - screenRect.left + 'px';
            draggedElement.style.top = newTop - screenRect.top + 'px';
        }

        document.addEventListener('touchmove', moveAt);

        document.addEventListener('touchend', function () {
            document.removeEventListener('touchmove', moveAt);
        });
    }
});
