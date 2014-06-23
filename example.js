(function () {
    'use strict';

    var controllers = {},
        rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

    function connecthandler(e) {
        addgamepad(e.gamepad);
    }

    function addgamepad(gamepad) {
        var i, a, e, t, b;

        controllers[gamepad.index] = gamepad; var d = document.createElement("div");
        d.setAttribute("id", "controller" + gamepad.index);
        t = document.createElement("h1");
        t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
        d.appendChild(t);
        b = document.createElement("div");
        b.className = "buttons";
        for (i = 0; i < gamepad.buttons.length; i++) {
            e = document.createElement("span");
            e.className = "button";
            //e.id = "b" + i;
            e.innerHTML = i;
            b.appendChild(e);
        }

        d.appendChild(b);
        a = document.createElement("div");
        a.className = "axes";
        for (i = 0; i<gamepad.axes.length; i++) {
            e = document.createElement("progress");
            e.className = "axis";
            //e.id = "a" + i;
            e.setAttribute("max", "2");
            e.setAttribute("value", "1");
            e.innerHTML = i;
            a.appendChild(e);
        }
        d.appendChild(a);
        document.getElementById("start").style.display = "none";
        document.body.appendChild(d);
        rAF(updateStatus);
    }

    function disconnecthandler(e) {
        var d = document.getElementById("controller" + e.gamepad.index);
        document.body.removeChild(d);
        delete controllers[e.gamepad.index];
    }

    function updateStatus() {
        var j, axes, i, a, controller, d, buttons, b, val, pressed, pct;

        for (j in controllers) {
            controller = controllers[j];
            d = document.getElementById("controller" + j);
            buttons = d.getElementsByClassName("button");
            for (i = 0; i < controller.buttons.length; i++) {
                b = buttons[i];
                val = controller.buttons[i];
                pressed = val == 1.0;
                if (typeof(val) == "object") {
                    pressed = val.pressed;
                    val = val.value;
                }
                pct = Math.round(val * 100) + "%";
                b.style.backgroundSize = pct + " " + pct;
                if (pressed) {
                    b.className = "button pressed";
                } else {
                    b.className = "button";
                }
            }

            axes = d.getElementsByClassName("axis");
            for (i = 0; i < controller.axes.length; i++) {
                a = axes[i];
                a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
                a.setAttribute("value", controller.axes[i] + 1);
            }
        }
        rAF(updateStatus);
    }

    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
}());
