window.Gamepad = (function(self) {

  self.supported = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
  !!navigator.webkitGamepads || !!navigator.mozGamepads ||
  !!navigator.msGamepads || !!navigator.gamepads ||
  (navigator.getGamepads && navigator.getGamepads());

  self.ticking = false;

  var BUTTONS = {
    FACE_1: 0,
    FACE_2: 1,
    FACE_3: 2,
    FACE_4: 3,
    LEFT_SHOULDER: 4,
    RIGHT_SHOULDER: 5,
    LEFT_SHOULDER_BOTTOM: 6,
    RIGHT_SHOULDER_BOTTOM: 7,
    SELECT: 8,
    START: 9,
    LEFT_ANALOGUE_STICK: 10,
    RIGHT_ANALOGUE_STICK: 11,
    PAD_UP: 12,
    PAD_DOWN: 13,
    PAD_LEFT: 14,
    PAD_RIGHT: 15,
    CENTER_BUTTON: 16
  };

  self.SHOULDER0_BUTTON_THRESHOLD = .5;
  self.SHOULDER1_BUTTON_THRESHOLD = 30.0 / 255.0;
  self.RIGHT_AXIS_THRESHOLD = 7849.0 / 32767.0;
  self.LEFT_AXIS_THRESHOLD = 8689 / 32767.0;
  self.gamepads = [];
  var prevRawGamepadTypes = [];
  var prevTimestamps = [];

  if (self.supported) {
    // Older Firefox
    // window.addEventListener('MozGamepadConnected',
    // onGamepadConnect, false);
    // window.addEventListener('MozGamepadDisconnected',
    // onGamepadDisconnect, false);

    // //W3C Specification
    // window.addEventListener('gamepadconnected', onGamepadConnect, false);
    // window.addEventListener('gamepaddisconnected', onGamepadDisconnect, false);

    // Chrome
    if (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) {
      startPolling();
    }

    //CocoonJS
    if(navigator.getGamepads && navigator.getGamepads()) {
      startPolling();
    }
  }

  /**
  * Starts the polling
  * @private
  * @see onGamepadConnect
  */
  function startPolling() {
    if (!self.ticking) {
      self.ticking = true;
      tick();
    }
  }

  /**
  * Does one 'tick' and prepares for the next
  * @private
  * @see pollStatus
  */
  function tick() {
    pollStatus();
    if (self.ticking) {
      window.requestAnimationFrame(tick);
    }
  }

  /**
  * Stops the polling
  * @private
  */
  function stopPolling() {
    self.ticking = false;
  }

  /**
  * Compares timestamps for changes
  * @see pollGamepads()
  */
  function pollStatus() {
    pollGamepads();
    for (var i in self.gamepads) {
      var gamepad = self.gamepads[i];
      if (gamepad.timestamp &&
        (gamepad.timestamp === prevTimestamps[i])) {
          continue;
        }
        prevTimestamps[i] = gamepad.timestamp;
      }
    }

    /**
    * Polls the navigator.*Gamepads object for all gamepads connected
    */
    function pollGamepads() {
      var rawGamepads =
      (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
      navigator.webkitGamepads || navigator.mozGamepads ||
      navigator.msGamepads || navigator.gamepads ||
      (navigator.getGamepads && navigator.getGamepads());
      if (rawGamepads) {
        self.gamepads = [];
        for (var i = 0; i < rawGamepads.length; i++) {
          if (typeof rawGamepads[i] !== prevRawGamepadTypes[i]) {
            prevRawGamepadTypes[i] = typeof rawGamepads[i];
          }
          if (rawGamepads[i] && !rawGamepads[i].id.match(/Unknown/)) {
            // Above is a the only fix i could find to FIX THAT SIHT.
            self.gamepads.push(rawGamepads[i]);
          }
        }
      }
    }
    /**
    * Returns if a specific button on a certain gamepad was pressed
    * @param {number} pad  The Gamepad to check
    * @param {string} buttonId The button to check
    * @returns {boolean} If the button on the specific gamepad is currently pressed
    */
    self.pressed = function(pad, buttonId) {
      if (self.gamepads[pad] && (BUTTONS[buttonId] >= 0)) {
        var buttonIndex = BUTTONS[buttonId];
        if (buttonIndex === 4 || buttonIndex === 5) {
          // return self.gamepads[pad].buttons[buttonIndex].value > self.SHOULDER0_BUTTON_THRESHOLD;
          return self.gamepads[pad].buttons[buttonIndex].pressed;
        } else if (buttonIndex === 6 || buttonIndex === 7) {
          // return self.gamepads[pad].buttons[buttonIndex].value > self.SHOULDER1_BUTTON_THRESHOLD;
          return self.gamepads[pad].buttons[buttonIndex].pressed;
        } else {
          // return self.gamepads[pad].buttons[buttonIndex] > 0.5;
          return self.gamepads[pad].buttons[buttonIndex].pressed;
        }
      } else {
        return false;
      }
    };

    /**
    * Returns the amount of movement from the deadzone (-1 to 1)
    * @param {number} pad  The Gamepad to check
    * @param {string} axisId The axis and dimension to check
    * @returns {number} The amount of movement, if any
    */
    self.moved = function(pad, axisId) {
      if (self.gamepads[pad]) {
        if (axisId === "LEFT_X") {
          if (self.gamepads[pad].axes[0] < -self.LEFT_AXIS_THRESHOLD ||
            self.gamepads[pad].axes[0] > self.LEFT_AXIS_THRESHOLD) {
              return self.gamepads[pad].axes[0];
            }
          } else if (axisId === "LEFT_Y") {
          if (self.gamepads[pad].axes[1] < -self.LEFT_AXIS_THRESHOLD ||
            self.gamepads[pad].axes[1] > self.LEFT_AXIS_THRESHOLD) {
              return self.gamepads[pad].axes[1];
            }
          } else if (axisId === "RIGHT_X") {
            if (self.gamepads[pad].axes[2] < -self.RIGHT_AXIS_THRESHOLD ||
              self.gamepads[pad].axes[2] > self.RIGHT_AXIS_THRESHOLD) {
                return self.gamepads[pad].axes[2];
              }
          } else if (axisId === "RIGHT_Y") {
            if (self.gamepads[pad].axes[3] < -self.RIGHT_AXIS_THRESHOLD ||
              self.gamepads[pad].axes[3] > self.RIGHT_AXIS_THRESHOLD) {
                return self.gamepads[pad].axes[3];
              }
            }
          } else {
            return 0;
          }
      };
    /**
    * Adds a gamepad when connected and starts the polling
    * @param {EventObject} event A 'MozGamepadConnected' or 'gamepadconnected' event object
    */
    function onGamepadConnect(event) {
      var gamepad = event.gamepad;
      self.gamepads[event.gamepad.id] = gamepad;
      self.startPolling();
    }

    /**
    * Sets a disconnected gamepad to 'null'
    * @param {EventObject} event A 'MozGamepadDisconnected' or 'gamepaddisconnected' event object
    */
    function onGamepadDisconnect(event) {
      self.gamepads[event.gamepad.id] = null;
      if (self.gamepads.length === 0) {
        stopPolling();
      }
    }

    return self;

  })(Gamepad || {});
