const keys = {"enter":"0x0D","backspace":"0x08","shift":"0x10","ctrl":"0x11","alt":"0x12","arrow_up":"0x26","arrow_left":"0x25","arrow_right":"0x27","arrow_down":"0x28","0":"0x30","1":"0x31","2":"0x32","3":"0x33","4":"0x34","5":"0x35","6":"0x36","7":"0x37","8":"0x38","9":"0x39","a":"0x41","b":"0x42","c":"0x43","d":"0x44","e":"0x45","f":"0x46","g":"0x47","h":"0x48","i":"0x49","j":"0x4A","k":"0x4B","l":"0x4C","m":"0x4D","n":"0x4E","o":"0x4F","p":"0x50","q":"0x51","r":"0x52","s":"0x53","t":"0x54","u":"0x55","v":"0x56","w":"0x57","x":"0x58","y":"0x59","z":"0x5A","f1":"0x70","f2":"0x71","f3":"0x72","f4":"0x73","f5":"0x74","f6":"0x75","f7":"0x76","f8":"0x77","f9":"0x78","f10":"0x79","f11":"0x7A","f12":"0x7B","tab":"0x07","caps_lock":"0x14"};
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

mp.events.add('client:controls:getHotkey', (a) => {
  if(CONFIG.CUSTOMIZATION_ENABLED) return hotkeys[a];
  else return defaultHotkeys[a];
})

mp.events.add('client:controls:getKey', (a) => {
  if(keys[a]) return keys[a];
})