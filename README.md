Gamepad API Polyfill
====================

The Gamepad API has been released on Firefox, but Chrome still lags in support. This polyfill adds support for the 'gamepadconnected' and 'gamepaddisconnected' events to browsers that implemented previous drafts of the Gamepad API.

To use, just include `gamepad.js`:

    <script type='text/javascript' src='https://raw.githubusercontent.com/beatgammit/gamepad-api-polyfill/master/gamepad.js'></script>

Then add event listeners as normal:

    window.addEventListener('gamepadconnected', function (gamepad) { console.log(gamepad); });
    window.addEventListener('gamepaddisconnected', function (gamepad) { console.log(gamepad); });

That's it!

Polling
-------

For browsers that don't support these events, `navigator.getGamepads()` (or the vendor-prefixed version) will be polled every 20ms. The reason for this is that Chrome doesn't update `Gamepad` references until `navigator.getGamepads()` is called.

For browsers that do (e.g. Firefox), this library will do nothing.

License
-------

BSD (see LICENSE.BSD for details).
