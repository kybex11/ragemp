mp.events.add('inv_on', (player) => {
    player.alpha = 0;
})

mp.events.add('inv_off', (player) => {
    player.alpha = 255;
})