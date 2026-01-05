-- 1. ROLES (Previously in RoleService)
INSERT INTO Role (Role) VALUES ('ROLE_USER');
INSERT INTO Role (Role) VALUES ('ROLE_ADMIN');

-- 2. CAR STATUSES (Previously in CarStatusService)
INSERT INTO CarStatus (Status) VALUES ('AVAILABLE');
INSERT INTO CarStatus (Status) VALUES ('RENTED');
INSERT INTO CarStatus (Status) VALUES ('UNAVAILABLE');

-- 3. RENTAL STATUSES (Previously in RentalStatusService)
INSERT INTO RentalStatus (Status) VALUES ('ACTIVE');
INSERT INTO RentalStatus (Status) VALUES ('COMPLETED');
INSERT INTO RentalStatus (Status) VALUES ('CANCELLED');

-- 4. LOCATIONS (Previously in LocationService)
INSERT INTO Location (City, Address) VALUES ('Warsaw', 'Mortgage Street');      -- IdLocation: 1
INSERT INTO Location (City, Address) VALUES ('Warsaw', 'Royal Street');         -- IdLocation: 2
INSERT INTO Location (City, Address) VALUES ('Warsaw', 'New World Street');     -- IdLocation: 3
INSERT INTO Location (City, Address) VALUES ('Krakow', 'Kanonicza Street');     -- IdLocation: 4
INSERT INTO Location (City, Address) VALUES ('Krakow', 'Florianska Street');    -- IdLocation: 5
INSERT INTO Location (City, Address) VALUES ('Krakow', 'Grodzka Street');       -- IdLocation: 6

-- 5. USERS (New Sample Data)
-- Password for both is: admin123 (BCrypt hash)
INSERT INTO `User` (Name, Surname, Email, HashPassword, PhoneNumber)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$12$V0Pmd.fjo5N3.aXgQywzLuHyfnXqCAqSyGO78Amnrh11Xni6n7oK6', '123456789'); -- IdUser: 1

INSERT IGNORE INTO `User` (Name, Surname, Email, HashPassword, PhoneNumber)
VALUES ('Admin', 'User', 'admin@example.com', '$2a$12$V0Pmd.fjo5N3.aXgQywzLuHyfnXqCAqSyGO78Amnrh11Xni6n7oK6', '987654321'); -- IdUser: 2

-- Assign Roles to Users
INSERT INTO UserRole (IdUser, IdRole) VALUES (1, 1); -- John is ROLE_USER
INSERT INTO UserRole (IdUser, IdRole) VALUES (2, 2); -- Admin is ROLE_ADMIN

-- 6. CARS (New Sample Data)
-- Linking to Status 1 (AVAILABLE) and Location 1 (Warsaw)
INSERT INTO Car (Brand, Model, Price, Year, IdStatus, Location_IdLocation)
VALUES
    ('Toyota', 'Corolla', 100.00, 2020, 1, 1),
    ('Toyota', 'Yaris', 80.00, 2020, 1, 1),
    ('BMW', 'X5', 350.00, 2023, 1, 2),
    ('Audi', 'A4', 200.00, 2022, 1, 4),
    ('Mercedes', 'C-Class', 250.00, 2022, 1, 5);

-- Linking to Status 1 (AVAILABLE) and Location 4 (Krakow)
INSERT INTO Car (Brand, Model, Price, Year, IdStatus, Location_IdLocation)
VALUES ('BMW', 'X5', 300.00, 2022, 1, 4); -- IdCar: 2

-- Linking to Status 2 (RENTED)
INSERT INTO Car (Brand, Model, Price, Year, IdStatus, Location_IdLocation)
VALUES ('Audi', 'A4', 200.00, 2021, 2, 2); -- IdCar: 3

-- 7. RENTALS (New Sample Data)
-- John (IdUser: 1) rents the Audi (IdCar: 3)
INSERT INTO Rental (DateFrom, DateTo, FinalPrice, IdUser, IdCar, IdStatus)
VALUES ('2023-10-01', '2023-10-05', 800.00, 1, 3, 1); -- Status 1 is ACTIVE