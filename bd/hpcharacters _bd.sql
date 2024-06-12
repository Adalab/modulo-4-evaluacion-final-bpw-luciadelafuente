CREATE DATABASE hpcharacters;
USE hpcharacters;

CREATE TABLE characters (
id int auto_increment primary key,
name VARCHAR (45) not null,
gender VARCHAR (45) not null,
house VARCHAR (45) not null,
patronus VARCHAR (45) not null,
image TEXT not null
);

INSERT INTO characters (name, gender, house, patronus, image)
VALUES ("Harry Potter", "male", "Gryffindor", "stag", "https://media.es.wired.com/photos/64370c54f381a957088482cc/4:3/w_2668,h_2001,c_limit/reboot%20de%20harry%20potter%20warner.jpg");

INSERT INTO characters (name, gender, house, patronus, image)
VALUES ("Hermione Granger", "female", "Gryffindor", "otter", "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/reportajes/los-personajes-clave-de-harry-potter/hermione-granger_/4661799-1-esl-ES/Hermione-Granger_.jpg");

INSERT INTO characters (name, gender, house, patronus, image)
VALUES ("Ron Weasley", "male", "Gryffindor", "Jack Russell terrier", "https://static.wikia.nocookie.net/esharrypotter/images/e/e1/P1_Rony.jpg/revision/latest/scale-to-width-down/170?cb=20180719234118");