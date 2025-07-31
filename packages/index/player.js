mp.events.add('playerJoin', (player) => {
    console.log(`Player joined: ${player}`);
    mp.events.call('server:playerConnect', player);
})