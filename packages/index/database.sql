CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    socialclub VARCHAR(64) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    firstName TEXT,
    lastName TEXT,
    balance INT,
    cardBalance INT,
    fraction INT,
    fractionRank INT,
    worksExp JSON,
    work INT,
    gender INT,
    wanted INT,
    adminlvl INT
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INT,
    ownerID INT,
    x INT, -- для метки
    y INT, -- для метки
    z INT, -- для метки
    model VARCHAR(50),
    color VARCHAR(20),
    plate VARCHAR(10)
);