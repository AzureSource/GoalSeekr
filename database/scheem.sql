
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

--Purchases a ship by userID and name of ship (IF AFFORDABLE) and adds it to user_ship db and updates user's currency amount to decrease, then returns:
-- Object with player prop whos properties are prevBal (balance before buying) and newBalance (balance after buying)
-- Insufficient balance message stating how many dollars they are short from purchasing
CREATE OR REPLACE FUNCTION buyShip("userID" int4, "shipname" text)
  RETURNS json AS $func$
DECLARE
RESULT JSON;
currentBalance int;
shipCost int;
BEGIN
		-- Select player's currency and insert it into currentBalance variable
		SELECT currency FROM users WHERE ID = $1 INTO currentBalance;
		-- Select ship's cost and insert it into shipCost variable
		SELECT cost FROM SHIPS WHERE NAME = $2 INTO shipCost;
	-- IF ship cost is less than or equal to players balance
	IF shipCost <= currentBalance
	THEN
		UPDATE users
		  SET currency = ( currency - shipCost )
	  WHERE ID = $1;
		WITH shipinfo AS ( SELECT * FROM SHIPS WHERE NAME = $2 )
    INSERT INTO ships_user ( user_id, user_ship_id, user_ship_name, user_ship_health, user_ship_rangeCapacity, user_ship_powerLevel, user_ship_planet_id, user_ship_galaxy_id )
    VALUES (
        $1,
        ( SELECT ID FROM shipinfo ),
        ( SELECT NAME FROM shipinfo ),
        ( SELECT healthLevel FROM shipinfo ),
        ( SELECT rangeCapacity FROM shipinfo ),
        ( SELECT powerLevel FROM shipinfo ),
        1,
        ( SELECT currentGalaxy FROM users WHERE ID = $1 )
    )
        -- Return an object with player and ship key containing player's previous balance and new balance, along with ship's data
    RETURNING
    json_build_object (
      'player', json_build_object (
        'prevBalance', currentBalance,
        'newBalance', ( SELECT currency FROM users WHERE ID = $1 )
      ),
      'ship', json_build_object (
        'id', ID,
        'galaxyId', user_ship_galaxy_id,
        'planetId', user_ship_planet_id,
        'name', user_ship_name,
        'health', user_ship_health,
        'rangeCapacity', user_ship_rangeCapacity,
        'powerLevel', user_ship_powerLevel
      )
    )
		--place the built obj into the declared result variable
		INTO RESULT;
		--return it
	RETURN RESULT;
	END IF;
	-- Player didnt have enough balance so return an object with a prop called Insufficient balance with a message value that says how much they are short
	RETURN json_build_object('Insufficient Balance', CONCAT('Oops! You are ', abs(currentBalance - shipCost), ' Dollars short!'));
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;

--Assigns a task to a user by ID from the task's name and returns an object containing userID, TaskName, Reward, and Difficulty
CREATE OR REPLACE FUNCTION assignTaskToUser("taskname" text, "userid" int)
  RETURNS json AS $func$
	DECLARE result JSON;
BEGIN
	WITH task AS (SELECT * FROM tasks WHERE description ILIKE $1)
	INSERT INTO tasks_user (task_id, user_id) VALUES ((SELECT id FROM task), $2)
	RETURNING json_build_object('UserID', $2, 'Name', (SELECT description FROM task), 'Reward', (SELECT reward FROM task), 'Difficulty', (SELECT difficulty FROM task)) into result;
	RETURN result;
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;

--Assigns a task to all users if they are not currently assigned said task (by task's name)
CREATE OR REPLACE FUNCTION assignTaskToAllUsers("taskName" text)
  RETURNS text AS $func$
	DECLARE
	  ids int;
		taskID int;
		userCount int := 0;
BEGIN
	SELECT id FROM tasks WHERE description ILIKE $1 into taskID;
  FOR ids in SELECT id from users loop
    raise notice 'userID: %', ids;
	  IF NOT EXISTS (SELECT task_id FROM tasks_user WHERE task_id = taskID AND user_id = ids )
	    THEN
        raise notice 'userID: % does not have this task', ids;
        INSERT INTO tasks_user(user_id, task_id)
        VALUES (ids, (SELECT id FROM tasks WHERE description ILIKE $1));
        userCount = userCount + 1;
        raise notice 'userCount is now: %', userCount;
	  END IF;
  END loop;
	RETURN CONCAT('Assigned task to ', userCount, ' Users');
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;

-- Gets All players ship data by galaxy
CREATE OR REPLACE FUNCTION getPlayerDataByGalaxyID(int4)
  RETURNS json AS $func$
DECLARE
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'Players', JSON_AGG( (SELECT "getusersships"(id)) )
		) as results
	FROM users
	WHERE currentgalaxy = $1
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;

--Gets all chat messages in decending order by galaxyID
CREATE OR REPLACE FUNCTION getChatMessagesByGalaxy("galaxyID" int)
  RETURNS json AS $func$
DECLARE
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'Messages',
		JSON_AGG(
			json_build_object(
				'id', id,
				'userID', user_id,
				'Username', (SELECT username FROM users WHERE id = user_id),
				'message', message,
				'galaxyID', galaxy_id,
				'allianceID', alliance_id,
				'allianceName', (SELECT name FROM alliances WHERE id = alliance_id)
			) ORDER BY chat.id DESC
		)
	) as results
	FROM chat
	WHERE
	galaxy_id = $1
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;