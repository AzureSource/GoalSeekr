
DROP INDEX IF EXISTS users_id_index, users_galaxy_id_index, tasks_user_task_id_index, tasks_user_user_id_index, chat_user_id_index, chat_galaxy_id_index, chat_alliance_id_index, planets_galaxy_planet_id_index, planets_galaxy_galaxy_id_index, planets_galaxy_colonizedBy_index, ships_user_id_index, ships_user_ship_id_index, ships_user_ship_planet_id_index, ships_user_galaxy_id_index;
DROP TABLE IF EXISTS galaxies, users, planets, ships, alliances, tasks, chat, planets_galaxy, ships_user, tasks_user CASCADE;

CREATE TABLE galaxies (
  id serial primary key,
  name text not null,
  yearsPerTurn int not null,
  currentYear int not null,
  maxPlayers int not null,
  currentPlayers int not null default 1
);

CREATE TABLE users (
  id serial primary key,
  username text unique,
  password text,
  motto text,
  about text,
  profile_picture_url text,
  currency int not null default 1000,
  currentGalaxy int references galaxies(id) default null,
  currentAlliance int
);

CREATE TABLE planets (
  id serial primary key,
  name text not null unique
);

CREATE TABLE ships (
  id serial primary key,
  name text not null unique,
  cost integer not null,
  rangeCapacity int not null,
  healthLevel float not null,
  powerLevel int not null
);

CREATE TABLE alliances (
  id serial primary key,
  name text unique,
  memberCount int not null default 1
);

CREATE TABLE tasks (
  id serial primary key,
  description text not null unique,
  reward integer not null,
  difficulty text
);

CREATE TABLE tasks_user (
  id serial primary key,
  user_id int references users(id),
  task_id int references tasks(id)
);

CREATE TABLE chat (
  id serial primary key,
  message text,
  user_id int references users(id),
  galaxy_id int references galaxies(id),
  alliance_id int references alliances(id),
  alliance_Only boolean default false not null
);

CREATE TABLE planets_galaxy (
  id serial primary key,
  planet_id int references planets(id),
  galaxy_id int references galaxies(id),
  colonizedBy int references users(id) default null,
  discoverd bool default false
);

CREATE TABLE ships_user (
  id serial primary key,
  user_id int references users(id),
  user_ship_id int references ships(id),
  user_ship_name text,
  user_ship_health float,
  user_ship_rangeCapacity int not null,
  user_ship_powerLevel int not null,
  user_ship_planet_id int references planets(id),
  user_ship_galaxy_id int references galaxies(id)
);

-- ================================================================= --
-- ================================================================= --
--                          DB INDEXES                               --
--                                                                   --
-- ================================================================= --
-- ================================================================= --

-- users
CREATE INDEX users_id_index
  ON  users(id);

CREATE INDEX users_galaxy_id_index
  ON  users(currentGalaxy);

-- tasks_user
CREATE INDEX tasks_user_task_id_index
  ON  tasks_user(task_id);

CREATE INDEX tasks_user_user_id_index
  ON  tasks_user(user_id);

-- chat
CREATE INDEX chat_user_id_index
  ON chat(user_id);

CREATE INDEX chat_galaxy_id_index
  ON chat(galaxy_id);

CREATE INDEX chat_alliance_id_index
  ON chat(alliance_id);

-- planets_galaxy
CREATE INDEX planets_galaxy_planet_id_index
  ON planets_galaxy(planet_id);

CREATE INDEX planets_galaxy_galaxy_id_index
  ON planets_galaxy(galaxy_id);

CREATE INDEX planets_galaxy_colonizedBy_index
  ON planets_galaxy(colonizedBy);

-- ships_user

CREATE INDEX ships_user_id_index
  ON ships_user(user_id);

CREATE INDEX ships_user_ship_id_index
  ON ships_user(user_ship_id);

CREATE INDEX ships_user_ship_planet_id_index
  ON ships_user(user_ship_planet_id);

CREATE INDEX ships_user_galaxy_id_index
  ON ships_user(user_ship_galaxy_id);

  -- ================================================================= --
-- ================================================================= --
--                        DB FUNCTIONS                               --
--                                                                   --
-- ================================================================= --
-- ================================================================= --

CREATE OR REPLACE FUNCTION getShipStatistics("shipName" text)
  RETURNS json AS $func$
BEGIN
	RETURN (
		SELECT json_build_object (
			'name', name,
			'price', cost,
			'health', healthLevel,
			'range', rangeCapacity,
			'power', powerLevel
		)
		FROM ships
		WHERE name = $1
	);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Gets all a user's ships by their ID and returns an object with ship
CREATE OR REPLACE FUNCTION getUsersShips("userID" int)
  RETURNS json AS $func$
	DECLARE result json;
BEGIN
	WITH grouped AS ( SELECT user_ship_name AS TYPE, json_agg ( row_to_json ( ships_user ) ) Ships FROM ships_user WHERE user_id = $1 GROUP BY 1 )
	SELECT json_build_object('userid', $1, 'Ships', JSON_OBJECT_AGG ( TYPE, ships )) Ships FROM grouped into result;
	RETURN (result);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;