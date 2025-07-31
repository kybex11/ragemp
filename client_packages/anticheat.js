let oldPos;
let isPlayerTpModeOn = false;
let lastTime = Date.now();
let playerInCar = false;
let suspiciousActions = [];

let lastWeaponCheck = Date.now();
let speedHistory = [];
let heightHistory = [];

const CONFIG = {
    MAX_SPEED: 10,
    MAX_TELEPORT_DISTANCE: 10,
    MAX_HEIGHT_CHANGE: 3,
    SUSPICIOUS_ACTIONS_THRESHOLD: 3,
    CHECK_INTERVAL: 1000,
    SPEED_HISTORY_SIZE: 5,
    HEIGHT_HISTORY_SIZE: 5,
    AMMO_LIMIT: 1000,
    DEBUG_MODE: true
};

mp.events.add('playerEnterVehicle', true, () => playerInCar = true);
mp.events.add('playerLeaveVehicle', true, () => playerInCar = false);

mp.events.add("playerSpawn", (player) => {
    oldPos = player.position;
    resetHistory();
});

mp.events.add("setAnticheatTpModeStatus", (player, status) => {
    isPlayerTpModeOn = status;
});

function resetHistory() {
    speedHistory = [];
    heightHistory = [];
    suspiciousActions = [];
}

function logDebug(message) {
    if (CONFIG.DEBUG_MODE) {
        mp.console.logInfo(message);
    }
}

function addSuspiciousAction(type) {
    suspiciousActions.push({ type, timestamp: Date.now() });

    suspiciousActions = suspiciousActions.filter(action =>
        Date.now() - action.timestamp < 60000
    );

    if (suspiciousActions.length >= CONFIG.SUSPICIOUS_ACTIONS_THRESHOLD) {
        logDebug(`⚠️ Обнаружено множество подозрительных действий: ${suspiciousActions.map(a => a.type).join(", ")}`);
    }
}

mp.events.add("render", () => {
    const currentTime = Date.now();
    if (currentTime - lastTime < CONFIG.CHECK_INTERVAL) return;

    const player = mp.players.local;
    const newPos = player.position;

    if (!newPos || !oldPos) return;

    const distance = calculateDistance(oldPos, newPos);
    const timeDiff = (currentTime - lastTime) / 1000;

    if (isPlayerTpModeOn) {
        oldPos = newPos;
        lastTime = currentTime;
        return;
    }

    if (playerInCar) checkSpeed(distance, timeDiff);
    checkTeleport(distance, timeDiff);
    checkHeight(oldPos, newPos);
    if (currentTime - lastWeaponCheck >= 5000) {
        checkWeaponHacks(player);
        lastWeaponCheck = currentTime;
    }

    if (distance > 0.1) {
        oldPos = newPos;
        lastTime = currentTime;
    }
});

function checkSpeed(distance, timeDiff) {
    const speed = distance / timeDiff;
    speedHistory.push(speed);
    if (speedHistory.length > CONFIG.SPEED_HISTORY_SIZE) speedHistory.shift();

    const avgSpeed = speedHistory.reduce((sum, s) => sum + s, 0) / speedHistory.length;

    if (speedHistory.length >= 2 && Math.abs(speed - avgSpeed) > CONFIG.MAX_SPEED * 2) {
        addSuspiciousAction("speedhack");
        logDebug(`🚗 SpeedHack? Speed: ${speed.toFixed(2)}, Avg: ${avgSpeed.toFixed(2)}`);
    }
}

function checkTeleport(distance, timeDiff) {
    if (distance > CONFIG.MAX_TELEPORT_DISTANCE && timeDiff < CONFIG.CHECK_INTERVAL / 1000) {
        addSuspiciousAction("teleport");
        logDebug(`📍 Teleport? Distance: ${distance.toFixed(2)} in ${timeDiff}s`);
    }
}

function checkHeight(oldPos, newPos) {
    const heightChange = newPos.z - oldPos.z;
    heightHistory.push(heightChange);
    if (heightHistory.length > CONFIG.HEIGHT_HISTORY_SIZE) heightHistory.shift();

    if (Math.abs(heightChange) > CONFIG.MAX_HEIGHT_CHANGE) {
        if (!isGroundBelow(newPos)) {
            addSuspiciousAction("flyhack");
            logDebug(`🕊️ FlyHack? Z change: ${heightChange.toFixed(2)}`);
        }
        if (!isNaturalHeightChange(heightHistory)) {
            addSuspiciousAction("height_hack");
            logDebug(`📉 Unnatural Height Change: ΔZ = ${heightChange.toFixed(2)}`);
        }
    }
}

function isGroundBelow(position) {
    const groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0, false);
    return Math.abs(position.z - groundZ) < CONFIG.MAX_HEIGHT_CHANGE;
}

function isNaturalHeightChange(history) {
    if (history.length < 2) return true;

    const avg = history.reduce((sum, val) => sum + val, 0) / history.length;
    const variance = history.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / history.length;

    return variance < CONFIG.MAX_HEIGHT_CHANGE * 2;
}

function checkWeaponHacks(player) {
    const ped = player.ped;
    if (!ped) return;

    const weapon = ped.getCurrentWeapon();
    if (!weapon && ped.isShooting()) {
        addSuspiciousAction("weapon_hack");
        logDebug("🔫 Стрельба без оружия!");
        return;
    }

    if (weapon) {
        try {
            const weaponHash = typeof weapon === 'number' ? weapon : mp.game.joaat(weapon);
            const ammo = ped.getAmmoInClip(weaponHash);
            if (ammo > CONFIG.AMMO_LIMIT) {
                addSuspiciousAction("ammo_hack");
                logDebug(`🧨 Слишком много патронов: ${ammo}`);
            }
        } catch (error) {
            logDebug(`⚠️ Ошибка проверки патронов: ${error.message}`);
        }
    }
}

function calculateDistance(pos1, pos2) {
    return Math.sqrt(
        (pos2.x - pos1.x) ** 2 +
        (pos2.y - pos1.y) ** 2 +
        (pos2.z - pos1.z) ** 2
    );
}
