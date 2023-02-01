CREATE TABLE IF NOT EXISTS clienti(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
    cognome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    citta VARCHAR(255) NOT NULL,
    provincia VARCHAR(3) NOT NULL,
    indirizzo VARCHAR(255) NOT NULL,
    nCivico VARCHAR(255) NOT NULL,
    CAP VARCHAR(5) NOT NULL,
    nTelefono VARCHAR(255) NOT NULL,
    ruolo ENUM('user', 'admin')
);

CREATE TABLE IF NOT EXISTS categorie(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
    descrizione VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS prodotti(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL, 
    descrizione VARCHAR(255) NOT NULL,
    immmagine VARCHAR(255) NOT NULL,
    prezzo float NOT NULL,
    prezzoScontato float DEFAULT NULL,
    categoria INT NOT NULL,
    FOREIGN KEY(categoria) REFERENCES categorie(id)
);

CREATE TABLE IF NOT EXISTS ordini(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataOrdine DATE NOT NULL, 
    stato ENUM('sospeso', 'completato') NOT NULL,
    cliente int NOT NULL,
    prodotto int NOT NULL,
    FOREIGN KEY (cliente) REFERENCES clienti(id),
    FOREIGN KEY (prodotto) REFERENCES prodotti(id)
)