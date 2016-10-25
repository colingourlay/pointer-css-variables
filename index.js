module.exports = pointer;

var DEVICES = [
    'pointer',
    'mouse',
    'touch',
    'touches-0',
    'touches-1',
    'touches-2',
    'touches-3',
    'touches-4'
];

var MOUSE_DEVICES = DEVICES.filter(function (device) {
    return device.indexOf('touch') === -1;
});

var TOUCH_DEVICES = DEVICES.filter(function (device) {
    return device !== 'mouse';
});

var SYSTEMS = [
    'client',
    'page',
    'screen'
];

var DIMENSIONS = [
    'x',
    'y'
];

var DEFAULTS = DEVICES.reduce(function (memo, device) {
    SYSTEMS.forEach(function (system) {
        DIMENSIONS.forEach(function (dimension) {
            memo[['-', device, system, dimension].join('-')] = '';
        });
    });
    return memo;
}, {});

function pointer (shouldUnset) {
    if (!isSupported()) {
        return new Error('CSS variables not supported');
    }

    var root = document.documentElement;
    var on = root.addEventListener.bind(root);
    var set = root.style.setProperty.bind(root.style);
    var raf = window.requestAnimationFrame.bind(window);
    var variables = Object.assign({}, DEFAULTS);

    function update (devices, e) {
        var _e = e;

        if (e.touches) {
            _e = e.touches[0];
        }

        devices.forEach(function (device) {
            SYSTEMS.forEach(function (system) {
                DIMENSIONS.forEach(function (dimension) {
                    var point = _e;
                    var touchIndex
                    var value;

                    if (device.indexOf('-') > -1) {
                        touchIndex = +device.split('-')[1];

                        if (e.touches[touchIndex] == null) {
                            return;
                        }

                        point = e.touches[touchIndex];
                    }

                    value = point[system + dimension.toUpperCase()];
                    variables[['-', device, system, dimension].join('-')] = value;
                });
            });
        });
    }

    function unset () {
        Object.keys(variables).forEach(function (variable) {
            variables[variable] = '';
        });
    }

    function tick () {
        Object.keys(variables).forEach(function (variable) {
            set(variable, variables[variable]);
        });
        raf(tick);
    }

    on('mousemove', function (e) {
        update(MOUSE_DEVICES, e);
    });

    on('touchmove', function (e) {
        update(TOUCH_DEVICES, e);
    });

    if (shouldUnset) {
        on('mouseleave', unset);
        on('touchend', unset);
        on('touchcancel', unset);
    }

    raf(tick);
}

function isSupported () {
    return window.CSS &&
           window.CSS.supports &&
           window.CSS.supports('--yep', 0);
}
