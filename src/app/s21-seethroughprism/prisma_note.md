npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

(base) ajit@ajitmegaproject:~$ sudo -u postgres psql
psql (16.6 (Ubuntu 16.6-0ubuntu0.24.04.1))
Type "help" for help.

postgres=# CREATE DATABASE nextjsform;
CREATE DATABASE
postgres=# \c nextjsform
You are now connected to database "nextjsform" as user "postgres".

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(128) NOT NULL,
phone_number VARCHAR(15),
salary DECIMAL(10,2) DEFAULT 0
);

ALTER TABLE users RENAME TO registeruser;
postgres=# CREATE USER ajitfrontend WITH PASSWORD 'ajitfrontend';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE nextjsform TO ajitfrontend;

postgres=# GRANT SELECT ON TABLE registeruser TO ajitfrontend;

INSERT INTO users (name, email, password, phone_number, salary)
VALUES
('John Doe', 'john.doe@example.com', 'password123', '1234567890', 50000.00),
('Jane Smith', 'jane.smith@example.com', 'password456', '0987654321', 60000.00),
('Alice Johnson', 'alice.johnson@example.com', 'password789', '1122334455', 55000.00),
('Bob Brown', 'bob.brown@example.com', 'password012', '2233445566', 70000.00),
('Charlie Davis', 'charlie.davis@example.com', 'password345', '3344556677', 52000.00),
('Eve White', 'eve.white@example.com', 'password678', '4455667788', 65000.00),
('Frank Black', 'frank.black@example.com', 'password901', '5566778899', 58000.00),
('Grace Green', 'grace.green@example.com', 'password234', '6677889900', 62000.00),
