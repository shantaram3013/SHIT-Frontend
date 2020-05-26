function init() {
    nw.Screen.Init();
    let win = nw.Window.get();
    let canvas = document.getElementById('canvas');
    win.setAlwaysOnTop(true);

/*     var screenCB = {
    onDisplayBoundsChanged: function(screen) {
        console.log('displayBoundsChanged', screen);
    },

    onDisplayAdded: function(screen) {
        console.log('displayAdded', screen);
    },

    onDisplayRemoved: function(screen) {
        console.log('displayRemoved', screen)
    }
    };

    nw.Screen.on('displayBoundsChanged', screenCB.onDisplayBoundsChanged);
    nw.Screen.on('displayAdded', screenCB.onDisplayAdded);
    nw.Screen.on('displayRemoved', screenCB.onDisplayRemoved); */

    new_win.on('focus', function() {
        console.log('New window is focused');
    });


    let work_area = nw.Screen.screens[0].work_area;

    win.resizeTo(work_area.width, work_area.height * 0.20);
    win.moveTo(work_area.x, work_area.height - win.height);

    ctx = canvas.getContext('2d');
}

init();