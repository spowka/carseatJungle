--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.1

-- Started on 2019-01-07 17:31:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 13920)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3975 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;


create table member_role (
    id_member_role int not null,
    name varchar(50) not null,
    primary key (id_member_role)
  );
  
create table member (
    id_member serial,
    id_member_role int not null,
    email varchar(255) null,
    password varchar(255) default null,
    first_name varchar(100) not null,    
    last_name varchar(100) not null,
    uuid varchar(36) not null,
    password_reset_code varchar(36) null,      
    is_suspended int default '1',    
    is_activated int not null default '1',    
    date_created timestamp not null default current_timestamp,
    date_activated timestamp default current_timestamp,
    auth_provider varchar(50) default null,    
    date_time_changed timestamp default current_timestamp,
    primary key (id_member)
  ); 

create index ix_member_email on member (email);  
create index ix_member_id_member_role on member (id_member_role);

alter table member
add constraint fk_member_member_role
foreign key (id_member_role)
references member_role (id_member_role)
on delete no action
on update no action;   


/* OAUTH */

create table oauth_client (
    id_oauth_client varchar(40) not null,
    secret varchar(55) not null,
    redirect_uris text,
    default_scopes text,
    primary key (id_oauth_client)
  );

create table oauth_grant (
    id_oauth_grant serial,
    id_oauth_client varchar(40) not null,
    id_member int default null,
    code varchar(255) not null,
    redirect_uri varchar(255) default null,
    expiration timestamp default null,
    scopes text,
    primary key (id_oauth_grant)
  );

create table oauth_token (
    id_oauth_token serial,
    id_oauth_client varchar(40) not null,
    id_member int default null,
    token_type varchar(40) default null,
    access_token varchar(255) default null,
    refresh_token varchar(255) default null,
    expiration timestamp default null,
    scopes text,
    primary key (id_oauth_token)
  );
  
create index ix_oauth_token_id_member on oauth_token (id_member);  
create unique index ix_oauth_token_access_token on oauth_token (access_token);  
create unique index ix_oauth_token_refresh_token on oauth_token (refresh_token);  

alter table oauth_token 
add constraint fk_oauth_token_member
foreign key (id_member)
references member (id_member)
on delete no action
on update no action;  







/* DATA */

insert into oauth_client(id_oauth_client, secret)
values('12to6uxur1fhzkl5rhemhmcfb6qmvmljg059e61a', 'tpjanvkugcs5mp1uienz710crycf2dlyuawg34hu');

insert into member_role(id_member_role, name)
values(1, 'admin');

insert into member_role(id_member_role, name)
values(2, 'user');


/* TEST DATA */

insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(1,'maria@carseatjungle.com','pbkdf2:sha256:50000$k5CHOR1q$3a9b7c9f2399ea9c9372611ce650fe32b623ab443468408ac626c59974222553','Maria','Quaid','86ba6979-8ecc-4871-a9cf-94bf253c3137','0','1','2018-04-24 00:00:00','2018-04-24 00:00:00','init');

insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'martin@init.com', 'pbkdf2:sha256:50000$k5CHOR1q$3a9b7c9f2399ea9c9372611ce650fe32b623ab443468408ac626c59974222553', 'Martin','Mcbride', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'matt@init.com', '', 'Matthew','Lamb', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'jeff@init.com', '', 'Jeffrey','Copeland', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'joe@init.com', '', 'Joseph','Norman', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'marcos@init.com', '', 'Marcos','Dennis', '', 0, 1, '2018-04-24', '2018-04-24',  'init');

insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'lorenzo@init.com', 'pbkdf2:sha256:50000$k5CHOR1q$3a9b7c9f2399ea9c9372611ce650fe32b623ab443468408ac626c59974222553', 'Lorenzo','Brock', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'kristi@init.com', '', 'Kristi','Webster', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'monique@init.com', '', 'Monique','Jacobs', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'clinton@init.com', '', 'Clinton','Moran', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'eva@init.com', '', 'Eva','Walker', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'gilbert@init.com', '', 'Gilbert','Nunez', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'brett@init.com', '', 'Brett','Patrick', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'sam@init.com', '', 'Sam','Lowe', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'sandra@init.com', '', 'Sandra','Tyler', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'melody@init.com', '', 'Melody','Adkins', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'irvin@init.com', '', 'Irvin','Morton', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'terell@init.com', '', 'Terrell','Turner', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'gayle@init.com', '', 'Gayle','Buchanan', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'jean@init.com', '', 'Jean','Lindsey', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'megan@init.com', '', 'Megan','Briggs', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'marv@init.com', '', 'Marvin','Dean', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'cesar@init.com', '', 'Cesar','Curtis', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'hilda@init.com', '', 'Hilda','Gonzalez', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'alvin@init.com', '', 'Alvin','Holt', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'nate@init.com', '', 'Nathaniel','Stevens', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'jim@init.com', '', 'Jim','French', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'rodolfo@init.com', '', 'Rodolfo','Hines', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'horace@init.com', '', 'Horace','Thornton', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'helen@init.com', '', 'Helen','Barton', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'dolly@init.com', '', 'Dolores','Clark', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'maurice@init.com', '', 'Maurice','Goodman', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'deb@init.com', '', 'Debbie','Brooks', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'lamar@init.com', '', 'Lamar','Martinez', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'earl@init.com', '', 'Earl','Gutierrez', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'jill@init.com', '', 'Jill','Long', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'paul@init.com', '', 'Paul','Hogan', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'geneva@init.com', '', 'Geneva','Lucas', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'rose@init.com', '', 'Rosalie','Moss', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'cat@init.com', '', 'Cathy','Perez', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'lynn@init.com', '', 'Lynn','Garza', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'lionel@init.com', '', 'Lionel','Lane', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'darla@init.com', '', 'Darla','Stewart', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'alison@init.com', '', 'Alison','Soto', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'cecilia@init.com', '', 'Cecilia','Hill', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'rufus@init.com', '', 'Rufus','Ray', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'ora@init.com', '', 'Ora','Keller', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'louise@init.com', '', 'Louise','Green', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'rosemary@init.com', '', 'Rosemary','Lawson', '', 0, 1, '2018-04-24', '2018-04-24',  'init');
insert into member(id_member_role,email,password,first_name,last_name,uuid,is_suspended,is_activated,date_created,date_activated,auth_provider)
values(2, 'becky@init.com', '', 'Becky','Maxwell', '', 0, 1, '2018-04-24', '2018-04-24',  'init');

--
-- TOC entry 207 (class 1259 OID 16444)
-- Name: brand; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE brand (
    id_brand integer NOT NULL,
    id_origin integer,
    name character varying(50),
    logo_url character varying(25000),
    position int,
    website_url character varying(25000),
    date_changed timestamp without time zone
);


ALTER TABLE brand OWNER TO carseatjungle;

--
-- TOC entry 206 (class 1259 OID 16442)
-- Name: brand_id_brand_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE brand_id_brand_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE brand_id_brand_seq OWNER TO carseatjungle;

--
-- TOC entry 3976 (class 0 OID 0)
-- Dependencies: 206
-- Name: brand_id_brand_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE brand_id_brand_seq OWNED BY brand.id_brand;


--
-- TOC entry 217 (class 1259 OID 16529)
-- Name: carseat; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE carseat (
    id_carseat integer NOT NULL,
    id_brand integer,
    id_carseat_type integer,
    id_carseat_group integer,
    id_child_weight_group integer,
    id_child_height_group integer,
    model character varying(50),
    is_i_size_compliant boolean,
    has_swivel boolean,
    is_forward_facing boolean,
    is_rear_facing boolean,
    is_sideways boolean,
    has_isofix boolean,
    image_url character varying,
    has_erf boolean,
    has_advanced_sip boolean,
    has_travel_system boolean,
    weight numeric(18,2),
    width integer,
    height integer,
    depth integer,
    angle integer,
    car_fitting_list_url character varying(255),
    price numeric(18,2),
    is_uk_available boolean,
    has_uv_canopy boolean,
    is_swedish_plus_tested boolean,
    is_aircraft_approved boolean,
    date_changed timestamp without time zone
);


ALTER TABLE carseat OWNER TO carseatjungle;

--
-- TOC entry 201 (class 1259 OID 16420)
-- Name: carseat_group; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE carseat_group (
    id_carseat_group integer NOT NULL,
    name character varying(50),
    date_changed timestamp without time zone
);


ALTER TABLE carseat_group OWNER TO carseatjungle;

--
-- TOC entry 200 (class 1259 OID 16418)
-- Name: carseat_group_id_carseat_group_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE carseat_group_id_carseat_group_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carseat_group_id_carseat_group_seq OWNER TO carseatjungle;

--
-- TOC entry 3977 (class 0 OID 0)
-- Dependencies: 200
-- Name: carseat_group_id_carseat_group_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE carseat_group_id_carseat_group_seq OWNED BY carseat_group.id_carseat_group;


--
-- TOC entry 216 (class 1259 OID 16527)
-- Name: carseat_id_carseat_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE carseat_id_carseat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carseat_id_carseat_seq OWNER TO carseatjungle;

--
-- TOC entry 3978 (class 0 OID 0)
-- Dependencies: 216
-- Name: carseat_id_carseat_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE carseat_id_carseat_seq OWNED BY carseat.id_carseat;


--
-- TOC entry 215 (class 1259 OID 16520)
-- Name: carseat_listing; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE carseat_listing (
    id_carseat_listing integer NOT NULL,
    id_carseat integer,
    id_shop integer,
    listing_url character varying(2048),
    date_changed timestamp without time zone
);


ALTER TABLE carseat_listing OWNER TO carseatjungle;

--
-- TOC entry 214 (class 1259 OID 16518)
-- Name: carseat_listing_id_carseat_listing_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE carseat_listing_id_carseat_listing_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carseat_listing_id_carseat_listing_seq OWNER TO carseatjungle;

--
-- TOC entry 3979 (class 0 OID 0)
-- Dependencies: 214
-- Name: carseat_listing_id_carseat_listing_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE carseat_listing_id_carseat_listing_seq OWNED BY carseat_listing.id_carseat_listing;


--
-- TOC entry 211 (class 1259 OID 16503)
-- Name: carseat_manual; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE carseat_manual (
    id_carseat_manual integer NOT NULL,
    id_carseat integer,
    "position" integer,
    manual_url character varying(255),
    date_changed timestamp without time zone
);


ALTER TABLE carseat_manual OWNER TO carseatjungle;

--
-- TOC entry 210 (class 1259 OID 16501)
-- Name: carseat_manual_id_carseat_manual_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE carseat_manual_id_carseat_manual_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carseat_manual_id_carseat_manual_seq OWNER TO carseatjungle;

--
-- TOC entry 3980 (class 0 OID 0)
-- Dependencies: 210
-- Name: carseat_manual_id_carseat_manual_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE carseat_manual_id_carseat_manual_seq OWNED BY carseat_manual.id_carseat_manual;


--
-- TOC entry 199 (class 1259 OID 16412)
-- Name: carseat_type; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE carseat_type (
    id_carseat_type integer NOT NULL,
    name character varying(50),
    date_changed timestamp without time zone
);


ALTER TABLE carseat_type OWNER TO carseatjungle;

--
-- TOC entry 198 (class 1259 OID 16410)
-- Name: carseat_type_id_carseat_type_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE carseat_type_id_carseat_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carseat_type_id_carseat_type_seq OWNER TO carseatjungle;

--
-- TOC entry 3981 (class 0 OID 0)
-- Dependencies: 198
-- Name: carseat_type_id_carseat_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE carseat_type_id_carseat_type_seq OWNED BY carseat_type.id_carseat_type;


--
-- TOC entry 209 (class 1259 OID 16493)
-- Name: carseat_video; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE carseat_video (
    id_carseat_video integer NOT NULL,
    id_carseat integer,
    "position" integer,
    video_url character varying(2048),
    date_changed timestamp without time zone
);


ALTER TABLE carseat_video OWNER TO carseatjungle;

--
-- TOC entry 208 (class 1259 OID 16491)
-- Name: carseat_video_id_carseat_video_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE carseat_video_id_carseat_video_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carseat_video_id_carseat_video_seq OWNER TO carseatjungle;

--
-- TOC entry 3982 (class 0 OID 0)
-- Dependencies: 208
-- Name: carseat_video_id_carseat_video_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE carseat_video_id_carseat_video_seq OWNED BY carseat_video.id_carseat_video;


--
-- TOC entry 205 (class 1259 OID 16436)
-- Name: child_height_group; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE child_height_group (
    id_child_height_group integer NOT NULL,
    name character varying(50),
    date_changed timestamp without time zone
);


ALTER TABLE child_height_group OWNER TO carseatjungle;

--
-- TOC entry 204 (class 1259 OID 16434)
-- Name: child_height_group_id_child_height_group_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE child_height_group_id_child_height_group_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE child_height_group_id_child_height_group_seq OWNER TO carseatjungle;

--
-- TOC entry 3983 (class 0 OID 0)
-- Dependencies: 204
-- Name: child_height_group_id_child_height_group_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE child_height_group_id_child_height_group_seq OWNED BY child_height_group.id_child_height_group;


--
-- TOC entry 203 (class 1259 OID 16428)
-- Name: child_weight_group; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE child_weight_group (
    id_child_weight_group integer NOT NULL,
    name character varying(50),
    date_changed timestamp without time zone
);


ALTER TABLE child_weight_group OWNER TO carseatjungle;

--
-- TOC entry 202 (class 1259 OID 16426)
-- Name: child_weight_group_id_child_weight_group_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE child_weight_group_id_child_weight_group_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE child_weight_group_id_child_weight_group_seq OWNER TO carseatjungle;

--
-- TOC entry 3984 (class 0 OID 0)
-- Dependencies: 202
-- Name: child_weight_group_id_child_weight_group_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE child_weight_group_id_child_weight_group_seq OWNED BY child_weight_group.id_child_weight_group;


--
-- TOC entry 224 (class 1259 OID 16637)
-- Name: dummy; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE dummy (
    name character varying(255),
    description character varying(255)
);


ALTER TABLE dummy OWNER TO carseatjungle;

--
-- TOC entry 197 (class 1259 OID 16404)
-- Name: origin; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE origin (
    id_origin integer NOT NULL,
    name character varying(50),
    date_changed timestamp without time zone
);


ALTER TABLE origin OWNER TO carseatjungle;

--
-- TOC entry 196 (class 1259 OID 16402)
-- Name: origin_id_origin_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE origin_id_origin_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE origin_id_origin_seq OWNER TO carseatjungle;

--
-- TOC entry 3985 (class 0 OID 0)
-- Dependencies: 196
-- Name: origin_id_origin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE origin_id_origin_seq OWNED BY origin.id_origin;


--
-- TOC entry 223 (class 1259 OID 16612)
-- Name: ranking; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE ranking (
    id_ranking integer NOT NULL,
    id_ranking_provider integer,
    id_carseat integer,
    id_ranking_value integer,
    date_changed timestamp without time zone
);


ALTER TABLE ranking OWNER TO carseatjungle;

--
-- TOC entry 222 (class 1259 OID 16610)
-- Name: ranking_id_ranking_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE ranking_id_ranking_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ranking_id_ranking_seq OWNER TO carseatjungle;

--
-- TOC entry 3986 (class 0 OID 0)
-- Dependencies: 222
-- Name: ranking_id_ranking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE ranking_id_ranking_seq OWNED BY ranking.id_ranking;


--
-- TOC entry 219 (class 1259 OID 16590)
-- Name: ranking_provider; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE ranking_provider (
    id_ranking_provider integer NOT NULL,
    name character varying(255),
    date_changed timestamp without time zone
);


ALTER TABLE ranking_provider OWNER TO carseatjungle;

--
-- TOC entry 218 (class 1259 OID 16588)
-- Name: ranking_provider_id_ranking_provider_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE ranking_provider_id_ranking_provider_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ranking_provider_id_ranking_provider_seq OWNER TO carseatjungle;

--
-- TOC entry 3987 (class 0 OID 0)
-- Dependencies: 218
-- Name: ranking_provider_id_ranking_provider_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE ranking_provider_id_ranking_provider_seq OWNED BY ranking_provider.id_ranking_provider;


--
-- TOC entry 221 (class 1259 OID 16598)
-- Name: ranking_value; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE ranking_value (
    id_ranking_value integer NOT NULL,
    id_ranking_provider integer,
    name character varying(255),
    date_changed timestamp without time zone
);


ALTER TABLE ranking_value OWNER TO carseatjungle;

--
-- TOC entry 220 (class 1259 OID 16596)
-- Name: ranking_value_id_ranking_value_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE ranking_value_id_ranking_value_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ranking_value_id_ranking_value_seq OWNER TO carseatjungle;

--
-- TOC entry 3988 (class 0 OID 0)
-- Dependencies: 220
-- Name: ranking_value_id_ranking_value_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE ranking_value_id_ranking_value_seq OWNED BY ranking_value.id_ranking_value;


--
-- TOC entry 213 (class 1259 OID 16512)
-- Name: shop; Type: TABLE; Schema: public; Owner: carseatjungle
--

CREATE TABLE shop (
    id_shop integer NOT NULL,
    name character varying(50),
    "position" integer,
    date_changed timestamp without time zone
);


ALTER TABLE shop OWNER TO carseatjungle;

--
-- TOC entry 212 (class 1259 OID 16510)
-- Name: shop_id_shop_seq; Type: SEQUENCE; Schema: public; Owner: carseatjungle
--

CREATE SEQUENCE shop_id_shop_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE shop_id_shop_seq OWNER TO carseatjungle;

--
-- TOC entry 3989 (class 0 OID 0)
-- Dependencies: 212
-- Name: shop_id_shop_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: carseatjungle
--

ALTER SEQUENCE shop_id_shop_seq OWNED BY shop.id_shop;


--
-- TOC entry 3755 (class 2604 OID 16447)
-- Name: brand id_brand; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY brand ALTER COLUMN id_brand SET DEFAULT nextval('brand_id_brand_seq'::regclass);


--
-- TOC entry 3760 (class 2604 OID 16532)
-- Name: carseat id_carseat; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat ALTER COLUMN id_carseat SET DEFAULT nextval('carseat_id_carseat_seq'::regclass);


--
-- TOC entry 3752 (class 2604 OID 16423)
-- Name: carseat_group id_carseat_group; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_group ALTER COLUMN id_carseat_group SET DEFAULT nextval('carseat_group_id_carseat_group_seq'::regclass);


--
-- TOC entry 3759 (class 2604 OID 16523)
-- Name: carseat_listing id_carseat_listing; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_listing ALTER COLUMN id_carseat_listing SET DEFAULT nextval('carseat_listing_id_carseat_listing_seq'::regclass);


--
-- TOC entry 3757 (class 2604 OID 16506)
-- Name: carseat_manual id_carseat_manual; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_manual ALTER COLUMN id_carseat_manual SET DEFAULT nextval('carseat_manual_id_carseat_manual_seq'::regclass);


--
-- TOC entry 3751 (class 2604 OID 16415)
-- Name: carseat_type id_carseat_type; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_type ALTER COLUMN id_carseat_type SET DEFAULT nextval('carseat_type_id_carseat_type_seq'::regclass);


--
-- TOC entry 3756 (class 2604 OID 16496)
-- Name: carseat_video id_carseat_video; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_video ALTER COLUMN id_carseat_video SET DEFAULT nextval('carseat_video_id_carseat_video_seq'::regclass);


--
-- TOC entry 3754 (class 2604 OID 16439)
-- Name: child_height_group id_child_height_group; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY child_height_group ALTER COLUMN id_child_height_group SET DEFAULT nextval('child_height_group_id_child_height_group_seq'::regclass);


--
-- TOC entry 3753 (class 2604 OID 16431)
-- Name: child_weight_group id_child_weight_group; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY child_weight_group ALTER COLUMN id_child_weight_group SET DEFAULT nextval('child_weight_group_id_child_weight_group_seq'::regclass);


--
-- TOC entry 3750 (class 2604 OID 16407)
-- Name: origin id_origin; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY origin ALTER COLUMN id_origin SET DEFAULT nextval('origin_id_origin_seq'::regclass);


--
-- TOC entry 3763 (class 2604 OID 16615)
-- Name: ranking id_ranking; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking ALTER COLUMN id_ranking SET DEFAULT nextval('ranking_id_ranking_seq'::regclass);


--
-- TOC entry 3761 (class 2604 OID 16593)
-- Name: ranking_provider id_ranking_provider; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking_provider ALTER COLUMN id_ranking_provider SET DEFAULT nextval('ranking_provider_id_ranking_provider_seq'::regclass);


--
-- TOC entry 3762 (class 2604 OID 16601)
-- Name: ranking_value id_ranking_value; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking_value ALTER COLUMN id_ranking_value SET DEFAULT nextval('ranking_value_id_ranking_value_seq'::regclass);


--
-- TOC entry 3758 (class 2604 OID 16515)
-- Name: shop id_shop; Type: DEFAULT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY shop ALTER COLUMN id_shop SET DEFAULT nextval('shop_id_shop_seq'::regclass);


--
-- TOC entry 3950 (class 0 OID 16444)
-- Dependencies: 207
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY brand (id_brand, id_origin, name, logo_url, website_url, date_changed) FROM stdin;
51	11	Baby Jogger	http://babyjogger.co.uk/image/awards/ftrdimghOjl5f_1382746415.jpg		\N
52	3	Concord			\N
53	12	Migo	https://www.groupeteamtex.com/wp-content/uploads/2018/09/migo-deg.png		\N
54	16	BeSafe	https://www.besafe.com/wp-content/uploads/2015/08/About-besafe_logo.jpg		\N
55	12	Nania			\N
56	8	Osann	https://www.osann.de/images/grafiken/osann-logo.png		\N
57	11	IckleBubba	https://www.icklebubba.com/wp-content/uploads/2016/12/logo.png		\N
58	11	Cosatto	https://cdn.cosatto.com/images/default-source/navigationimages/2018-website-cosatto-logo.png?sfvrsn=2f8a32c0_0		\N
59	3	Kids Embrace			\N
60	6	Nuna	https://www.nuna.eu/skin/frontend/nuna/default/images/logo.png		\N
61	11	Obaby	https://www.brighthouse.co.uk/-/media/images/blog/2016/06/obaby-logo-1024x541.png?h=158&la=en&mh=300&mw=300&w=300&hash=F3A9F6E6117D3FC8A49FF8FB00243F06331C7451		\N
62	9	Peg Perego	https://en.pegperego.com/medias/logo-pegperego.svg?context=bWFzdGVyfGltYWdlc3w0ODQ3NzF8aW1hZ2Uvc3ZnK3htbHxpbWFnZXMvaDY3L2g0OC84Nzk2NjMwODQzNDIyLnN2Z3xiNTY5NGJlODZmMGZjODY2MTRiNGI0YTNiZDA2ZDRhZTBhMmI1MTA1ZjZmZmQ0ZTgzZmE5N2U4NTdlZWNmYjYx		\N
63	8	Takata	https://takata-childseats.com/wp-content/themes/takata/img/logo.svg		\N
64	11	Trunki	https://cdn.shopify.com/s/files/1/1260/4945/t/13/assets/logo_220x.png?7308792949667969836		\N
65	11	Multimac	https://multimac.co.uk/nav/logo02.png		\N
66	8	Recaro	https://en.recaro.com/files/theme/images/logo_recaro.svg		\N
67	12	Nania/Migo			\N
68	12	Babyzen	https://www.babyzen.com/images/accueil/babyzen-logo.png		\N
69	10	Stokke	https://www.stokke.com/on/demandware.static/Sites-GBR-Site/-/default/dw17132b87/img/logo-stokke.svg		\N
70	4	mifold	http://static1.squarespace.com/static/556489a1e4b00349ca3ec6bd/t/5594ae5fe4b0f2c26b1a8cb4/1535660144136/?format=1500w		\N
71	11	Mothercare	https://www.mothercare.com/on/demandware.static/-/Sites-MCENGB-Library/default/dwfbde3024/homepage/recall/mdolly.png		\N
72	14	Diono	https://uk.diono.com/wp-content/themes/diono2017/assets/img/diono_logo@2x.png		\N
73	3	Halfords			\N
74	11	BubbleBum	https://www.bubblebum.co/za/wp-content/uploads/2017/07/bubblebum-logo.png		\N
75	2	Mountain Buggy	https://mountainbuggy.com/extension/mb/design/mb/images/logo-no-text.svg		\N
76	11	Tutti Bambini			\N
77	11	Joie	https://www.joiebaby.com/uk/wp-content/uploads/sites/19/2015/10/logo.png	https://www.joiebaby.com/product/i-level/	\N
78	11	Kiddicare	https://www.doddl.com/wp-content/uploads/2017/03/kiddicare-logo.png		\N
79	14	Graco	http://www.graco.co.uk/content/images/graco_logo_2.png		\N
80	15	Klippan	https://www.klippan.fi/files/generic_png/20034/klippan_logo.png		\N
81	14	Simple Parenting	https://cdn.shopify.com/s/files/1/1953/6615/files/logo_6180f43a-3835-4043-b321-adb1cb4446e2.png?v=1494335607		\N
82	8	GB	http://www.gbinternational.com.hk/wp-content/uploads/2015/10/goodbaby_global.jpg		\N
83	8	Hauck	http://www.hauckuk.com/fileadmin/templates/hauckuk/neko/Public/img/logo_hauck.svg		\N
84	11	Silver Cross	https://www.silvercrossbaby.com/_template/assets/img/silver-cross-logo.png		\N
85	8	ABC Design	https://www.abc-design.de/fileadmin/templates/images/abc_logo.svg		\N
86	11	Kiddy			\N
87	5	Apramo			\N
88	13	Britax	data:image/png;base64,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		\N
89	11	Cozy N Safe			\N
90	17	Joolz	https://my-joolz.co.uk/wp-content/themes/joolz/images/joolz-logo.svg		\N
91	7	BebeCar	https://s3.amazonaws.com/ctm-tm/016456361.JPG		\N
92	8	Cybex	http://cybex-online.com/img/logos/logo-cybexclaim.svg		\N
93	6	nuna	https://www.nuna.eu/skin/frontend/nuna/default/images/logo.png		\N
94	1	Jane	https://www.jane-uk.com/Interface/Logos/LogoTop.Gif		\N
95	2	Phil & Teds	https://philandteds.com/extension/pt/design/pt/images/svg-icons/WEB_philandteds_logos_SVG_SET.svg		\N
96	1	Casual Play	http://www.casualplay.com/sites/all/themes/mfsb/logo.png		\N
97	6	Maxi-Cosi	http://media.maxi-cosi.com/~/media/mcbbc/logo/maxicosi-logo.ashx?vs=1&d=20170807T101116Z&mw=640&jpeg=85&mh=44&la=en&h=44&w=158&mw=158&hash=EF1556863E2644699803120D7A019E3998AEC902		\N
98	3				\N
99	16	Axkid	https://s3.amazonaws.com/ctm-tm/017884097.JPG		\N
100	8	Knorr baby	https://static.bl01.de/media/image/f2/6a/b7/243_Manufacturer.png		\N
\.


--
-- TOC entry 3960 (class 0 OID 16529)
-- Dependencies: 217
-- Data for Name: carseat; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY carseat (id_carseat, id_brand, id_carseat_type, id_carseat_group, id_child_weight_group, id_child_height_group, model, is_i_size_compliant, has_swivel, is_forward_facing, is_rear_facing, is_sideways, image_url, has_erf, has_advanced_sip, has_travel_system, weight, width, height, depth, angle, car_fitting_list_url, price, is_uk_available, has_uv_canopy, is_swedish_plus_tested, is_aircraft_approved, date_changed) FROM stdin;
328	99	3	9	6	10	Kidzone	f	f	t	t	f	https://www.axkid.com/wp-content/uploads/2014/09/Unknown-1.png?x82936	t	t	t	0.00	0	0	0	0	https://www.axkid.com/wp-content/uploads/2014/09/Vehicle-list-belt-attachment.pdf?x82936	431.00	t	f	f	f	\N
337	91	1	10	7	10	Easymaxi ELx	f	f	f	t	f	https://www.bebecar.com/ficheiros/jpg/bbc/seguranca-auto/easymaxi/2017/pp798.jpg	f	f	t	4.00	0	0	0	0	N/A	155.00	t	f	f	f	\N
346	54	6	8	5	9	iZi Kid X2 i-Size	t	f	f	t	f	https://www.carseat.co.uk/wp-content/uploads/2018/06/573050_BeSafe_iZi-Kid-X2-i-Size_Premium-Car-Interior-Black-1-600x600.jpg	t	t	t	0.00	0	0	0	0	https://www.besafe.com/wp-content/uploads/2018/05/BeSafe-iZi-Kid-i-Size-car-list-2018-04-05.pdf	399.99	t	f	t	f	\N
355	88	1	10	7	10	Baby Safe	f	f	f	t	f	https://www.britax-roemer.com/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dwe2b00f1e/images/large/1730/2022/1_BABY-SAFE_CosmosBlack_02_2016_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	f	t	0.00	0	0	0	0	N/A	88.00	t	t	f	f	\N
320	85	1	10	7	10	Hazel	f	f	f	t	f	https://www.abc-design.de/fileadmin/products2019/products/1200012/overview/1900.jpg	f	f	t	0.00	470	240	690	0	N/A	120.00	t	t	f	f	\N
329	99	5	7	3	10	Minikid	f	f	f	t	f	https://www.axkid.com/wp-content/uploads/2014/09/minikid-black-1.png?x82936	t	t	t	0.00	0	0	0	0	https://www.axkid.com/wp-content/uploads/2014/09/Vehicle-list-belt-attachment.pdf?x82936	350.00	t	f	t	f	\N
338	91	4	11	8	10	MultibobFix	f	f	t	f	f	https://www.bebecar.com/ficheiros/jpg/bbc/seguranca-auto/multibob/2017/m402.jpg	f	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
347	54	6	8	5	9	iZi Modular i-Size	t	f	t	t	f	https://www.carseat.co.uk/wp-content/uploads/2018/06/580050_BeSafe_iZi-Modular-i-Size_Premium-Car-Interior-Black-600x600.jpg	t	t	t	0.00	0	0	0	0	https://www.carseat.co.uk/wp-content/uploads/2015/11/Besafe-iZi-Modular-i-Size-base-car-list-2017-02-02.pdf	289.99	t	f	f	f	\N
356	88	1	10	7	5	Baby-Safe i-Size	t	f	f	t	f	https://www.britax-roemer.com/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dwf6b568e8/images/large/3005/2040/1_BABY-SAFE_i-SIZE_OceanBlue_02_2016_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	t	t	0.00	0	0	0	0	N/A	190.00	t	t	f	f	\N
321	85	1	10	7	10	Tulip	f	f	f	t	f	https://www.abc-design.de/fileadmin/products2019/products/1200067/overview/1000.jpg	f	f	t	0.00	440	590	640	0	N/A	0.00	f	t	f	f	\N
330	99	3	9	6	10	Move	f	f	f	t	f	https://www.axkid.com/wp-content/uploads/2016/10/Unknown-1.png?x82936	t	t	t	0.00	0	0	0	0	https://www.axkid.com/wp-content/uploads/2014/09/Vehicle-list-belt-attachment.pdf?x82936	225.00	t	f	t	f	\N
339	91	6	8	5	7	Spinner	t	t	t	t	f	https://www.bebecar.com/ficheiros/jpg/bbc/seguranca-auto/spinner/2018/grey.jpg	t	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
348	54	6	8	9	9	iZi Modular RF i-Size	t	f	f	t	f	https://www.carseat.co.uk/wp-content/uploads//2018/04/580013-BeSafe-iZi-Modular-i-Size-Navy-Me%CC%81lange-product-400x400.jpg	t	t	t	0.00	0	0	0	0	https://www.carseat.co.uk/wp-content/uploads//2015/12/Besafe-iZi-Modular-i-Size-base-car-list-2015-11-12.pdf	240.00	t	f	t	f	\N
357	88	1	10	7	10	Baby-Safe Plus SHR II	f	f	f	t	f	https://www.britax-roemer.com/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dwf95391c3/images/large/1500/2071/1_BABY-SAFE_PLUS_SHR_II_WineRose_02_2016_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	t	t	0.00	0	0	0	0	N/A	140.00	t	t	f	f	\N
322	99	1	10	7	10	Babyfix	f	f	f	t	f	https://www.axkid.com/wp-content/uploads/2017/09/babyfix-black.png?x82936	f	f	t	0.00	0	0	0	0	https://www.axkid.com/wp-content/uploads/2014/08/Vehicle-list_axkid-ISOFIX-belt-attachment-pdf.pdf?x82936	0.00	f	f	f	f	\N
331	99	3	9	6	10	Rekid ISOFIX	f	f	f	t	f	https://www.axkid.com/wp-content/uploads/2017/09/rekid-black.png?x82936	t	f	t	0.00	0	0	0	0	https://www.axkid.com/wp-content/uploads/2014/08/Vehicle-list_axkid-ISOFIX-belt-attachment-pdf.pdf?x82936	259.00	t	f	t	f	\N
340	54	6	8	5	10	iZi Combi X4 ISOfix	f	f	t	t	f	https://www.carseat.co.uk/wp-content/uploads/2018/06/539050_BeSafe_iZi-Combi-X4-ISOfix_Premium-Car-Interior-Black-1-600x600.jpg	t	t	t	0.00	0	0	0	0	https://www.carseat.co.uk/wp-content/uploads/2018/05/BeSafe-iZi-Combi-ISOfix-car-list-2018-04-05.pdf	379.99	t	f	f	f	\N
349	54	5	7	3	10	iZi Plus	f	f	f	t	f	https://www.carseat.co.uk/wp-content/uploads/2018/06/532050_BeSafe_iZi-Plus_Premium-Car-Interior-Black-1-600x600.jpg	t	f	t	0.00	0	0	0	0	https://www.besafe.com/wp-content/uploads/2018/01/BeSafe-iZi-Plus-car-list-2017-12-22.pdf	389.99	t	f	t	f	\N
358	88	4	11	8	10	Discovery SL	f	f	t	f	f	https://www.britax-roemer.com/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dwc92a3f02/images/large/CSSFCC001/2027/1_DISCOVERY_SL_FlameRed_02_2016_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	f	f	0.00	0	0	0	0	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dwfaba8eff/vehiclelist/CSSFCC001/vehiclelist.pdf	85.00	t	f	f	f	\N
323	99	4	11	8	10	Dallas	f	f	t	f	f	https://www.axkid.com/wp-content/uploads/2015/02/Unknown-2.png?x82936	f	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
332	51	1	10	7	10	City Go	f	f	f	t	f	http://babyjogger.co.uk/image/cache/data/products/carseats/City%20Go/City%20Go-560x560.jpg	f	f	t	0.00	0	0	0	0	N/A	170.00	f	f	f	f	\N
341	54	7	4	11	10	iZi Comfort X3	f	f	t	f	f	https://www.carseat.co.uk/wp-content/uploads/2015/08/528164_iZi_Comfort_X3_Black_Cab.jpg	f	f	t	0.00	0	0	0	0	N/A	199.99	t	f	f	f	\N
350	54	4	11	8	10	iZi Up X3	f	f	t	f	f	https://www.carseat.co.uk/wp-content/uploads/2015/09/iZi_Up_X3_512164_BeSafe.jpg	f	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
324	99	3	9	6	10	Duofix Isofix	f	f	t	t	f	https://www.axkid.com/wp-content/uploads/2017/09/duofix-black.png?x82936	t	t	t	0.00	0	0	0	0	https://www.axkid.com/wp-content/uploads/2014/08/Vehicle-list_axkid-ISOFIX-belt-attachment-pdf.pdf?x82936	0.00	f	f	f	f	\N
333	51	1	10	7	5	City Go i-Size	t	f	f	t	f	http://babyjogger.co.uk/image/cache/data/products/carseats/citygoisize/Go%20isize-560x560.jpg	f	f	t	0.00	0	0	0	0	N/A	215.00	t	t	f	f	\N
342	54	7	4	11	10	iZi Comfort X3 ISOfix	f	f	t	f	f	https://www.carseat.co.uk/wp-content/uploads/2015/08/528164_iZi_Comfort_X3_ISOfix_Fresh_Black_Cab.jpg	f	f	t	0.00	0	0	0	0	https://www.besafe.com/wp-content/uploads/2018/05/BeSafe-iZi-Comfort-ISOfix-car-list-2018-04-05.pdf	299.99	t	f	f	f	\N
351	54	4	11	8	10	iZi Up X3 Fix	f	f	t	f	f	https://www.carseat.co.uk/wp-content/uploads/2015/09/iZi_Up_X3_FIX_515164_BeSafe.jpg	f	f	t	0.00	0	0	0	0	https://www.besafe.com/wp-content/uploads/2015/08/BeSafe-iZi-Up-Fix-car-list-2017-12-22.pdf	0.00	f	f	f	f	\N
325	99	4	11	8	10	Grow	f	f	t	f	f	https://www.axkid.com/wp-content/uploads/2017/09/grow_black_webb.png?x82936	f	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
334	68	1	10	7	5	iZi Go Modular by BeSafe	t	f	f	t	f	https://media.mamasandpapas.com/i/mamasandpapas/596825301_Babyzen-Izigo-Modular-Car-Seat_Black_1/Travel/by+brand/Babyzen?$pdpimagedesktop$	f	t	t	0.00	340	720	440	0	N/A	240.00	t	t	f	f	\N
343	54	4	11	8	1	iZi Flex Fix i-Size	t	f	t	f	f	https://www.carseat.co.uk/wp-content/uploads/2018/06/518050_BeSafe_iZi-Flex-FIX-i-Size_Premium-Car-Interior-Black-600x600.jpg	f	f	t	7.00	0	0	0	0		269.99	t	f	f	f	\N
352	88	3	6	10	10	AdvansaFix III SICT	f	f	t	f	f	https://www.britax-roemer.co.uk/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dw693ba2b8/images/large/4381/2022/1_ADVANSAFIX_III_SICT_CosmosBlack_02_IsofixTopTether_2016_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	t	t	0.00	0	0	0	0	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dwc83c7378/vehiclelist/4381/vehiclelist.pdf	210.00	t	f	f	f	\N
326	99	4	11	8	10	Grow ISOFIX	f	f	t	f	f	https://www.axkid.com/wp-content/uploads/2017/09/Unknown.png?x82936	f	f	t	0.00	0	0	0	0	N/A	149.00	t	f	f	f	\N
335	91	6	8	5	10	BobobFix RF	f	f	t	t	f	https://www.bebecar.com/ficheiros/jpg/bbc/seguranca-auto/bobob/2017/m402.jpg	t	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
344	54	1	10	7	5	iZi Go Modular i-Size	t	f	f	t	f	https://www.carseat.co.uk/wp-content/uploads/2018/06/590050_BeSafe_iZi-Go-Modular-i-Size_Premium-Car-Interior-Black-600x600-400x400.jpg	f	t	t	0.00	0	0	0	0	N/A	199.99	t	f	f	f	\N
353	88	3	6	10	10	AdvansaFix IV R	f	f	t	f	f	https://www.britax-roemer.co.uk/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dwc8d6e8b5/images/large/9006/2055/01_ADVANSAFIX_IV_R_StormGrey_02_2018_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	t	t	11.00	440	600	470	0	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dw79ed11ee/vehiclelist/9006/vehiclelist.pdf	250.00	t	f	f	f	\N
327	99	4	11	8	10	Grow Pillow	f	f	t	f	f	https://www.axkid.com/wp-content/uploads/2017/09/mate_svart2.png?x82936	f	f	t	1.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
336	91	1	10	7	10	Easymaxi Basic ELx	f	f	f	t	f	https://www.bebecar.com/ficheiros/jpg/bbc/seguranca-auto/easymaxi-basic/2017/ki701.jpg	f	f	t	0.00	0	0	0	0	N/A	0.00	f	f	f	f	\N
345	54	1	10	7	10	iZi Go X1	f	f	f	t	f	https://www.carseat.co.uk/wp-content/uploads/2015/08/553064_BeSafe_iZi_Go_X1_Fresh_Black_Cab-400x400.jpg	f	f	t	0.00	0	0	0	0	https://www.besafeautostol.dk/wp-content/uploads/2018/05/BeSafe-iZi-Go-ISOfix-car-list-2018-04-05.pdf	179.99	t	t	f	f	\N
354	88	4	11	8	10	Adventure	f	f	t	f	f	https://www.britax-roemer.com/dw/image/v2/BBSR_PRD/on/demandware.static/-/Sites-britax-master-catalog-eu/default/dwe3ef903a/images/large/1170/2022/1_ADVENTURE_CosmosBlack_02_BR_2016_72dpi_2000x2000.png?sw=1000&sh=1000&sm=fit	f	f	t	0.00	0	0	0	0	N/A	35.00	t	f	f	f	\N
\.


--
-- TOC entry 3944 (class 0 OID 16420)
-- Dependencies: 201
-- Data for Name: carseat_group; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY carseat_group (id_carseat_group, name, date_changed) FROM stdin;
1	0+/1/2/3	\N
2	0	\N
3		\N
4	1	\N
5	3	\N
6	01/02/2003	\N
7	0+/1/2	\N
8	0+/1	\N
9	01-Feb	\N
10	0+	\N
11	02-Mar	\N
\.


--
-- TOC entry 3958 (class 0 OID 16520)
-- Dependencies: 215
-- Data for Name: carseat_listing; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY carseat_listing (id_carseat_listing, id_carseat, id_shop, listing_url, date_changed) FROM stdin;
29	320	0	https://www.mothercare.com/baby-car-seats-group-0/abc-design-hazel-group-0-infant-car-seat---piano/315261.html?cgid=car_infant#prefn1=brand&prefv1=My+Child%7CTutti+Bambini%7CABC+Design&start=2	\N
30	326	18	https://www.mumstore.co.uk/axkid-grow-isofix-black?gclid=EAIaIQobChMIzYGZ7_Gb3QIVB4jVCh37xw6ZEAkYCiABEgL7qPD_BwE	\N
31	328	18	https://www.amazon.co.uk/Reclinable-Axkid-Kidzone-Reboard-Opposite/dp/B01NBKLQPA/ref=sr_1_3_a_it?ie=UTF8&qid=1535874197&sr=8-3&keywords=axkid+car+seats	\N
32	329	18	https://www.kiddies-kingdom.com/40_axkid	\N
33	330	18	https://www.pramcentre.co.uk/car-seats-carriers-luggage-c2/toddler-car-seats-c175/axkid-move-p10086#attribute%5B3%5D=3372	\N
34	331	18	https://www.paulstride.co.uk/axkid-rekid-black.ir?gclid=EAIaIQobChMIzYGZ7_Gb3QIVB4jVCh37xw6ZEAkYBCABEgIwgPD_BwE	\N
35	332	18	http://www.pramworld.co.uk/baby-jogger-city-go-car-seat-plus-base-tan#.W4uV_JNKjUo	\N
36	333	18	http://www.pramworld.co.uk/baby-jogger-city-go-group-0-i-size-infant-car-seat-black#.W4uVvJNKjUo	\N
37	334	1	https://www.mamasandpapas.com/en-gb/babyzen-izi-go-modular-baby-car-seat-black-inc-adaptors/p/596825301	\N
38	337	18	https://www.pramcentre.co.uk/car-seats-carriers-luggage-c2/baby-car-seats-c174/b%C3%A9b%C3%A9car-easymaxi-elxe-magic-infant-car-seat-p1342#attribute%5B3%5D=1759	\N
39	340	18	https://www.pramcentre.co.uk/car-seats-carriers-luggage-c2/toddler-car-seats-c175/besafe-izi-combi-x4-isofix-p4413#attribute%5B3%5D=3258	\N
40	341	18	https://www.pramcentre.co.uk/car-seats-carriers-luggage-c2/toddler-car-seats-c175/besafe-izi-comfort-x3-p4421#attribute%5B3%5D=3258	\N
41	342	18	https://www.pramcentre.co.uk/car-seats-carriers-luggage-c2/toddler-car-seats-c175/besafe-izi-comfort-x3-isofix-p4423#attribute%5B3%5D=3258	\N
42	343	2	https://www.johnlewis.com/besafe-izi-flex-high-back-booster-group-2-3-i-size-seat-midnight-black/p3519355	\N
43	344	2	https://www.johnlewis.com/besafe-izi-go-modular-i-size-group-0-baby-car-seat-black-white/p3597350	\N
44	345	18	https://www.pramcentre.co.uk/car-seats-carriers-luggage-c2/baby-car-seats-c174/besafe-izi-go-x1-p4410#attribute%5B3%5D=3258	\N
45	346	18	https://www.pramcentre.co.uk/car-seats-c223/besafe-izi-kid-x2-i-size-p1202#attribute%5B3%5D=319	\N
46	347	2	https://www.johnlewis.com/besafe-izi-modular-i-size-group-1-car-seat-navy/p3517852	\N
47	348	18	https://www.pramcentre.co.uk/carriers-luggage-c224/toddler-car-seats-c242/besafe-izi-modular-i-size-rf-p1199	\N
48	349	18	http://www.pramworld.co.uk/besafe-izi-plus-premium-car-interior-black	\N
49	353	0	https://www.mothercare.com/highback-boosters-with-harness-group-1-2-3/britax--r%C3%B6mer-advansafix-iv-r-car-seat/LNF442.html	\N
50	355	18	https://www.babyplanetonline.co.uk/britax-romer-car-seat-baby-safe-car-seat-cosmos-black?gclid=EAIaIQobChMIna7S4KDR3QIVyYKyCh3JOAUuEAkYBiABEgJJLvD_BwE	\N
51	358	0	https://www.mothercare.com/highback-boosters-without-harness-group-2-3/britax-discovery-sl-highback-booster-seat/LDA230.html	\N
52	358	1	N/A	\N
53	358	2	N/A	\N
54	358	3	https://incarsafetycentre.co.uk/product/discovery-sl-cosmos-black/	\N
\.


--
-- TOC entry 3954 (class 0 OID 16503)
-- Dependencies: 211
-- Data for Name: carseat_manual; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY carseat_manual (id_carseat_manual, id_carseat, "position", manual_url, date_changed) FROM stdin;
57	320	1	https://www.abc-design.de/fileadmin/products2019/manuals/1200012.pdf	\N
58	322	1	https://www.axkid.com/wp-content/uploads/2014/08/Axkid_babyfix.pdf?x82936	\N
59	323	1	https://www.axkid.com/wp-content/uploads/2015/02/Dallas-%E4%B8%89%E5%9B%BD%E8%AF%AD%E8%A8%80.pdf?x82936	\N
60	324	1	https://www.axkid.com/wp-content/uploads/2014/08/Axkid_Duofix.pdf?x82936	\N
61	325	1	https://www.axkid.com/wp-content/uploads/2017/09/Axkid_Grow.pdf?x82936	\N
62	326	1	https://www.axkid.com/wp-content/uploads/2017/04/Grow-Isofix.pdf?x82936	\N
63	327	1	https://www.axkid.com/wp-content/uploads/2014/09/Axkid_mate.pdf?x82936	\N
64	328	1	https://www.axkid.com/wp-content/uploads/2014/09/Axkid_Kidzone.pdf?x82936	\N
65	329	1	https://www.axkid.com/wp-content/uploads/2014/09/Axkid_Minikid.pdf?x82936	\N
66	330	1	https://www.axkid.com/wp-content/uploads/2016/10/Axkid-Move-Combined-Instructions.pdf?x82936	\N
67	331	1	https://www.axkid.com/wp-content/uploads/2015/02/Axkid_rekid.pdf?x82936	\N
68	332	1	http://babyjogger.co.uk/docs/pdf8D8mOStm2q_1452677448.pdf	\N
69	333	1	http://babyjogger.co.uk/docs/pdfsjQFE_1512474469.pdf	\N
70	335	1	http://files.grupobebecar.com/pdf/bbc/instr/bobobfix.pdf	\N
71	337	1	http://files.grupobebecar.com/pdf/bbc/instr/easymaxiel.pdf	\N
72	338	1	http://files.grupobebecar.com/pdf/bbc/instr/multibobfix.pdf	\N
73	340	1	https://www.carseat.co.uk/wp-content/uploads/2015/08/BeSafe-iZi-Combi-X4-ISOfix-GB.pdf	\N
74	341	1	https://www.besafe.com/wp-content/uploads/2015/08/BeSafe-iZi-Comfort-X3-GB.pdf	\N
75	342	1	https://www.besafe.com/wp-content/uploads/2015/08/BeSafe-Comfort-ISOfix-GB.pdf	\N
76	343	1	https://www.besafe.com/wp-content/uploads/2017/10/BeSafe-iZi-Flex-FIX-i-Size-user-manual-2018-01-12-web.pdf	\N
77	344	1	https://www.carseat.co.uk/wp-content/uploads/2017/06/user-manual-BeSafe-iZi-Go-Modular-all-languages-2017-06-11-web.pdf	\N
78	345	1	https://www.carseat.co.uk/wp-content/uploads/2015/08/BeSafe-iZi-Go-X1-2016-06-27.pdf	\N
79	346	1	https://www.besafe.com/wp-content/uploads/2016/04/BeSafe-iZi-Kid-X2-i-size-user-manual-all-languages-2015-10-30-web.pdf	\N
80	347	1	https://www.carseat.co.uk/wp-content/uploads/2017/05/2017-05-18-user-manual-BeSafe-iZi-Modular-all-languages-web.pdf	\N
81	348	1	https://www.carseat.co.uk/wp-content/uploads//2015/08/BeSafe-iZi-Modular-Base-SE.pdf	\N
82	349	1	https://www.besafe.com/wp-content/uploads/2015/08/BeSafe-iZi-Plus-GB.pdf	\N
83	350	1	https://www.besafe.com/wp-content/uploads/2015/08/01-BeSafe-iZi-Up-X3-GB-2016-03-24-.pdf	\N
84	351	1	https://www.besafe.com/wp-content/uploads/2015/08/BeSafe-iZi-Up-X3-Fix-GB.pdf	\N
85	352	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dwe60bf652/userinstructions/4381/ADVANSAFIXIII_EN.pdf	\N
86	353	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dw27c5205b/userinstructions/9006/ADVANSAFIXIVR_EN.pdf	\N
87	354	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dw7fa6c43f/userinstructions/1170/ADVENTURE_DE_EN_FR_ES_PT_IT_RU_DA_NL.pdf	\N
88	355	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dw2c62ca06/userinstructions/1730/BABYSAFE_DE_EN_FR_ES_PT_IT_RU_DA_NL.pdf	\N
89	356	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dwaa818a69/userinstructions/3005/BabySafeiSize_EN.pdf	\N
90	357	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dw7f737bf1/userinstructions/1500/BABYSAFEPLUSSHRII_DE_EN_FR.pdf	\N
91	358	1	https://www.britax-roemer.co.uk/on/demandware.static/-/Library-Sites-BritaxSharedLibrary/default/dwfccf951c/userinstructions/CSSFCC001/DISCOVERYSL_EN.pdf	\N
\.


--
-- TOC entry 3942 (class 0 OID 16412)
-- Dependencies: 199
-- Data for Name: carseat_type; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY carseat_type (id_carseat_type, name, date_changed) FROM stdin;
1	Infant Car Seat	\N
2		\N
3	Toddler/Child Car Seat	\N
4	Child Car Seat	\N
5	Infant/Toddler/Child Car Seat	\N
6	Infant/Toddler Car Seat	\N
7	Toddler Car Seat	\N
8	All in One	\N
9	Backless Booster	\N
\.


--
-- TOC entry 3952 (class 0 OID 16493)
-- Dependencies: 209
-- Data for Name: carseat_video; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY carseat_video (id_carseat_video, id_carseat, "position", video_url, date_changed) FROM stdin;
55	322	1	https://www.youtube.com/watch?time_continue=43&v=rD1uaBTgwJo	\N
56	323	1	https://www.youtube.com/watch?v=2YsyJu5Xoa0	\N
57	324	1	https://youtu.be/th_az-1evQU	\N
58	325	1	https://www.youtube.com/watch?v=MLU8WDoQinQ	\N
59	326	1	https://www.youtube.com/watch?v=3s2qhimVdRs	\N
60	327	1	https://www.youtube.com/watch?v=-TtRFCiGnUQ	\N
61	328	1	https://youtu.be/rnguh3q5ulU	\N
62	329	1	https://www.youtube.com/watch?time_continue=97&v=Fw-CK4uYbOk	\N
63	331	1	https://www.youtube.com/watch?time_continue=114&v=uE2aWm0x5IM	\N
64	332	1	http://babyjogger.co.uk/videos/city-go/video.mp4	\N
65	340	1	https://vimeo.com/117999118	\N
66	341	1	https://player.vimeo.com/video/33781561	\N
67	342	1	https://player.vimeo.com/video/33780710	\N
68	343	1	https://www.youtube.com/watch?v=Qn4PBjkNApY	\N
69	344	1	https://vimeo.com/141154174	\N
70	345	1	https://player.vimeo.com/video/33344434	\N
71	346	1	https://vimeo.com/148079515#at=2	\N
72	347	1	https://vimeo.com/138526970	\N
73	348	1	https://vimeo.com/142609823	\N
74	349	1	https://player.vimeo.com/video/67804797	\N
75	350	1	https://player.vimeo.com/video/57590016	\N
76	351	1	https://vimeo.com/57590017	\N
77	352	1	https://www.youtube.com/watch?v=uq8BigH-XI4	\N
78	353	1	https://www.youtube.com/watch?v=mQEXum4Fchw	\N
79	356	1	https://www.youtube.com/watch?v=pmIdxxXFLgM	\N
80	357	1	https://www.youtube.com/watch?v=0zpBFMbna7I	\N
\.


--
-- TOC entry 3948 (class 0 OID 16436)
-- Dependencies: 205
-- Data for Name: child_height_group; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY child_height_group (id_child_height_group, name, date_changed) FROM stdin;
1	100 - 150 cm	\N
2	up to 150 cm	\N
3	71 - 135 cm	\N
4		\N
5	40 - 83 cm	\N
6	40 - 75 cm	\N
7	40 - 105 cm	\N
9	61 - 105 cm	\N
10	N/A	\N
\.


--
-- TOC entry 3946 (class 0 OID 16428)
-- Dependencies: 203
-- Data for Name: child_weight_group; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY child_weight_group (id_child_weight_group, name, date_changed) FROM stdin;
1	0 - 10 kgs	\N
2	0 - 36 kgs	\N
3	0 - 25 kgs	\N
4		\N
5	0 - 18 kgs	\N
6	9 - 25 kgs	\N
7	0 - 13 kgs	\N
8	15 - 36 kgs	\N
9	N/A	\N
10	9 - 36 kgs	\N
11	9 - 18 kgs	\N
12	22 - 36 kgs	\N
\.


--
-- TOC entry 3967 (class 0 OID 16637)
-- Dependencies: 224
-- Data for Name: dummy; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY dummy (name, description) FROM stdin;
\.


--
-- TOC entry 3940 (class 0 OID 16404)
-- Dependencies: 197
-- Data for Name: origin; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY origin (id_origin, name, date_changed) FROM stdin;
1	Spain	\N
2	New Zealand	\N
3		\N
4	Israel	\N
5	UK/China	\N
6	Netherlands	\N
7	Portugal	\N
8	Germany	\N
9	Italy	\N
10	Norway	\N
11	UK	\N
12	France	\N
13	UK/Germany	\N
14	US	\N
15	Finland	\N
16	Sweden	\N
17	The Netherlands	\N
\.


--
-- TOC entry 3966 (class 0 OID 16612)
-- Dependencies: 223
-- Data for Name: ranking; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY ranking (id_ranking, id_ranking_provider, id_carseat, id_ranking_value, date_changed) FROM stdin;
5	1	322	2	\N
6	1	324	3	\N
7	4	324	16	\N
8	1	337	4	\N
9	1	342	2	\N
10	1	343	2	\N
11	3	343	12	\N
12	1	344	2	\N
13	2	344	8	\N
14	3	344	12	\N
15	4	344	17	\N
16	1	345	2	\N
17	1	346	2	\N
18	2	346	8	\N
19	3	346	12	\N
20	1	347	2	\N
21	2	347	8	\N
22	3	347	12	\N
23	1	350	4	\N
24	1	351	2	\N
25	1	352	4	\N
26	2	352	9	\N
27	3	352	13	\N
28	4	354	16	\N
29	1	356	2	\N
30	2	356	8	\N
31	3	356	12	\N
32	1	357	2	\N
\.


--
-- TOC entry 3962 (class 0 OID 16590)
-- Dependencies: 219
-- Data for Name: ranking_provider; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY ranking_provider (id_ranking_provider, name, date_changed) FROM stdin;
1	ADAC	2019-01-05 11:11:12.959915
2	TCS	2019-01-05 11:11:12.959915
3	OAMTC	2019-01-05 11:11:12.959915
4	Which?	2019-01-05 11:11:12.959915
\.


--
-- TOC entry 3964 (class 0 OID 16598)
-- Dependencies: 221
-- Data for Name: ranking_value; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY ranking_value (id_ranking_value, id_ranking_provider, name, date_changed) FROM stdin;
1	1		\N
2	1	Good	\N
3	1	Sufficient	\N
4	1	Satisfactory	\N
5	1	Faulty	\N
6	1	Very Good	\N
7	2		\N
8	2	4 stars	\N
9	2	3 stars	\N
10	2	1 star	\N
11	2	2 stars	\N
12	3	4 stars	\N
13	3	3 stars	\N
14	3	1 star	\N
15	3	2 stars	\N
16	4	Don't Buy	\N
17	4	Best Buy	\N
\.


--
-- TOC entry 3956 (class 0 OID 16512)
-- Dependencies: 213
-- Data for Name: shop; Type: TABLE DATA; Schema: public; Owner: carseatjungle
--

COPY shop (id_shop, name, "position", date_changed) FROM stdin;
1	Mothercare	1	2019-01-05 11:10:00.330083
2	Mamas&Papas	2	2019-01-05 11:10:00.330083
3	John Lewis	3	2019-01-05 11:10:00.330083
4	InCarSafetyCentre	4	2019-01-05 11:10:00.330083
5	UberKids	5	2019-01-05 11:10:00.330083
6	Amazon	6	2019-01-05 11:10:00.330083
7	PreciousLittleOne	7	2019-01-05 11:10:00.330083
8	Directly from Manufacturer	8	2019-01-05 11:10:00.330083
9	Boots	9	2019-01-05 11:10:00.330083
10	Pram Centre (Glasgow)	10	2019-01-05 11:10:00.330083
11	Baby Centre (Bournemouth)	11	2019-01-05 11:10:00.330083
12	Kiddies Kingdom	12	2019-01-05 11:10:00.330083
13	Argos	13	2019-01-05 11:10:00.330083
14	SmythsToys	14	2019-01-05 11:10:00.330083
15	Winstanleys Pramworld	15	2019-01-05 11:10:00.330083
16	Online4baby	16	2019-01-05 11:10:00.330083
17	Dunelm	17	2019-01-05 11:10:00.330083
18	Halfords	18	2019-01-05 11:10:00.330083
19	Other retaile	19	2019-01-05 11:10:00.330083
\.


--
-- TOC entry 3990 (class 0 OID 0)
-- Dependencies: 206
-- Name: brand_id_brand_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('brand_id_brand_seq', 100, true);


--
-- TOC entry 3991 (class 0 OID 0)
-- Dependencies: 200
-- Name: carseat_group_id_carseat_group_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('carseat_group_id_carseat_group_seq', 11, true);


--
-- TOC entry 3992 (class 0 OID 0)
-- Dependencies: 216
-- Name: carseat_id_carseat_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('carseat_id_carseat_seq', 358, true);


--
-- TOC entry 3993 (class 0 OID 0)
-- Dependencies: 214
-- Name: carseat_listing_id_carseat_listing_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('carseat_listing_id_carseat_listing_seq', 54, true);


--
-- TOC entry 3994 (class 0 OID 0)
-- Dependencies: 210
-- Name: carseat_manual_id_carseat_manual_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('carseat_manual_id_carseat_manual_seq', 91, true);


--
-- TOC entry 3995 (class 0 OID 0)
-- Dependencies: 198
-- Name: carseat_type_id_carseat_type_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('carseat_type_id_carseat_type_seq', 9, true);


--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 208
-- Name: carseat_video_id_carseat_video_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('carseat_video_id_carseat_video_seq', 80, true);


--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 204
-- Name: child_height_group_id_child_height_group_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('child_height_group_id_child_height_group_seq', 10, true);


--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 202
-- Name: child_weight_group_id_child_weight_group_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('child_weight_group_id_child_weight_group_seq', 12, true);


--
-- TOC entry 3999 (class 0 OID 0)
-- Dependencies: 196
-- Name: origin_id_origin_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('origin_id_origin_seq', 17, true);


--
-- TOC entry 4000 (class 0 OID 0)
-- Dependencies: 222
-- Name: ranking_id_ranking_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('ranking_id_ranking_seq', 32, true);


--
-- TOC entry 4001 (class 0 OID 0)
-- Dependencies: 218
-- Name: ranking_provider_id_ranking_provider_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('ranking_provider_id_ranking_provider_seq', 4, true);


--
-- TOC entry 4002 (class 0 OID 0)
-- Dependencies: 220
-- Name: ranking_value_id_ranking_value_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('ranking_value_id_ranking_value_seq', 17, true);


--
-- TOC entry 4003 (class 0 OID 0)
-- Dependencies: 212
-- Name: shop_id_shop_seq; Type: SEQUENCE SET; Schema: public; Owner: carseatjungle
--

SELECT pg_catalog.setval('shop_id_shop_seq', 19, true);


--
-- TOC entry 3775 (class 2606 OID 16452)
-- Name: brand brand_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY brand
    ADD CONSTRAINT brand_pkey PRIMARY KEY (id_brand);


--
-- TOC entry 3769 (class 2606 OID 16425)
-- Name: carseat_group carseat_group_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_group
    ADD CONSTRAINT carseat_group_pkey PRIMARY KEY (id_carseat_group);


--
-- TOC entry 3786 (class 2606 OID 16525)
-- Name: carseat_listing carseat_listing_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_listing
    ADD CONSTRAINT carseat_listing_pkey PRIMARY KEY (id_carseat_listing);


--
-- TOC entry 3781 (class 2606 OID 16508)
-- Name: carseat_manual carseat_manual_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_manual
    ADD CONSTRAINT carseat_manual_pkey PRIMARY KEY (id_carseat_manual);


--
-- TOC entry 3789 (class 2606 OID 16537)
-- Name: carseat carseat_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat
    ADD CONSTRAINT carseat_pkey PRIMARY KEY (id_carseat);


--
-- TOC entry 3767 (class 2606 OID 16417)
-- Name: carseat_type carseat_type_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_type
    ADD CONSTRAINT carseat_type_pkey PRIMARY KEY (id_carseat_type);


--
-- TOC entry 3778 (class 2606 OID 16498)
-- Name: carseat_video carseat_video_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_video
    ADD CONSTRAINT carseat_video_pkey PRIMARY KEY (id_carseat_video);


--
-- TOC entry 3773 (class 2606 OID 16441)
-- Name: child_height_group child_height_group_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY child_height_group
    ADD CONSTRAINT child_height_group_pkey PRIMARY KEY (id_child_height_group);


--
-- TOC entry 3771 (class 2606 OID 16433)
-- Name: child_weight_group child_weight_group_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY child_weight_group
    ADD CONSTRAINT child_weight_group_pkey PRIMARY KEY (id_child_weight_group);


--
-- TOC entry 3765 (class 2606 OID 16409)
-- Name: origin origin_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY origin
    ADD CONSTRAINT origin_pkey PRIMARY KEY (id_origin);


--
-- TOC entry 3804 (class 2606 OID 16617)
-- Name: ranking ranking_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking
    ADD CONSTRAINT ranking_pkey PRIMARY KEY (id_ranking);


--
-- TOC entry 3796 (class 2606 OID 16595)
-- Name: ranking_provider ranking_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking_provider
    ADD CONSTRAINT ranking_provider_pkey PRIMARY KEY (id_ranking_provider);


--
-- TOC entry 3799 (class 2606 OID 16603)
-- Name: ranking_value ranking_value_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking_value
    ADD CONSTRAINT ranking_value_pkey PRIMARY KEY (id_ranking_value);


--
-- TOC entry 3784 (class 2606 OID 16517)
-- Name: shop shop_pkey; Type: CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY shop
    ADD CONSTRAINT shop_pkey PRIMARY KEY (id_shop);


--
-- TOC entry 3776 (class 1259 OID 16453)
-- Name: ix_brand_id_origin; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_brand_id_origin ON public.brand USING btree (id_origin);


--
-- TOC entry 3790 (class 1259 OID 16558)
-- Name: ix_carseat_id_brand; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_id_brand ON public.carseat USING btree (id_brand);


--
-- TOC entry 3791 (class 1259 OID 16560)
-- Name: ix_carseat_id_carseat_group; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_id_carseat_group ON public.carseat USING btree (id_carseat_group);


--
-- TOC entry 3792 (class 1259 OID 16559)
-- Name: ix_carseat_id_carseat_type; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_id_carseat_type ON public.carseat USING btree (id_carseat_type);


--
-- TOC entry 3793 (class 1259 OID 16562)
-- Name: ix_carseat_id_child_height_group; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_id_child_height_group ON public.carseat USING btree (id_child_height_group);


--
-- TOC entry 3794 (class 1259 OID 16561)
-- Name: ix_carseat_id_child_weight_group; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_id_child_weight_group ON public.carseat USING btree (id_child_weight_group);


--
-- TOC entry 3787 (class 1259 OID 16526)
-- Name: ix_carseat_listing_id_shop; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_listing_id_shop ON public.carseat_listing USING btree (id_shop);


--
-- TOC entry 3782 (class 1259 OID 16509)
-- Name: ix_carseat_manual_id_carseat; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_manual_id_carseat ON public.carseat_manual USING btree (id_carseat);


--
-- TOC entry 3779 (class 1259 OID 16499)
-- Name: ix_carseat_video_id_carseat; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_carseat_video_id_carseat ON public.carseat_video USING btree (id_carseat);


--
-- TOC entry 3800 (class 1259 OID 16621)
-- Name: ix_ranking_carseat; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_ranking_carseat ON public.ranking USING btree (id_carseat);


--
-- TOC entry 3801 (class 1259 OID 16619)
-- Name: ix_ranking_ranking_provider; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_ranking_ranking_provider ON public.ranking USING btree (id_ranking_provider);


--
-- TOC entry 3802 (class 1259 OID 16620)
-- Name: ix_ranking_ranking_value; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_ranking_ranking_value ON public.ranking USING btree (id_ranking_value);


--
-- TOC entry 3797 (class 1259 OID 16604)
-- Name: ix_ranking_value_ranking_provider; Type: INDEX; Schema: public; Owner: carseatjungle
--

CREATE INDEX ix_ranking_value_ranking_provider ON public.ranking_value USING btree (id_ranking_provider);


--
-- TOC entry 3805 (class 2606 OID 16454)
-- Name: brand fk_brand_origin; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY brand
    ADD CONSTRAINT fk_brand_origin FOREIGN KEY (id_origin) REFERENCES origin(id_origin);


--
-- TOC entry 3811 (class 2606 OID 16573)
-- Name: carseat fk_carseat_brand; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat
    ADD CONSTRAINT fk_carseat_brand FOREIGN KEY (id_brand) REFERENCES brand(id_brand);


--
-- TOC entry 3810 (class 2606 OID 16568)
-- Name: carseat fk_carseat_carseat_group; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat
    ADD CONSTRAINT fk_carseat_carseat_group FOREIGN KEY (id_carseat_group) REFERENCES carseat_group(id_carseat_group);


--
-- TOC entry 3809 (class 2606 OID 16563)
-- Name: carseat fk_carseat_carseat_type; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat
    ADD CONSTRAINT fk_carseat_carseat_type FOREIGN KEY (id_carseat_type) REFERENCES carseat_type(id_carseat_type);


--
-- TOC entry 3813 (class 2606 OID 16583)
-- Name: carseat fk_carseat_child_height_group; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat
    ADD CONSTRAINT fk_carseat_child_height_group FOREIGN KEY (id_child_height_group) REFERENCES child_height_group(id_child_height_group);


--
-- TOC entry 3812 (class 2606 OID 16578)
-- Name: carseat fk_carseat_child_weight_group; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat
    ADD CONSTRAINT fk_carseat_child_weight_group FOREIGN KEY (id_child_weight_group) REFERENCES child_weight_group(id_child_weight_group);


--
-- TOC entry 3808 (class 2606 OID 16538)
-- Name: carseat_listing fk_carseat_listing_carseat; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_listing
    ADD CONSTRAINT fk_carseat_listing_carseat FOREIGN KEY (id_carseat) REFERENCES carseat(id_carseat);


--
-- TOC entry 3807 (class 2606 OID 16543)
-- Name: carseat_manual fk_carseat_manual_carseat; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_manual
    ADD CONSTRAINT fk_carseat_manual_carseat FOREIGN KEY (id_carseat) REFERENCES carseat(id_carseat);


--
-- TOC entry 3806 (class 2606 OID 16548)
-- Name: carseat_video fk_carseat_video_carseat; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY carseat_video
    ADD CONSTRAINT fk_carseat_video_carseat FOREIGN KEY (id_carseat) REFERENCES carseat(id_carseat);


--
-- TOC entry 3817 (class 2606 OID 16632)
-- Name: ranking fk_ranking_carseat; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking
    ADD CONSTRAINT fk_ranking_carseat FOREIGN KEY (id_carseat) REFERENCES carseat(id_carseat);


--
-- TOC entry 3815 (class 2606 OID 16622)
-- Name: ranking fk_ranking_ranking_provider; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking
    ADD CONSTRAINT fk_ranking_ranking_provider FOREIGN KEY (id_ranking_provider) REFERENCES ranking_provider(id_ranking_provider);


--
-- TOC entry 3816 (class 2606 OID 16627)
-- Name: ranking fk_ranking_ranking_value; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking
    ADD CONSTRAINT fk_ranking_ranking_value FOREIGN KEY (id_ranking_value) REFERENCES ranking_value(id_ranking_value);


--
-- TOC entry 3814 (class 2606 OID 16605)
-- Name: ranking_value fk_ranking_value_ranking_provider; Type: FK CONSTRAINT; Schema: public; Owner: carseatjungle
--

ALTER TABLE ONLY ranking_value
    ADD CONSTRAINT fk_ranking_value_ranking_provider FOREIGN KEY (id_ranking_provider) REFERENCES ranking_provider(id_ranking_provider);


--
-- TOC entry 3974 (class 0 OID 0)
-- Dependencies: 3
-- Name: public; Type: ACL; Schema: -; Owner: carseatjungle
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO carseatjungle;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2019-01-07 17:32:13

--
-- PostgreSQL database dump complete
--


