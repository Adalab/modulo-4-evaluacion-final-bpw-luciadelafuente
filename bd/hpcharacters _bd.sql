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

CREATE TABLE usuarios_db (
id int auto_increment primary key,
email VARCHAR (45) not null,
name VARCHAR (45) not null,
address VARCHAR (45) not null,
password VARCHAR (100) not null
);


INSERT INTO characters (name, gender, house, patronus, image)
VALUES ("Cedric Diggory", "male", "Hufflepuff", "", "https://static.wikia.nocookie.net/esharrypotter/images/1/12/Normal_HP_shoot_1_001.jpg/revision/latest?cb=20180408165042"),
("Cho Chang", "female", "Ravenclaw", "swan", "https://static.wikia.nocookie.net/esharrypotter/images/8/81/P5_Cho_Chang.jpg/revision/latest?cb=20070718014506"),
("Severus Snape", "male", "Slytherin", "doe", "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Ootp076.jpg/220px-Ootp076.jpg"),
("Rubeus Hagrid", "male", "Gryffindor", "", "https://i.pinimg.com/originals/90/0b/d9/900bd9f379ae25c83ff11f5857ad026e.jpg"),
("Neville Longbottom", "male", "Gryffindor", "Non-Corporeal", "https://static.wikia.nocookie.net/black-family/images/e/e5/NevilleLongbottom.png/revision/latest?cb=20210805181942characters"),
("Luna Lovegood", "female", "Ravenclaw", "hare", "https://images.ctfassets.net/usf1vwtuqyxm/Mam68Vfou2OO6kqEcyW8W/41657e4dbb7d42d2cab591276105bcc1/LunaLovegood_WB_F6_LunaLovegoodInQuibblerSpecsOnHogwartsExpress_Still_080615_Port.jpg?fm=jpg&q=70&w=2560"),
("Ginny Weasley", "female", "Gryffindor", "horse", "https://static.wikia.nocookie.net/esharrypotter/images/e/ea/DH-ginevra-ginny-weasley-19126276-605-807.jpg/revision/latest?cb=20171221181839"),
("Sirius Black", "male", "Gryffindor", "hare", "https://static.wikia.nocookie.net/esharrypotter/images/7/75/Sirius_Black_profile.jpg/revision/latest?cb=20100730200404"),
("Remus Lupin", "male", "Gryffindor", "wolf", "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Remus_Lupin.jpeg/220px-Remus_Lupin.jpeg"),
("Arthur Weasley", "male", "Gryffindor", "weasel", "https://static.wikia.nocookie.net/heroes-v-villains/images/2/25/Arthur-weasley-1-.jpg/revision/latest?cb=20190913005230"),
("Bellatrix Lestrange", "female", "Slytherin", "", "https://pbs.twimg.com/media/FE8scvFXsAEBj6M.jpg"),
("Lord Voldemort", "male", "Slytherin", "", "https://static.wikia.nocookie.net/esharrypotter/images/1/1c/Tomdh.jpg/revision/latest?cb=20110711204536"),
("Horace Slughorn", "male", "Slytherin", "", "https://vignette1.wikia.nocookie.net/harrypotter/images/9/94/Sluggy1.jpg/revision/latest?cb=20090707165050"),
("Dolores Umbridge", "female", "Slytherin", "persian cat", "https://static.wikia.nocookie.net/esharrypotter/images/d/d2/Dolores_umbridge2.jpg/revision/latest?cb=20150228091708"),
("Lucius Malfoy", "male", "Slytherin", "", "https://static.wikia.nocookie.net/doblaje/images/c/cf/Lucius-malfoy.jpg/revision/latest?cb=20110930014422&path-prefix=es"),
("Albus Dumbledore", "male", "Gryffindor", "Phoenix", "https://static.wikia.nocookie.net/wikihp/images/8/88/Dumbledore.jpg/revision/latest/scale-to-width-down/423?cb=20090911073332&path-prefix=es"),
("Fred Weasley", "male", "Gryffindor", "", "https://static.wikia.nocookie.net/esharrypotter/images/1/18/PHELPS2-1.jpg/revision/latest?cb=20150523213445"),
("George Weasley", "male", "Gryffindor", "", "https://static.wikia.nocookie.net/esharrypotter/images/4/43/George_Weasley_Profile.JPG/revision/latest?cb=20140128020949"),
("Molly Weasley", "female", "Gryffindor", "", "https://images.ctfassets.net/usf1vwtuqyxm/31X8p9ewf6aeYse2sCayCm/2b4ecbc9e20cfc1b3941a63394cbb3d9/MollyWeasley_WB_F6_MollyWeasleyFullbody_Promo_080615_Port.jpg?fm=jpg&q=70&w=2560"),
("Dobby", "female", "", "", "https://s1.elespanol.com/2018/05/02/cultura/libros/harry_potter-literatura-libros_304231460_76055983_1706x1280.jpg"),
("Alastor Moody", "male", "", "", "https://pm1.aminoapps.com/6249/82b3388dd679aa972df4990a76c43e8a587714ac_00.jpg"),
("Kingsley Shacklebolt", "male", "", "lynx", "https://static.wikia.nocookie.net/warner-bros-entertainment/images/4/4a/KingsleyShacklebolt.jpg/revision/latest?cb=20210727190642"),
("Peter Pettigrew", "male", "Gryffindor", "", "https://static.wikia.nocookie.net/doblaje/images/2/2d/Petercasadelosgritso.jpg/revision/latest?cb=20110911220329&path-prefix=es");
