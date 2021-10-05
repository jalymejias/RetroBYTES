require("dotenv").config();

const faker = require("faker");
const getDB = require("./db");
const { formatDateToDB } = require("./helpers");
const { random } = require("lodash");
const fs = require("fs");
const axios = require("axios");
const uuid = require("uuid");

async function downloadImage(url, filepath) {
  const queryResponse = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  const imageUrl = queryResponse.data.responseUrl;

  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "stream",
  });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve(filepath));
  });
}

let connection;

async function main() {
  try {
    connection = await getDB();

    // borrar las tablas existentes
    await connection.query(`DROP TABLE IF EXISTS user_ranking`);
    await connection.query(`DROP TABLE IF EXISTS sales`);
    await connection.query(`DROP TABLE IF EXISTS products_photos`);
    await connection.query(`DROP TABLE IF EXISTS products`);
    await connection.query(`DROP TABLE IF EXISTS categories`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("Tablas borradas");

    // creo la tabla usuarios
    await connection.query(`
   CREATE TABLE users (
       id INT PRIMARY KEY AUTO_INCREMENT,
       date DATETIME NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(512) NOT NULL,
       name VARCHAR(100),
       avatar VARCHAR(200),
       active BOOLEAN DEFAULT false,
       role ENUM("admin","normal") DEFAULT "normal" NOT NULL,
       registrationCode VARCHAR(100),
       deleted BOOLEAN DEFAULT false,
       lastAuthUpdate DATETIME,
       recoverCode varchar(100)
       )
 `);

    // creo la tabla products
    await connection.query(`
      CREATE TABLE products (
          id INT PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL,
          name VARCHAR(45),
          description TEXT(500) DEFAULT NULL,
          price DECIMAL(10,2),
          place VARCHAR(100),
          manufact_date YEAR,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          category ENUM('Informática','Telefonía','Gaming','Video','Audio', 'Memorabilia') NOT NULL,
          reserved BOOLEAN DEFAULT false,
          sold BOOLEAN DEFAULT false
       )
`);

    // creo la tabla products_photos
    await connection.query(`
      CREATE TABLE products_photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME NOT NULL,
        photo VARCHAR(50),
        product_id INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
        )
   `);

    // creo la tabla de ventas
    await connection.query(` 
      CREATE TABLE sales (
        idSale INT PRIMARY KEY AUTO_INCREMENT,
        userBuyer_id INT NOT NULL,
        FOREIGN KEY (userBuyer_id) REFERENCES users(id),
        product_id INT NOT NULL,   
        FOREIGN KEY (product_id) REFERENCES products(id),
        status BOOLEAN,
        timeDelivery DATETIME,
        placeDelivery VARCHAR(300)
  
      );

`);

    // creo la tabla de valoración de usuario
    await connection.query(`
    CREATE TABLE user_ranking(
      id INT PRIMARY KEY AUTO_INCREMENT,
      date_vote DATETIME,
      userSeller_id INT NOT NULL,
      FOREIGN KEY (userSeller_id) REFERENCES users(id),
      idSale INT NOT NULL,
      FOREIGN KEY (idSale) REFERENCES sales(idSale),
      vote TINYINT DEFAULT 0
      
    )
`);

    console.log("Tablas creadas");

    //  añado el usuario admin
    await connection.query(`
     INSERT INTO users(date, email, password, name, active, role)
     VALUES (
       "${formatDateToDB(new Date())}", 
       "cguarata1@gmail.com",
       SHA2("${process.env.ADMIN_PASSWORD}", 512),
       "Carlos Guarata", 
       true, 
       "admin");
 `);

    //generamos usuarios random
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const nombre = faker.name.findName();
      const avatar = `${uuid.v4()}.jpg`;

      const randomAvatarUrl = "https://source.unsplash.com/1600x900/?people";
      const avatarPath = `./uploads/${avatar}`;
      await downloadImage(randomAvatarUrl, avatarPath);

      await connection.query(`
     INSERT INTO users(date,email,password,name,active,avatar)
     VALUES (
       "${formatDateToDB(new Date())}",
       "${email}",
       SHA2("${password}", 512),
       "${nombre}",
       true,
       "${avatar}"
     )
     `);
    }

    console.log("Ingresadas categorías");

    // añadir productos
    const now = new Date();
    const date = formatDateToDB(now);

    await connection.query(`
    INSERT INTO products(name, manufact_date, price, place, category, user_id, date, description)
    VALUES 
    ("IBM PC 5150", "1981", "450", "A Coruña", "Informática","${random(
      2,
      users + 1
    )}", "${date}","El IBM Personal Computer (en español, computadora personal IBM u ordenador personal IBM), 
    conocido comúnmente como IBM PC, es la versión original y el progenitor de la plataforma de hardware compatible 
    IBM PC. Es el IBM modelo 5150, y fue introducido el 12 de agosto de 1981 haciendo parte de la quinta generación de computadoras. "),
    ("Commodore 64", "1982","1050", "Madrid", "Informática","${random(
      2,
      users + 1
    )}", "${date}","Commodore 64 (C64, CBM 64/CBM64, C=64,C-64, VIC-641​) es una computadora doméstica de 8 bits desarrollada por Commodore 
    International en agosto de 1982 a un precio inicial de 595 dólares. Sucede a la Commodore VIC-20 y a la Commodore MAX Machine, 
    presentando 64 kilobytes (65.536 bytes) de RAM, con gráficos y sonido muy por encima de otros equipos contemporáneos. Utilizaba una 
    unidad de casete además de una disquetera de tipo 5 1/4 pulgadas. "),
    ("Sinclair ZX Spectrum", "1982","170", "Valencia","Informática", "${random(
      2,
      users + 1
    )}", "${date}","${faker.lorem.paragraph()}"),
    ("Apple II", "1982","980", "Santiago de Compostela","Informática", "${random(
      2,
      users + 1
    )}", "${date}","La familia de computadores Apple II fue la primera serie de microcomputadoras de producción masiva hecha por la empresa 
    Apple Computer entre el 5 de junio de 1977 y mediados de los años 1980s. El Apple II tenía una arquitectura de 8 bits basada en el 
    procesador 6502. Era completamente diferente de los posteriores modelos Macintosh de Apple."),
    ("Commodore Amiga 500", "1987", "1200", "Barcelona","Informática", "${random(
      2,
      users + 1
    )}" , "${date}","El Commodore Amiga 500, más conocido como el Amiga 500, es un computador personal de la gama Commodore Amiga que fue lanzado 
    en 1987 al mismo tiempo que el Commodore Amiga 2000. Mientras que este último se orientaba a un mercado profesional y de usuarios avanzados, 
    el Amiga 500 lo hacía al mercado doméstico y del videojuego. Ambos fueron anunciados en el Consumer Electronics Show de enero de 1987. 
    El precio inicial, sin monitor, en Estados Unidos fue de $595,95 dólares."),
    ("MITS Altair 8800", "1975","860", "Valencia", "Informática","${random(
      2,
      users + 1
    )}", "${date}","El Altair 8800 de MITS fue un microordenador diseñado en 1974, basado en la CPU Intel 8080. El interés por este equipo creció 
    rápidamente después de que se presentó en la portada de enero de 1975, de la revista Popular Electronics, con cientos de kits para armar 
    destinados a los aficionados, y se sorprendieron al vender diez veces esa cantidad solo en el primer mes. El Altair también apeló a las personas 
    y empresas que sólo querían un computador y presentó una versión ya ensamblada"),
    ("Princesa Teléfono", "1963","195", "A Coruña", "Telefonía","${random(
      2,
      users + 1
    )}", "${date}","Antes de que existieran las fundas personalizadas para teléfonos 
    inteligentes, existía el Princess Phone Comercializado para las adolescentes, 
    este pequeño teléfono bonito transformó el teléfono negro estándar y dio inicio 
    a la idea del teléfono como un accesorio de moda."),
    ("Motorola DynaTAC 8000x", "1984","120", "Mera", "Telefonía","${random(
      2,
      users + 1
    )}", "${date}","El primer celular de todos los tiempos. Pesa 1,75 libras, mide 13 pulgadas 
    de alto, almacena 30 números y tarda 10 horas en recargarse durante 30 minutos de tiempo de conversación."),
    ("Juego de fotones Enertech", "1986","200", "Oleiros", "Gaming","${random(
      2,
      users + 1
    )}", "${date}","El juego incluía una pistola Photon Phaser, un Photon Warrior Helmet, un Photon 
    Target Computerized y una Photon Player ID Card para que el usuario creara su propia Photon ID."),
    ("Máquina de pinball Goofy Bally","1932", "80", "A Coruña", "Gaming","${random(
      2,
      users + 1
    )}", "${date}","Un juego de pinball completamente mecánico, viene con un tobogán de monedas de tres vasos
     que supera todos los métodos de trampa y una cerradura de puerta de efectivo a prueba de ganchos."),
    ("Consola de juegos Vectrex", "1982","100", "Culleredo", "Gaming","${random(
      2,
      users + 1
    )}", "${date}","Vectrex fue y sigue siendo la primera y única consola de videojuegos de gráficos vectoriales 
    basada en el hogar. Es una unidad de videojuegos portátil con alimentación de CA que muestra gráficos
    vectoriales únicos en un monitor integrado."),
    ("Máquina de pinball", "1979","460", "Arteixo", "Gaming","${random(
      2,
      users + 1
    )}", "${date}","Gorgar fue la primera máquina de pinball parlante jamás creada"),
    ("Odisea Magnavox", "1973","860", "Sada", "Gaming","${random(
      2,
      users + 1
    )}", "${date}","Como el primer videojuego doméstico comercial del mundo, Magnavox Odyssey inventó la industria 
    de juegos de miles de millones de dólares de la actualidad. Es un artículo imprescindible para cualquier coleccionista de juegos antiguos."),
    ("Videojuego Coin Op Stern Berserk", "1980","300", "Laracha", "Gaming","${random(
      2,
      users + 1
    )}", "${date}","El objetivo del juego es escapar del laberinto, pero los jugadores pueden ganar puntos adicionales 
    al destruir enemigos robot, con una puntuación de bonificación otorgada por destruir todos los robots en un laberinto."),
    ("Proyector Eumig Modelo 501", "1969","150", "Oleiros", "Video","${random(
      2,
      users + 1
    )}", "${date}","Todo lo analógico es genial de nuevo, y este proyector Super 8 en perfecto estado es súper genial."),
    ("Philco Predicta TV", "1958","60", "Culleredo", "Video","${random(
      2,
      users + 1
    )}", "${date}","Uno de los televisores antiguos más reconocidos de América del Norte, es famoso por su diseño de era 
    espacial. La cápsula del tubo de imagen está expuesta, a diferencia de otros modelos en caja, y montada giratoria 
    en una base de pedestal separada."),
    ("Televisión modelo piloto TV-37", "1946","70", "A Coruña", "Video","${random(
      2,
      users + 1
    )}", "${date}","Con un pequeño tubo de imagen de 3 pulgadas, apenas se puede ver según los estándares modernos, 
    pero el tamaño compacto y el diseño inusual del TV-37 lo convierten en el favorito de los coleccionistas."),
    ("Proyector de postales", "1901","360", "Sabon", "Video","${random(
      2,
      users + 1
    )}", "${date}","Esta máquina muy extraña se utilizó como una forma de exhibir sus postales como una forma de entretenimiento
     y también una forma de compartir sus ambiciones de viaje con sus amigos."),
    ("Zeetar", "1960","50", "Arteixo", "Audio","${random(
      2,
      users + 1
    )}", "${date}","Fabricado por Rajah Zeetar Corp., el Zeetar es esencialmente un sitar eléctrico diseñado para imitar el sonido 
    de un sitar acústico tradicional. Tiene un amplificador eléctrico, siete cuerdas, pastillas magnéticas grandes y se 
    puede afinar, encordar y tocar como una guitarra normal."),
    ("Reproductor de discos", "1982","100", "Sada", "Audio","${random(
      2,
      users + 1
    )}", "${date}","El dispositivo reproducía audio y video en un televisor usando una aguja especial y un sistema de ranura de alta 
    densidad similar a los discos fonográficos."),
    ("Altavoces vintage para autocine", "1950","90", "Santiago de Compostela", "Audio","${random(
      2,
      users + 1
    )}", "${date}","CBX Mark II MFG. Co"),
    ("Radio Panasonic RF 2200 HAM de 8 bandas", "1977","160", "Carballo", "Audio","${random(
      2,
      users + 1
    )}", "${date}","Ya sea que esté interesado en HAM o simplemente esté interesado en una unidad analógica de caballo de batalla capaz 
    de un rendimiento notable en la recepción de radio de onda corta, media y larga, el RF-2200 no puede pasarse por alto; para 
    aquellos que lo saben, es una gran pieza de equipo."),
    ("Radio Shack TRC-222 Walkie-Talkies", "1970","700", "Oleiros", "Audio","${random(
      2,
      users + 1
    )}", "${date}","Una radio portátil de dos vías con un transceptor de banda ciudadana (CB) de 40 canales y 5 vatios, que es básicamente
     la misma tecnología que usan los conductores de camiones en viajes de larga distancia."),
    ("Panasonic Dynamite 8, 8 pistas", "1970","300", "Culleredo", "Audio","${random(
      2,
      users + 1
    )}", "${date}","De un anuncio de la década de 1970: Ka-boom Es el Dynamite 8 ... desliza la cinta, retumba la música de un altavoz 
    dinámico de sonido explosivo. Luego presione el émbolo para cambiar su canal y cambiar su melodía. Tóquelo con la corriente 
    de la casa para una noche agradable y ruidosa en casa. O con nuestras baterías Hi-Top de larga duración para situaciones más libres."),
    ("Armatron", "1984", "150", "Orense", "Memorabilia","${random(
      2,
      users + 1
    )}", "${date}","Un robot de juguete fabricado por TOMY y distribuido por Radio Shack en los Estados Unidos, es un brazo robótico
     parecido a una grúa con dos joysticks adjuntos que pueden manipularse para recoger objetos pequeños."),
    ("Ajedrez Phantom modelo 6100", "1988", "350", "Lugo", "Memorabilia","${random(
      2,
      users + 1
    )}", "${date}","¡El Fantasma mueve piezas de ajedrez por sí solo sin intervención humana alguna! Incluso mueve las piezas que
    obstruyen el camino hacia atrás y hacia atrás."),
    ("Bomba de gasolina", "1950", "500", "Vigo", "Memorabilia","${random(
      2,
      users + 1
    )}", "${date}","En los primeros días de los viajes en automóvil, las estaciones de servicio solían estar mal iluminadas por la noche. 
    Así que los globos luminosos de las bombas de gas y otros letreros de las compañías petroleras fueron clave para tranquilizar y atraer a los automovilistas."),
    ("Juego de fútbol eléctrico", "1960", "220", "Santiago de Compostela", "Memorabilia","${random(
      2,
      users + 1
    )}", "${date}","Hecho por Tudor, el Electronic Football Game era un juego de mesa de fútbol americano que se jugaba en un campo 
    vibrante de metal . Los jugadores de plástico reaccionaban a las vibraciones provocadas por el motor electromagnético ubicado debajo 
    del campo metálico."),
    ("Máquina de escribir Corona 3", "1912", "480", "Palencia", "Memorabilia","${random(
      2,
      users + 1
    )}", "${date}","La máquina de escribir preferida de Ernest Hemingway, la Corona 3 fue la primera máquina de escribir portátil y podría 
    considerarse la primera computadora portátil del mundo. Pesaba apenas 6.5 libras, que es el mismo peso de una MacBook actual")
    `);

    await connection.query(`
    INSERT INTO products_photos(uploadDate, photo, product_id)
    VALUES 
    ("${date}","ibm-pc-40.jpg", 1),
    ("${date}","a9262483e5c2150b96d49ba397d5944d.jpg", 2),
    ("${date}","jay-carter-sinclair-spectrum.jpg", 3),
    ("${date}","Apple-IMAC-G3.jpg", 4),
    ("${date}","6e474ed4-1e90-48c3-8778-be664bd3c3c9.jpg", 5),
    ("${date}","MITS-ALTAIR-8800-9.jpg", 6),

    ("${date}","VTH+101+Princess+Phone+5.jpg", 7),
    ("${date}","VTH+106+-+Phone+1.jpg", 8),
    ("${date}","s-l400.jpg", 9),
    ("${date}","maxresdefault.jpg", 10),

    ("${date}","Vectrex-Console-Set.jpg", 11),
    ("${date}","VTH+103+-+Gorgar+2.jpg", 12),
    ("${date}","Odyssey2.jpg", 13),
    ("${date}","1105531799.jpg", 14),

    ("${date}","descarga.jpg", 15),
    ("${date}","VTH+105+-+Predicta+4.jpg", 16),
    ("${date}","VTH+105+-+Pilot+TV+1.jpg", 17),
    ("${date}","VTH+109+-+Graphotype+3.jpg", 18),

    ("${date}","VTH+103+-+Zeetar+1.jpg", 19),
    ("${date}","VTH+107+-+Deluxe+Stereo+Console+3.jpg", 20),
    ("${date}","VTH+110+-+Drive-In+Speakers+3.jpg", 21),
    ("${date}","VTH+101+Boombox+1.jpg", 22),

    ("${date}","4f86223162d93708c8b2c220d4acadd1.jpg", 23),
    ("${date}","VTH+104+-+8+Track+5.jpg", 24),
    ("${date}","VTH+103+-+Armatron+1.jpg", 25),
    ("${date}","VTH+101+Phantom+Chess+2.jpg", 26),

    ("${date}","VTH+106+-+Gas+Pump+4.jpg", 27),
    ("${date}","VTH+111+-+Football+Game+4.jpg", 28),
    ("${date}","VTH+101+Corona+Typewriter+1.jpg", 29)




    `);

    console.log("Datos randoms introducidos");
  } catch (error) {
    console.error(error);
  } finally {
    // libero la conexión
    if (connection) connection.release();
    process.exit(0);
  }
}

main();
