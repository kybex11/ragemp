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
    work INT,
    gender INT,
    wanted INT,
    adminlvl INT
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INT,
    model VARCHAR(50),
    color VARCHAR(20),
    plate VARCHAR(10)
);