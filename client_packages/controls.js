const keys = {
  "enter": 13,
  "backspace": 8,
  "shift": 16,
  "ctrl": 17,
  "alt": 18,
  "arrow_up": 38,
  "arrow_left": 37,
  "arrow_right": 39,
  "arrow_down": 40,
  "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
  "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72, "i": 73, "j": 74,
  "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80, "q": 81, "r": 82, "s": 83, "t": 84,
  "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90,
  "f1": 112, "f2": 113, "f3": 114, "f4": 115, "f5": 116, "f6": 117,
  "f7": 118, "f8": 119, "f9": 120, "f10": 121, "f11": 122, "f12": 123,
  "tab": 9,
  "caps_lock": 20
};
// enter backspace shift ctrl alt tab caps_lock
// arrow_up arrow_left arrow_right arrow_down  
// 0 1 2 3 4 5 6 7 8 9
// a b c d e f g h i j k l m n o p q r s t u v w x y z
// f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12 

let CONFIG = {
  CUSTOMIZATION_ENABLED: false
};

const defaultHotkeys = {
  "inventory": keys['i'],
  "chat": keys['t'],
  "menu": keys['f5'],
  "noclip": keys['f3']
}

let hotkeys = {
  "inventory": keys['i'],
  "chat": keys['t'],
  "menu": keys['f5'],
  "noclip": keys['f3']
}

mp.keys.bind(hotkeys['noclip'], true, () => {
  mp.events.call('client:controls:toggleNoclip');
})