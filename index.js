const tableList = [
    {
        id: 0,
        name: 100,
        backgroundColor: 'red',
        color: 'white'
    },
    {
        id: 1,
        name: 200,
        backgroundColor: 'blue',
        color: 'white'
    },
    {
        id: 2,
        name: 300,
        backgroundColor: 'orange',
        color: 'white'
    },
    {
        id: 3,
        name: 400,
        backgroundColor: 'pink',
        color: 'black'
    },
    {
        id: 4,
        name: 500,
        backgroundColor: 'yellow',
        color: 'black'
    },
    {
        id: 5,
        name: 600,
        backgroundColor: 'white',
        color: 'black'
    },
    {
        id: 6,
        name: 700,
        backgroundColor: 'gray',
        color: 'white'
    },
    {
        id: 7,
        name: 800,
        backgroundColor: 'green',
        color: 'white'
    },
    {
        id: 8,
        name: 900,
        backgroundColor: 'purple',
        color: 'white'
    }
]

const undoLastMove = [];

// If you want to check slow animation, Please uncomment Code 0, 1, 2, 3 and 5 and comment Code 4 and 6 

window.onload = function () {
    tableList.forEach(value => {
        const box = document.getElementById(value.id + '').children[0];
        box.innerHTML = value.name;
        box.style.backgroundColor = value.backgroundColor;
        box.style.color = value.color;
        
        // Code 0
        // box.style.position = 'absolute';
        // box.style.left = box.getBoundingClientRect().left + 'px';
        // box.style.top = box.getBoundingClientRect().top + 'px';
    })
}


document.addEventListener('DOMContentLoaded', (event) => {

    function handleDragStart(e) {
        this.children[0].style.opacity = '0.5';
        dragSrcEl = this;
        this.children[0].focus();
    }

    function handleDragEnd(e) {
        this.children[0].style.opacity = '1';

        // Code 1
        // adding animation for drag box 
        // this.children[0].style.transition = 'left 2s ease-out, top 2s ease-out';
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        this.children[0].focus();
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        // Code 2
        // this.children[0].style.transition = 'left 2s ease-out, top 2s ease-out';

        if (dragSrcEl !== this) {
            box1 = dragSrcEl.children[0];
            box2 = this.children[0];

            //Code 3
            // var xE = box2.getBoundingClientRect().left;
            // var yE = box2.getBoundingClientRect().top;
            // var xT = box1.getBoundingClientRect().left;
            // var yT = box1.getBoundingClientRect().top;
            // box1.style.left = xE + 'px';
            // box1.style.top = yE + 'px';
            // console.log("box1", xE, yE);
            // // removing animation for drag box 
            // box1.style.transition = 'left 0s ease-out, top 0s ease-out';

            // box2.style.left = xE + 'px';
            // box2.style.top = yE + 'px';
            // box2.style.left = xT + 'px';
            // box2.style.top = yT + 'px';


            // Code 4
            const temp = {
                innerHTML: box1.innerHTML,
                backgroundColor: box1.style.backgroundColor,
                color: box1.style.color
            };
            box1.innerHTML = box2.innerHTML;
            box1.style.backgroundColor = box2.style.backgroundColor;
            box1.style.color = box2.style.color;
            box2.innerHTML = temp.innerHTML;
            box2.style.backgroundColor = temp.backgroundColor;
            box2.style.color = temp.color;


            undoLastMove.push({ source: this.id, destination: dragSrcEl.id });
            document.getElementById('btnUndo').disabled = false;
        }

        return false;

    }

    let items = document.querySelectorAll('td');
    console.log(items)
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
});

function undoMove() {
    if (undoLastMove.length > 0) {
        const lastMove = undoLastMove.pop();
        if (undoLastMove.length === 0) {
            document.getElementById('btnUndo').disabled = true;
        }
        const box1 = document.getElementById(lastMove.source).children[0];
        const box2 = document.getElementById(lastMove.destination).children[0];

        // Code 5
        // moveTarget(box2, box1)

        // Code 6
        const temp = {
            innerHTML: box1.innerHTML,
            backgroundColor: box1.style.backgroundColor,
            color: box1.style.color
        };
        box1.innerHTML = box2.innerHTML;
        box1.style.backgroundColor = box2.style.backgroundColor;
        box1.style.color = box2.style.color;
        box2.innerHTML = temp.innerHTML;
        box2.style.backgroundColor = temp.backgroundColor;
        box2.style.color = temp.color;

    }
}

function moveTarget(element, target) {

    // store the x,y coordinates of the element and target
    var xT = target.getBoundingClientRect().left;
    var yT = target.getBoundingClientRect().top;
    var xE = element.getBoundingClientRect().left;
    var yE = element.getBoundingClientRect().top;
    // set the elements position to their position for a smooth animation
    element.style.left = xE + 'px';
    element.style.top = yE + 'px';
    target.style.left = xT + 'px';
    target.style.top = yT + 'px';
    // set their position to the target position
    // the animation is a simple css transition
    element.style.left = xT + 'px';
    element.style.top = yT + 'px';
    target.style.left = xE + 'px';
    target.style.top = yE + 'px';
}