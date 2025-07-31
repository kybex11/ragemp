const hud = mp.browsers.new("package://ui/index.html#/hud");

hud.active = true;
mp.game.ui.displayRadar(false);
mp.gui.chat.show(false);

setTimeout(() => {
  //phone.execute(`window.setPrintedText('Привет из клиента напрямую!');`);
}, 500);
