-- Table: public.federated_auth_profiles

-- DROP TABLE IF EXISTS public.federated_auth_profiles;

CREATE TABLE IF NOT EXISTS public.federated_auth_profiles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    kind character(50) COLLATE pg_catalog."default" NOT NULL,
    profile_id character(400) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT federated_auth_profiles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.federated_auth_profiles
    OWNER to admin;


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email character(100) COLLATE pg_catalog."default",
    phone_number character(50) COLLATE pg_catalog."default",
    user_password character(100) COLLATE pg_catalog."default" NOT NULL,
    password_reset_token character(100) COLLATE pg_catalog."default",
    password_reset_expires date,
    fullname character(100) COLLATE pg_catalog."default" NOT NULL,
    gender character(50) COLLATE pg_catalog."default",
    profile integer,
    user_name character(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_profile_fkey FOREIGN KEY (profile)
        REFERENCES public.federated_auth_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;


-- Table: public.tokens

-- DROP TABLE IF EXISTS public.tokens;

CREATE TABLE IF NOT EXISTS public.tokens
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    kind character(50) COLLATE pg_catalog."default" NOT NULL,
    access_token character(400) COLLATE pg_catalog."default" NOT NULL,
    token_secret character(400) COLLATE pg_catalog."default",
    user_id integer,
    CONSTRAINT tokens_pkey PRIMARY KEY (id),
    CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tokens
    OWNER to admin;


-- Table: public.user_pictures

-- DROP TABLE IF EXISTS public.user_pictures;

CREATE TABLE IF NOT EXISTS public.user_pictures
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    image_url character(400) COLLATE pg_catalog."default" NOT NULL,
    user_id integer,
    CONSTRAINT user_pictures_pkey PRIMARY KEY (id),
    CONSTRAINT user_pictures_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_pictures
    OWNER to admin;

--INSERT INTO public.users(
--	email, user_name, phone_number, user_password, fullname, gender)
--	VALUES (
--		'existingAdmin@test.com', 
--		'existingAdmin', 
--		'8095445501', 
--		'78ca89fb969778e1044c06659fb077bdb4b77d1d6b0c0466e53233d73361a280                                    ', 
--		'User Admin For Tests', 
--		'M');