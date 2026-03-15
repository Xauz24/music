DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    lyrics TEXT
);

-- Test nan hla pakhat kan thun chhin ang (I MP3 dah sa hming nen a inmil tur a ni)
INSERT INTO songs (title, url, lyrics) 
VALUES ('Kan Chhungkaw Hla', 'music/test.mp3', '[00:00.00] D1 Database aṭangin\n[00:05.00] He hla hi a rawn in-play e!\n[00:10.00] Xauz Family Music');
VALUES ('Kan Chhungkaw Hla', 'music/test.mp3', '[00:00.00] D1 Database aṭangin\n[00:05.00] He hla hi a rawn in-play e!\n[00:10.00] Xauz Family Music');