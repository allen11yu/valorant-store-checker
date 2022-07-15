CREATE TABLE players (
    puuid varchar(255) NOT NULL,
    phone_number varchar(255),
    ssid TEXT,
    PRIMARY KEY (puuid)
);

CREATE TABLE wishlists (
    id SERIAL,
    puuid varchar(255),
    uuid varchar(255),
    PRIMARY KEY(id),
    FOREIGN KEY (puuid) REFERENCES players(puuid)
);