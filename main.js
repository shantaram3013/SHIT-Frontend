let win, canvas, ctx;
let mouse = {
    x: 0,
    y: 0
}
let drawing_area_bounds;

function init() {
    nw.Screen.Init();
    win = nw.Window.get();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    win.setAlwaysOnTop(true);

    let work_area = nw.Screen.screens[0].work_area;

    win.resizeTo(Math.round(work_area.width), Math.round(work_area.height * 0.30));
    win.moveTo(work_area.x, work_area.height - win.height);

    canvas.style.width = 'calc(100% - 60px)';
    canvas.style.height = 'calc(100% - 60px)';

    win.setResizable(false);
}

function draw_grid() {
    const text_height = 60;
    const text_width = 12;
    const start_x = (canvas.width % text_width) / 2;
    const end_x = canvas.width - start_x;
    const lower_y = ((canvas.height - text_height) / 2) + text_height;
    const upper_y = lower_y - text_height;
    drawing_area_bounds = {
        0: {
            x: start_x,
            y: upper_y
        },

        1: {
            x: end_x,
            y: upper_y
        },

        2: {
            x: start_x,
            y: lower_y
        },

        3: {
            x: end_x,
            y: lower_y
        }
    }

    ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.moveTo(start_x, lower_y);
    ctx.lineTo(end_x, lower_y);

    ctx.moveTo(start_x, upper_y);
    ctx.lineTo(end_x, upper_y);

    for (let x = start_x + 0.5; x <= end_x; x += text_width) {
        ctx.moveTo(x, lower_y);
        ctx.lineTo(x, lower_y - text_height);
    }

    ctx.stroke();
}

function assignPageEvtListeners() {
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

    canvas.addEventListener('mousedown', function () {

    })
}



init();
draw_grid();
assignPageEvtListeners();