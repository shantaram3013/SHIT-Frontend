let win, canvas, ctx, canvasData;
let mouse = {
    x: 0,
    y: 0,
    left: false,
    right: false
}
let drawing_area_bounds;
let points = [];
const canvas_alpha = 1;
const grey_hue = 255;

function drawPixel (x, y) {
/*     canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var index = (x + y * canvas.width) * 4;

    canvasData.data[index + 0] = grey_hue;
    canvasData.data[index + 1] = grey_hue;
    canvasData.data[index + 2] = grey_hue;
    canvasData.data[index + 3] = canvas_alpha;
    ctx.putImageData(canvasData, 0, 0); */
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, 1, 1);
}

function init() {
    nw.Screen.Init();
    win = nw.Window.get();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    win.setAlwaysOnTop(true);

    let work_area = nw.Screen.screens[0].work_area;
    win.resizeTo(Math.round(work_area.width), Math.round(work_area.height * 0.30));
    win.moveTo(work_area.x, work_area.height - win.height);

    canvas.width = Math.round(work_area.width) - 60;
    canvas.height = Math.round(work_area.height * 0.30) - 60;

    win.setResizable(false);
    drawGrid();
    assignPageEvtListeners();
}

function drawGrid() {
    const text_height = 80;
    const text_width = 40;
    
    const start_x = (canvas.width % text_width) / 2;
    const end_x = canvas.width - start_x;
    const lower_y = ((canvas.height - text_height) / 2) + text_height;
    const upper_y = lower_y - text_height;

    ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.moveTo(start_x, lower_y);
    ctx.lineTo(end_x, lower_y);

    ctx.moveTo(start_x, upper_y);
    ctx.lineTo(end_x, upper_y);

    for (let x = start_x + 0.5; x <= end_x + text_width; x += text_width) {
        ctx.moveTo(x, lower_y);
        ctx.lineTo(x, lower_y - text_height);
    }

    drawing_area_bounds = {
        left_x: start_x, right_x: end_x, top_y: upper_y, bottom_y: lower_y
    }

    ctx.stroke();
}

function assignPageEvtListeners() {
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (mouse.left) {
            if (pointInRect(mouse, drawing_area_bounds))
                drawPixel(mouse.x, mouse.y);
        }
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        if (e.which === 1) {
            mouse.left = true;
        }
    });

    canvas.addEventListener('mouseup', function (e) {
        if (e.which === 1) {
            mouse.left = false;
        }
    });

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.getElementById('clear-button').addEventListener('click', function() {
        drawGrid();
    })
}

function pointInRect(point, rect) {
    return point.x < rect.right_x && point.x > rect.left_x
    && point.y < rect.bottom_y && point.y > rect.top_y;
}
init();

function addText(str) {
    textContainer = document.getElementById('main-text');
    for (const c of str) {
        let item = document.createElement('div');
        item.classList.add('predicted-char');
        item.innerHTML = c;
        textContainer.appendChild(item);
    }
}

function clearText() {
    textContainer = document.getElementById('main-text');
    textContainer.innerHTML = '';
}