try {
    console.log("[SERVER]: loaded");

    require('./player');
    require('./server');
} catch (e) {
    console.log(`[SERVER]: Failed to load: ${e}`);
}