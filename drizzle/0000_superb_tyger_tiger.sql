CREATE TABLE "registeruserDrizzle" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "registeruserDrizzle_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"salary" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "registeruserDrizzle_email_unique" UNIQUE("email"),
	CONSTRAINT "registeruserDrizzle_phone_number_unique" UNIQUE("phone_number")
);
