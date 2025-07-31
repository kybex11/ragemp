const hud = mp.browsers.new("package://ui/index.html#/hud");
hud.active = true;

setTimeout(() => {
  //phone.execute(`window.setPrintedText('Привет из клиента напрямую!');`);
}, 500);
