CREATE TABLE CarStatus (
                           IdStatus int AUTO_INCREMENT NOT NULL,
                           Status varchar(150) NOT NULL,
                           CONSTRAINT CarStatus_pk PRIMARY KEY (IdStatus)
);

CREATE TABLE Location (
                          IdLocation int AUTO_INCREMENT NOT NULL,
                          City varchar(150) NOT NULL,
                          Address varchar(150) NOT NULL,
                          CONSTRAINT Location_pk PRIMARY KEY (IdLocation)
);

CREATE TABLE Role (
                      IdRole int AUTO_INCREMENT NOT NULL,
                      Role varchar(150) NOT NULL,
                      CONSTRAINT Role_pk PRIMARY KEY (IdRole)
);

CREATE TABLE RentalStatus (
                              IdStatus int AUTO_INCREMENT NOT NULL,
                              Status varchar(150) NOT NULL,
                              CONSTRAINT RentalStatus_pk PRIMARY KEY (IdStatus)
);

CREATE TABLE `User` (
                        IdUser int AUTO_INCREMENT NOT NULL,
                        Name varchar(75) NOT NULL,
                        Surname varchar(75) NOT NULL,
                        Email varchar(150) NOT NULL,
                        HashPassword varchar(250) NOT NULL,
                        PhoneNumber varchar(50) NOT NULL,
                        CONSTRAINT User_pk PRIMARY KEY (IdUser)
);

CREATE TABLE Car (
                     IdCar int AUTO_INCREMENT NOT NULL,
                     Brand varchar(250) NOT NULL,
                     Model varchar(250) NOT NULL,
                     Price decimal(10,2) NOT NULL,
                     Year int NOT NULL,
                     IdStatus int NOT NULL,
                     Location_IdLocation int NOT NULL,
                     CONSTRAINT Car_pk PRIMARY KEY (IdCar)
);

CREATE TABLE Rental (
                        IdRental int AUTO_INCREMENT NOT NULL,
                        DateFrom date NOT NULL,
                        DateTo date NOT NULL,
                        FinalPrice decimal(10,2) NOT NULL,
                        IdUser int NOT NULL,
                        IdCar int NOT NULL,
                        IdStatus int NOT NULL,
                        CONSTRAINT Rental_pk PRIMARY KEY (IdRental)
);

CREATE TABLE UserRole (
                          IdUser int NOT NULL,
                          IdRole int NOT NULL,
                          CONSTRAINT UserRole_pk PRIMARY KEY (IdUser,IdRole)
);

ALTER TABLE Car ADD CONSTRAINT Car_CarStatus FOREIGN KEY (IdStatus)
    REFERENCES CarStatus (IdStatus);

ALTER TABLE Car ADD CONSTRAINT Car_Location FOREIGN KEY (Location_IdLocation)
    REFERENCES Location (IdLocation);

ALTER TABLE Rental ADD CONSTRAINT Rental_Car FOREIGN KEY (IdCar)
    REFERENCES Car (IdCar);

ALTER TABLE Rental ADD CONSTRAINT Rental_RentalStatus FOREIGN KEY (IdStatus)
    REFERENCES RentalStatus (IdStatus);

ALTER TABLE Rental ADD CONSTRAINT Rental_User FOREIGN KEY (IdUser)
    REFERENCES `User` (IdUser);

ALTER TABLE UserRole ADD CONSTRAINT UserRole_Role FOREIGN KEY (IdRole)
    REFERENCES Role (IdRole);

ALTER TABLE UserRole ADD CONSTRAINT UserRole_User FOREIGN KEY (IdUser)
    REFERENCES `User` (IdUser);

INSERT INTO Role (Role) VALUES ('ROLE_USER'), ('ROLE_ADMIN');
INSERT INTO Location (City, Address) VALUES ('New York', '5th Avenue'), ('Lviv', 'Rynok Square');
INSERT INTO CarStatus (Status) VALUES ('AVAILABLE'), ('RENTED');
INSERT INTO RentalStatus (Status) VALUES ('ACTIVE'), ('COMPLETED'), ('CANCELLED');

INSERT INTO `User` (Name, Surname, Email, HashPassword, PhoneNumber)
VALUES ('John', 'Doe', 'john@example.com', 'hashed_secret', '123456789');

INSERT INTO Car (Brand, Model, Price, Year, IdStatus, Location_IdLocation)
VALUES ('Toyota', 'Camry', 50.00, 2022, 1, 1);

INSERT INTO UserRole (IdUser, IdRole) VALUES (1, 1);