DELETE FROM major_and_faculty WHERE true;
DELETE FROM faculty WHERE true;
DELETE FROM major WHERE true;
DELETE FROM university WHERE true;

INSERT INTO university VALUES (1, 'SZTE', 'Szegedi Tudományegyetem');
INSERT INTO university VALUES (2, 'ME', 'Miskolci Egyetem');
INSERT INTO university VALUES (3, 'BME', 'Budapesti Műszaki és Gazadságtudományi Egyetem');

INSERT INTO faculty VALUES (1, 'TTIK', 'Természettudományi és Informatikai Kar', 1);
INSERT INTO faculty VALUES (2, 'MK', 'Mérnöki Kar', 1);
INSERT INTO faculty VALUES (3, 'GTK', 'Gazdaságtudományi Kar', 1);

INSERT INTO faculty VALUES (4, 'GTK', 'Gazdaságtudományi Kar', 2);
INSERT INTO faculty VALUES (5, 'GIK', 'Gépészmérnöki és Informatikai Kar', 2);
INSERT INTO faculty VALUES (6, 'ETK', 'Egészségtudományi Kar', 2);

INSERT INTO faculty VALUES (7, 'GK', 'Gépészmérnöki Kar', 3);
INSERT INTO faculty VALUES (8, 'TTK', 'Természettudományi Kar', 3);
INSERT INTO faculty VALUES (9, 'ÉK', 'Építőmérnöki Kar', 3);

INSERT INTO major VALUES (1, 'PTI', 'programtervező informatikus');
INSERT INTO major VALUES (2, 'MI', 'mérnökinformatikus');
INSERT INTO major VALUES (3, 'FIZ', 'fizika');
INSERT INTO major VALUES (4, 'MAT', 'matematika');
INSERT INTO major VALUES (5, 'KEM', 'kémia');

INSERT INTO major VALUES (6, 'MEM', 'mechatronikai mérnöki');
INSERT INTO major VALUES (7, 'MŰM', 'műszaki menedzser');
INSERT INTO major VALUES (8, 'GM', 'gépészmérnök');

INSERT INTO major VALUES (9, 'PSZ', 'pénzügy és számvitel');
INSERT INTO major VALUES (10, 'GM', 'gazdálkodási és menedzsment');
INSERT INTO major VALUES (11, 'MAR', 'marketing');
INSERT INTO major VALUES (12, 'PÉN', 'pénzügy');

INSERT INTO major VALUES (13, 'EM', 'energetikai mérnöki');

INSERT INTO major VALUES (14, 'TURVE', 'turizmus-vendéglátás');

INSERT INTO major VALUES (15, 'FIZ', 'fizioterápia');
INSERT INTO major VALUES (16, 'ODA', 'orvosi diagnosztikai analitikus');
INSERT INTO major VALUES (17, 'EGSZ', 'egészségügyi szervező');

INSERT INTO major VALUES (18, 'ÉP', 'építész');
INSERT INTO major VALUES (19, 'ÉPM', 'építészmérnök');

--Facultyid - majorId
INSERT INTO major_and_faculty VALUES (1, 1);
INSERT INTO major_and_faculty VALUES (1, 2);
INSERT INTO major_and_faculty VALUES (1, 3);
INSERT INTO major_and_faculty VALUES (1, 4);
INSERT INTO major_and_faculty VALUES (1, 5);

INSERT INTO major_and_faculty VALUES (2, 6);
INSERT INTO major_and_faculty VALUES (2, 7);
INSERT INTO major_and_faculty VALUES (2, 8);

INSERT INTO major_and_faculty VALUES (3, 9);
INSERT INTO major_and_faculty VALUES (3, 10);
INSERT INTO major_and_faculty VALUES (3, 11);
INSERT INTO major_and_faculty VALUES (3, 12);

INSERT INTO major_and_faculty VALUES (4, 9);
INSERT INTO major_and_faculty VALUES (4, 10);
INSERT INTO major_and_faculty VALUES (4, 11);
INSERT INTO major_and_faculty VALUES (4, 14);

INSERT INTO major_and_faculty VALUES (5, 6);
INSERT INTO major_and_faculty VALUES (5, 7);
INSERT INTO major_and_faculty VALUES (5, 8);
INSERT INTO major_and_faculty VALUES (5, 1);
INSERT INTO major_and_faculty VALUES (5, 2);

INSERT INTO major_and_faculty VALUES (6, 15);
INSERT INTO major_and_faculty VALUES (6, 16);
INSERT INTO major_and_faculty VALUES (6, 17);

INSERT INTO major_and_faculty VALUES (7, 6);
INSERT INTO major_and_faculty VALUES (7, 8);

INSERT INTO major_and_faculty VALUES (8, 3);

INSERT INTO major_and_faculty VALUES (9, 18);
INSERT INTO major_and_faculty VALUES (9, 19);





