(function () {
    'use strict';

    var controllers = {},
        gamepads;

    function scanGamepads() {
        var gamepads, i, k, ev, seen = {};

        if (navigator.getGamepads) {
            gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
            gamepads = navigator.webkitGetGamepads();
        } else {
            gamepads = [];
        }

        if (!Array.isArray(gamepads)) {
            gamepads = [].slice.call(gamepads);
        }

        gamepads.forEach(function (gamepad) {
            if (gamepad) {
                if (!(gamepad.index in controllers)) {
                    ev = new Event('gamepadconnected');
                    ev.gamepad = gamepad;
                    window.dispatchEvent(ev);
                }

                controllers[gamepad.index] = gamepad;
                seen[gamepad.index] = true;
            }
        });

        for (k in controllers) {
            if (!seen[k]) {
                ev = new Event('gamepaddisconnected', gamepads[i]);
                ev.gamepad = controllers[k];
                window.dispatchEvent(ev);
                delete(controllers[k]);
            }
        }
    }

    // shim for Chrome
    // feature detecting doesn't work because Chrome has a GamepadEvent,
    // but it doesn't support events
    if (!('GamepadEvent' in window) || !('getGamepads' in navigator) || !Array.isArray(navigator.getGamepads())) {
        // needs to be run often because Chrome doesn't update references until getGamepads is called
        setInterval(scanGamepads, 20);
    }
}());
