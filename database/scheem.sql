
DROP INDEX IF EXISTS users_id_index, users_galaxy_id_index, tasks_user_task_id_index, tasks_user_user_id_index, chat_user_id_index, chat_galaxy_id_index, chat_alliance_id_index, planets_galaxy_planet_id_index, planets_galaxy_galaxy_id_index, planets_galaxy_colonizedBy_index, ships_user_id_index, ships_user_ship_id_index, ships_user_ship_planet_id_index, ships_user_galaxy_id_index, hats_user_galaxy_id_index, hats_user_hat_id_index, hats_user_user_id_index;
DROP TABLE IF EXISTS galaxies, users, planets, ships, alliances, tasks, chat, planets_galaxy, ships_user, tasks_user, hats, hats_user CASCADE;

CREATE TABLE galaxies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  yearsPerTurn INT NOT NULL,
  currentYear INT NOT NULL,
  maxPlayers INT NOT NULL,
  currentPlayers INT NOT NULL DEFAULT 1,
	allianceAllowed BOOLEAN NOT NULL,
	smallGalaxy BOOLEAN NOT NULL,
	activeuser INT,
	gamestarted BOOLEAN DEFAULT NULL,
	createdby INT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  googleuid TEXT,
	email TEXT,
  motto TEXT,
  about TEXT,
  profile_picture_url TEXT,
  currency INT NOT NULL DEFAULT 1000,
  currentGalaxy INT REFERENCES galaxies(id) DEFAULT NULL,
  currentAlliance INT
);
ALTER TABLE galaxies ADD CONSTRAINT galaxies_activeuser_fkey FOREIGN KEY (activeuser) REFERENCES users(id);
ALTER TABLE galaxies ADD CONSTRAINT galaxies_createdby_fkey FOREIGN KEY (createdby) REFERENCES users(id);

CREATE TABLE planets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE ships (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  cost INT NOT NULL,
  rangeCapacity INT NOT NULL,
  healthLevel FLOAT NOT NULL,
  powerLevel INT NOT NULL
);

CREATE TABLE alliances (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  memberCount INT NOT NULL DEFAULT 1
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL UNIQUE,
  reward INT NOT NULL,
  difficulty TEXT NOT NULL
);

CREATE TABLE tasks_user (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  task_id INT REFERENCES tasks(id),
	isCompleted BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE chat (
  id SERIAL PRIMARY KEY,
  message TEXT,
  user_id INT REFERENCES users(id),
  galaxy_id INT REFERENCES galaxies(id),
  alliance_id INT REFERENCES alliances(id),
  alliance_Only BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE planets_galaxy (
  id SERIAL PRIMARY KEY,
  planet_id INT REFERENCES planets(id),
  galaxy_id INT REFERENCES galaxies(id),
  colonizedBy INT REFERENCES users(id) DEFAULT NULL,
  discoveredBy INT[] DEFAULT NULL
);

CREATE TABLE ships_user (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  user_ship_id INT REFERENCES ships(id),
  user_ship_name TEXT NOT NULL,
  user_ship_health FLOAT NOT NULL,
  user_ship_rangeCapacity INT NOT NULL,
  user_ship_powerLevel INT NOT NULL,
  user_ship_planet_id INT REFERENCES planets(id),
  user_ship_galaxy_id INT REFERENCES galaxies(id)
);

CREATE TABLE hats (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE hats_user (
  id SERIAL PRIMARY KEY,
  galaxy_id INT REFERENCES galaxies(id),
  user_id INT REFERENCES users(id),
	hat_id INT REFERENCES hats(id)
);


-- ================================================================= --
-- ================================================================= --
--                          DB INDEXES                               --
--                                                                   --
-- ================================================================= --
-- ================================================================= --


-- galaxies
CREATE INDEX galaxies_createdby_index
  ON galaxies(createdby);

CREATE INDEX galaxies_activeuser_index
  ON galaxies(createdby);

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

-- hats
CREATE INDEX hat_user_user_id_index
  ON hats_user(user_id);

CREATE INDEX hats_user_galaxy_id_index
  ON hats_user(galaxy_id);

CREATE INDEX hats_user_hat_id_index
  ON hats_user(hat_id);

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


-- gets ship stats by the name of the ship
CREATE OR REPLACE FUNCTION getShipStatistics("shipName" TEXT)
RETURNS JSON AS $func$
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
CREATE OR REPLACE FUNCTION getUsersShips("userID" INT)
RETURNS JSON AS $func$
DECLARE result json;
BEGIN
	WITH grouped AS ( SELECT user_ship_name AS TYPE, json_agg ( row_to_JSON ( ships_user ) ) Ships FROM ships_user WHERE user_id = $1 GROUP BY 1 )
	SELECT json_build_object('userid', $1, 'Ships', JSON_OBJECT_AGG ( TYPE, ships )) Ships FROM grouped INTO result;
	RETURN (result);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Purchases a ship by userID and name of ship (IF AFFORDABLE) and adds it to user_ship db and updates user's currency amount to decrease, then returns:
-- Object with player prop whos properties are prevBal (balance before buying) and newBalance (balance after buying)
-- Insufficient balance message stating how many dollars they are short from purchasing
CREATE OR REPLACE FUNCTION buyShip("userID" INT, "planetID" INT, "shipname" TEXT)
RETURNS JSON AS $func$
DECLARE
RESULT JSON;
currentBalance INT;
shipCost INT;
BEGIN
	-- Select player's currency and insert it into currentBalance variable
	SELECT currency FROM users WHERE ID = $1 INTO currentBalance;
	-- Select ship's cost and insert it into shipCost variable
	SELECT cost FROM SHIPS WHERE NAME = $3 INTO shipCost;
	-- IF ship cost is less than or equal to players balance
	IF shipCost <= currentBalance
	THEN
		UPDATE users
			SET currency = ( currency - shipCost )
		WHERE ID = $1;
		WITH shipinfo AS ( SELECT * FROM SHIPS WHERE NAME = $3 )
		INSERT INTO ships_user ( user_id, user_ship_id, user_ship_name, user_ship_health, user_ship_rangeCapacity, user_ship_powerLevel, user_ship_planet_id, user_ship_galaxy_id )
		VALUES (
			$1,
			( SELECT ID FROM shipinfo ),
			( SELECT NAME FROM shipinfo ),
			( SELECT healthLevel FROM shipinfo ),
			( SELECT rangeCapacity FROM shipinfo ),
			( SELECT powerLevel FROM shipinfo ),
			$2,
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
CREATE OR REPLACE FUNCTION assignTaskToUser("taskname" TEXT, "userid" INT)
RETURNS JSON AS $func$
DECLARE result JSON;
				exists BOOLEAN;
BEGIN
	SELECT id FROM tasks_user WHERE user_id = $2 INTO exists;
	IF NOT exists THEN
		WITH task AS (SELECT * FROM tasks WHERE description ILIKE $1)
		INSERT INTO tasks_user (task_id, user_id) VALUES ((SELECT id FROM task), $2)
		RETURNING json_build_object('UserID', $2, 'Name', (SELECT description FROM task), 'Reward', (SELECT reward FROM task), 'Difficulty', (SELECT difficulty FROM task)) INTO result;
		RETURN result;
	END IF;
	RETURN json_build_object('error', 'Already assigned');
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Assigns a task to all users if they are not currently assigned said task (by task's name)
CREATE OR REPLACE FUNCTION assignTaskToAllUsers("taskName" TEXT)
RETURNS TEXT AS $func$
DECLARE ids INT;
				taskID INT;
				userCount INT := 0;
BEGIN
	SELECT id FROM tasks WHERE description ILIKE $1 INTO taskID;
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

--Gets all chat messages in decending order by galaxyID
CREATE OR REPLACE FUNCTION getChatMessagesByGalaxy("galaxyID" INT)
RETURNS JSON AS $func$
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
	) AS results
	FROM chat
	WHERE
	galaxy_id = $1 AND alliance_only = false
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Gets all Alliance-Only chat messages in a specific galaxy/alliance
CREATE OR REPLACE FUNCTION getChatMessagesByGalaxyAndAlliance("galaxyID" INT, "allianceID" INT)
RETURNS JSON AS $func$
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'Messages', json_agg(
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
	) AS results
	FROM chat
	WHERE
	galaxy_id = $1 AND alliance_only = true AND alliance_id = $2
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- Gets all players's ships on a planet within a galaxy and returns their ships by type with their stats
CREATE OR REPLACE FUNCTION getusershipsonplanet("galaxyID" INT, "planetID" INT)
RETURNS JSON AS $func$
DECLARE RESPONSE JSON;
BEGIN
	WITH grouped AS (
		SELECT
			user_id AS userid,
			user_ship_name AS TYPE,
			json_agg (
				json_build_object (
					'id', ID,
					'health', user_ship_health,
					'range', user_ship_rangecapacity,
					'power', user_ship_powerlevel
				)
			) AS Ships
		FROM ships_user
		WHERE user_ship_galaxy_id = $1 AND user_ship_planet_id = $2
		GROUP BY 1,2
	),
	results AS (
		SELECT
			json_build_object (
				'userid', userid,
				'Ships', JSON_OBJECT_AGG ( TYPE, ships )
			) AS Ships
		FROM grouped
		GROUP BY grouped.userid
	)
	SELECT json_build_object (
			'galaxy', json_build_object ( 'id', $1, 'name', ( SELECT NAME FROM galaxies WHERE ID = $1 ) ),
			'planet', json_build_object ( 'id', $2, 'name', ( SELECT NAME FROM planets WHERE ID = $2 ) ),
			'players', json_agg ( ships )
	)
	FROM results INTO RESPONSE;
	RETURN ( RESPONSE );
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Same as above except the args are by name instead of id
CREATE OR REPLACE FUNCTION getusershipsonplanetbynames("galaxyName" text, "planetName" text)
RETURNS JSON AS $func$
DECLARE RESPONSE JSON;
				galaxyID INT;
				planetID INT;
BEGIN
	SELECT id FROM galaxies WHERE name = $1 INTO galaxyID;
	SELECT id FROM planets WHERE name = $2 INTO planetID;
	WITH grouped AS (
		SELECT
			user_id AS userid,
			user_ship_name AS TYPE,
			json_agg (
				json_build_object (
					'id', ID,
					'health', user_ship_health,
					'range', user_ship_rangecapacity,
					'power', user_ship_powerlevel
				)
			) AS Ships
		FROM ships_user
		WHERE user_ship_galaxy_id = galaxyID AND user_ship_planet_id = planetID
		GROUP BY 1,2
	),
	results AS (
		SELECT
			json_build_object (
				'userid', userid,
				'Ships', JSON_OBJECT_AGG ( TYPE, ships )
			) AS Ships
		FROM grouped
		GROUP BY grouped.userid
	)
	SELECT json_build_object (
			'galaxy', json_build_object ( 'id', galaxyID, 'name', $1 ),
			'planet', json_build_object ( 'id', planetID, 'name', $2 ),
			'players', json_agg ( ships )
		)
	FROM results INTO RESPONSE;
	RETURN ( RESPONSE );
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Create a new user or update a current user's username(display name) by user ID (will be changed upon Google UID implementation)
CREATE OR REPLACE FUNCTION createorupdateuser("googleUID" TEXT, "displayName" TEXT, "email" TEXT, "motto" TEXT, "about" TEXT, "avatarURL" TEXT)
RETURNS json AS $func$
DECLARE result JSON;
				userExists BOOLEAN;
BEGIN
	SELECT EXISTS(SELECT id FROM users WHERE googleuid = $1) INTO userExists;
	IF userExists THEN
		UPDATE users SET username = $2, profile_picture_url = $6 WHERE googleuid = $1;
		SELECT row_to_json(users) FROM users WHERE googleuid = $1 INTO result;
		RETURN result;
	ELSE
	  INSERT INTO users (username, googleuid, email,  motto, about, profile_picture_url, currency)
		VALUES ($2, $1, $3, $4, $5, $6, 10000)
		RETURNING * INTO result;
  END IF;
	RETURN result;
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- gets a user's ships and returns an object with their user id and a ships property with ship type properties and an array of their data
CREATE OR REPLACE FUNCTION getusersships("userID" INT)
RETURNS JSON AS $func$
DECLARE result json;
BEGIN
	WITH grouped AS ( SELECT user_ship_name AS TYPE, json_agg ( row_to_JSON ( ships_user ) ) Ships FROM ships_user WHERE user_id = $1 GROUP BY 1 )
	SELECT json_build_object('userid', $1, 'Ships', JSON_OBJECT_AGG ( TYPE, ships )) Ships FROM grouped INTO result;
	RETURN(result);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- same as above, except Ships are divided into a "byPlanet" division that has types of ships on each planet and their stats (used for gettingplayerData)
CREATE OR REPLACE FUNCTION getusersshipssorted("userID" INT, "byPlanet" boolean)
RETURNS JSON AS $func$
DECLARE result json;
BEGIN
	IF $2 THEN
		WITH shipAggregation AS (
			(SELECT (SELECT name FROM planets WHERE id = ships_user.user_ship_planet_id) AS Planet, user_ship_name AS TYPE, json_agg(row_to_json(ships_user)) Ships FROM ships_user WHERE user_id = $1 GROUP BY planet, TYPE) ORDER BY Planet ASC
			),
			planetAggregation AS (
			(SELECT planet, json_object_agg(type, ships) ships FROM shipAggregation GROUP BY planet)
			)
			SELECT json_object_agg (planet,ships) ships FROM planetAggregation INTO result;
	ELSE
			WITH grouped AS ( SELECT user_ship_name AS TYPE, json_agg ( row_to_JSON ( ships_user ) ) Ships FROM ships_user WHERE user_id = $1 GROUP BY 1 )
			SELECT JSON_OBJECT_AGG ( TYPE, ships ) Ships FROM grouped INTO result;
	END IF;
	RETURN(result);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- gets all a user's data including their ships arranged by type or planet
CREATE OR REPLACE FUNCTION getUserData("userID" INT, "shipsByPlanet?" boolean)
RETURNS JSON AS $func$
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'userid', $1,
		'username', username,
		'googleuid', googleuid,
		'email', email,
		'motto', motto,
		'about', about,
		'currency', currency,
		'avatarURL', profile_picture_url,
		'alliance', json_build_object('id', currentalliance, 'name', (SELECT name FROM alliances WHERE id = currentalliance)),
		'galaxy', json_build_object('id', currentgalaxy, 'name', (SELECT name FROM galaxies WHERE id = currentgalaxy)),
		'ships', (SELECT getusersshipssorted($1, $2)),
		'planetsdiscovered', (SELECT json_agg(planet_id) as discoveredPlanets FROM planets_galaxy WHERE galaxy_id = currentgalaxy AND users.id = ANY(discoveredby)),
		'planetsowned', (SELECT json_agg(planet_id) as colonizedPlanets FROM planets_galaxy WHERE galaxy_id = currentgalaxy AND colonizedby = id)
		) AS results
	FROM users
	WHERE id = $1
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- returns all data of players with ships divided by planet name, divided by ship name/type
CREATE OR REPLACE FUNCTION getplayerdatabygalaxyid("galaxyID" INT, "byPlanet?" boolean)
RETURNS JSON AS $func$
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'id', $1,
		'galaxy', (SELECT name FROM galaxies WHERE id = $1),
		'Players', json_agg(
		json_build_object(
		'userid', id,
		'username', username,
		'googleuid', googleuid,
		'email', email,
		'motto', motto,
		'about', about,
		'currency', currency,
		'avatarURL', profile_picture_url,
		'alliance', json_build_object('id', currentalliance, 'name', (SELECT name FROM alliances WHERE id = currentalliance)),
		'planetsdiscovered', (SELECT json_agg(planet_id) as discoveredPlanets FROM planets_galaxy WHERE galaxy_id = $1 AND users.id = ANY(discoveredby)),
		'planetsowned', (SELECT json_agg(planet_id) as colonizedPlanets FROM planets_galaxy WHERE galaxy_id = $1 AND colonizedby = users.id),
		'ships', (SELECT getusersshipssorted(id, $2))) ORDER BY id ASC)) AS results
	FROM users
	WHERE currentgalaxy = $1
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- Creates a galaxy and returns the newly created galaxy as JSON
CREATE OR REPLACE FUNCTION creategalaxy ("name" TEXT, "yearsPerTurn" INT, "maxPlayers" INT, "allianceallowed" BOOLEAN, "smallgalaxy" BOOLEAN)
RETURNS JSON AS $func$
DECLARE result galaxies%rowtype;
BEGIN
	INSERT INTO galaxies (name, yearsperturn, maxplayers, allianceallowed, smallgalaxy, currentyear, currentplayers)
	VALUES($1, $2,$3, $4, $5, (SELECT extract(year from current_timestamp)), 1)
	RETURNING * INTO result;
	RETURN row_to_json(result);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Toggles a users' completed status on their assigned task and updates their currency to reflect the toggle while returning data
CREATE OR REPLACE FUNCTION toggletaskforuser("userID" INT, "taskID" INT)
RETURNS JSON AS $func$
DECLARE isTaskComplete BOOLEAN;
				currentMoney INT;
				taskreward INT;
BEGIN
	SELECT isCompleted FROM tasks_user WHERE user_id = $1 AND task_id = $2 INTO isTaskComplete;
	SELECT currency FROM users WHERE id = $1 INTO currentMoney;
	SELECT reward FROM tasks WHERE id = $2 INTO taskreward;
	IF isTaskComplete THEN
		RAISE NOTICE 'isTaskComplete?: %', isTaskComplete;
		UPDATE USERS SET currency = currentMoney - taskreward WHERE id = $1;
	ELSE
		RAISE NOTICE 'isTaskComplete?: %', isTaskComplete;
		UPDATE USERS SET currency = currentMoney + taskreward WHERE id = $1;
	END IF;
	UPDATE tasks_user SET isCompleted = NOT isTaskComplete WHERE user_id = $1 AND task_id = $2;
	RETURN (
		SELECT
			json_build_object(
			'userid', $1,
			'previousBalance', currentMoney,
			'newBalance', (SELECT currency FROM users WHERE id = $1),
			'totalTaskRewardGain', (SELECT COALESCE(sum(reward), 0) as Sum from tasks where id in (SELECT task_id FROM tasks_user WHERE user_id = $1 AND iscompleted = true)),
			'taskData', json_build_object(
				'taskid', $2,
				'taskname', (SELECT description FROM tasks WHERE id = $2),
				'reward', taskreward)
			)
	);
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- assigns every task in the db to every user in the db only if the user currently does not have the task assigned to them already
CREATE OR REPLACE FUNCTION assignalltaskstoallusers()
RETURNS text AS $func$
DECLARE ids INT;
				taskID INT;
				userCount INT := 0;
BEGIN
  FOR ids in SELECT id from users loop
    --raise notice 'userID: %', ids;
		--raise notice 'userCount is now: %', userCount;
		FOR taskID in SELECT id from tasks loop
			raise notice 'currentTaskID: %', taskID;
			IF NOT EXISTS (SELECT task_id FROM tasks_user WHERE task_id = taskID AND user_id = ids )
				THEN
					raise notice 'userID: % does not have this task', ids;
					userCount = (userCount + 1);
					INSERT INTO tasks_user(user_id, task_id)
					VALUES (ids, taskID);

			END IF;
		END loop;
  END loop;
	RETURN CONCAT('Assigned allTasks to ', userCount/(SELECT COUNT(tasks) FROM tasks), ' Users');
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- Discovers a planet for a user by userID galaxyID and planetID
CREATE OR REPLACE FUNCTION discoverplanetbygalaxy("userID" INT, "galaxyID" INT, "planetID" INT)
RETURNS JSON AS $func$
DECLARE alreadyDiscovered BOOLEAN;
				correctGalaxy BOOLEAN;
	BEGIN
			SELECT $2 = (SELECT currentgalaxy FROM users WHERE id = $1) INTO correctGalaxy;
			SELECT EXISTS (SELECT user_id FROM (SELECT unnest(discoveredby) as user_id FROM planets_galaxy WHERE planet_id = $3 and galaxy_id = $2) Players WHERE user_id = $1) INTO alreadyDiscovered;
			IF correctGalaxy THEN
				IF NOT alreadyDiscovered THEN
					UPDATE planets_galaxy SET discoveredby = array_append(discoveredby, $1) WHERE planet_id = $3 AND galaxy_id = $2;
					RETURN (SELECT row_to_json(planets_galaxy) FROM planets_galaxy WHERE planet_id = $3 and galaxy_id = $2);
				END IF;
			RETURN (json_build_object('error', 'User already discovered this planet'));
			END IF;
			RETURN (json_build_object('error', 'User is not present in this galaxy'));
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- Same thing as above but galaxy is automatically determined.
CREATE OR REPLACE FUNCTION discoverplanet("userID" INT, "planetID" INT)
RETURNS JSON AS $func$
DECLARE alreadyDiscovered BOOLEAN;
				galaxyID INT;
				planetDataExists BOOLEAN;
				creationResult planets_galaxy%rowtype;
BEGIN
	SELECT currentgalaxy FROM users WHERE id = $1 INTO galaxyID;
	SELECT EXISTS (SELECT planet_id FROM planets_galaxy WHERE planet_id = $2 AND galaxy_id = galaxyID) INTO planetDataExists;
	SELECT EXISTS (SELECT user_id FROM (SELECT unnest(discoveredby) as user_id FROM planets_galaxy WHERE planet_id = $2 and galaxy_id = galaxyID) Players WHERE user_id = $1) INTO alreadyDiscovered;
	IF planetDataExists THEN
		IF NOT alreadyDiscovered THEN
				RAISE NOTICE 'User: % has not disovered planet % in galaxy %', $1, $2, galaxyid;
				UPDATE planets_galaxy SET discoveredby = array_append(discoveredby, $1) WHERE planet_id = $2 AND galaxy_id = galaxyID;
				RETURN (SELECT row_to_json(planets_galaxy) FROM planets_galaxy WHERE planet_id = $2 and galaxy_id = galaxyID);
		END IF;
		RETURN (json_build_object('error', 'User already discovered this planet'));
	ELSE
		INSERT INTO planets_galaxy (planet_id, galaxy_id, discoveredby) VALUES ($2, galaxyID, ARRAY[$1])
		RETURNING * INTO creationResult;
		RETURN row_to_json(creationResult);
	END IF;

END
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- Updates the colonizedby field for a planet in planets_galaxy to be the passed in user
CREATE OR REPLACE FUNCTION colonizeplanet("userID" INT, "planetID" INT)
RETURNS json AS $func$
DECLARE alreadyDiscovered boolean;
				galaxyID int;
				planetDataExists boolean;
				creationResult planets_galaxy%rowtype;
BEGIN
	SELECT currentgalaxy FROM users WHERE id = $1 INTO galaxyID;
	SELECT EXISTS (SELECT planet_id FROM planets_galaxy WHERE planet_id = $2 AND galaxy_id = galaxyID) INTO planetDataExists;
	SELECT EXISTS (SELECT user_id FROM (SELECT unnest(discoveredby) as user_id FROM planets_galaxy WHERE planet_id = $2 and galaxy_id = galaxyID) Players WHERE user_id = $1) INTO alreadyDiscovered;
	IF planetDataExists THEN
		IF alreadyDiscovered THEN
				UPDATE planets_galaxy
				SET colonizedby=$1
				WHERE galaxy_id=galaxyID AND planet_id = $2;
				RETURN (SELECT row_to_json(planets_galaxy) FROM planets_galaxy WHERE planet_id = $2 AND galaxy_id = galaxyID);
		ELSE
				RAISE NOTICE 'User: % has not disovered planet % in galaxy %', $1, $2, galaxyid;
				RETURN (json_build_object('error', 'User has not discovered this planet'));
		END IF;
	END IF;
	RETURN (json_build_object('error', CONCAT('Data does not exist for planet:', $2, ' in galaxy:', galaxyID)));
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;


-- Handles transportation of ships between owned planets, Battle logic/reward , and colonizations
CREATE OR REPLACE FUNCTION attackandcolonizeplanet("userID" INT, "planetID" INT, "shipIds" INT[])
RETURNS JSON AS $func$
DECLARE alreadyDiscovered BOOLEAN;
				galaxyID INT;
				planetDataExists BOOLEAN;
				creationResult planets_galaxy%rowtype;
				planetOwner INT;
				userSentMotherShip BOOLEAN;
				shipsOnPlanet BOOLEAN;
				userTotalPower FLOAT;
				enemyTotalPower FLOAT;
				startingPlanetID INT;
				shipId INT;
				totalPowerLevel INT;
				cummulative INT := 0;
				userShipsLost INT;
				userShipCount INT;
				enemyShipCount INT;
				enemyShipsDestroyed INT;
				currentBalance INT;
				currentEnemyBalance INT;
BEGIN
	SELECT (SELECT COUNT(*) FROM (SELECT UNNEST($3)) result) INTO userShipCount;
	RAISE NOTICE 'USER SHIP COUNT: %', enemyShipCount;
	SELECT currentgalaxy FROM users WHERE id = $1 INTO galaxyID;
	RAISE NOTICE 'currentGalaxy: %', galaxyID;
	SELECT currency FROM users where id = $1 INTO currentBalance;
	SELECT user_ship_planet_id FROM ships_user WHERE id IN (SELECT UNNEST($3)) INTO startingPlanetID;
	SELECT EXISTS (SELECT planet_id FROM planets_galaxy WHERE planet_id = $2 AND galaxy_id = galaxyID) INTO planetDataExists;
	SELECT EXISTS (SELECT user_id FROM (SELECT unnest(discoveredby) as user_id FROM planets_galaxy WHERE planet_id = $2 and galaxy_id = galaxyID) Players WHERE user_id = $1) INTO alreadyDiscovered;
	SELECT colonizedby FROM planets_galaxy WHERE planet_id = $2 and galaxy_id = galaxyID INTO planetOwner;
	SELECT EXISTS(SELECT id FROM ships_user WHERE user_ship_name = 'Mothership' AND id IN (SELECT UNNEST($3))) INTO userSentMotherShip;
	SELECT EXISTS(SELECT user_ship_name FROM ships_user WHERE user_ship_galaxy_id = galaxyID AND user_ship_planet_id = $2) INTO shipsOnPlanet;
	RAISE NOTICE 'planetDataExists?: %', planetDataExists;
	RAISE NOTICE	'alreadyDiscovered?: %', alreadyDiscovered;
	RAISE NOTICE	'planetOwnerID?: %', planetOwner;
	RAISE NOTICE	'userSentMothership?: %', userSentMotherShip;
	IF planetDataExists THEN
		IF alreadyDiscovered THEN
			IF planetOwner IS NULL THEN
				IF userSentMothership THEN
					UPDATE planets_galaxy SET colonizedby=$1 WHERE galaxy_id=galaxyID AND planet_id = $2;
					UPDATE ships_user SET user_ship_planet_id = $2 WHERE id IN (SELECT UNNEST($3));
					--RETURN (SELECT row_to_json(planets_galaxy) FROM planets_galaxy WHERE planet_id = $2 AND galaxy_id = galaxyID);
					RETURN (
							json_build_object(
															'attacker', json_build_object(
															'action', 'colonize',
															'results', 'victory',
															'userid', $1,
															'planetid', $2,
															'galaxyid', galaxyID,
															'enemy_id', null,
															'enemy_name', null,
															'colonized', true,
															'shipssent', userShipCount,
															'shipslost', 0,
															'moneyearned', 0
															)
							)
					);
				ELSE
						RETURN (json_build_object('error', 'Please send a mothership to colonize this planet!, returning to base'));
				END IF;
			ELSE
				SELECT COUNT(*) FROM SHIPS_USER WHERE user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID INTO enemyShipCount;
				RAISE NOTICE 'Planet owner is % ', planetOwner;
				SELECT SUM(user_ship_powerlevel * user_ship_health) FROM ships_user WHERE user_id = $1 AND user_ship_galaxy_id = galaxyID AND id IN (SELECT UNNEST($3)) INTO userTotalPower;
				SELECT SUM(user_ship_powerlevel * user_ship_health) FROM ships_user WHERE user_id = planetOwner AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID INTO enemyTotalPower;
				RAISE NOTICE 'shipsOnPlanet?: %', shipsOnPlanet;
				RAISE NOTICE 'yourTotalPower: %', userTotalPower;
				RAISE NOTICE 'enemyTotalPower: %', enemyTotalPower;
				IF enemyTotalPower IS NOT NULL THEN
						IF planetOwner = $1 THEN --this is your planet, just move to it
								UPDATE planets_galaxy SET colonizedby=$1 WHERE galaxy_id=galaxyID AND planet_id = $2;
								UPDATE ships_user SET user_ship_planet_id = $2 WHERE id IN (SELECT UNNEST($3));
								SELECT COUNT(*) FROM SHIPS_USER WHERE user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID INTO enemyShipCount;
								--RETURN (SELECT row_to_json(planets_galaxy) FROM planets_galaxy WHERE planet_id = $2 AND galaxy_id = galaxyID);
								RAISE NOTICE 'THIS IS YOUR PLANET WITH SHIPS ON IT';
								RETURN (
								json_build_object(
																'attacker', json_build_object(
																'action', 'transport',
																'results', 'success',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', null,
																'enemy_name', null,
																'colonized', true,
																'shipssent', userShipCount,
																'shipsleftstationed', (SELECT COUNT(*) FROM SHIPS_USER WHERE user_ship_planet_id = startingPlanetID AND user_ship_galaxy_id = galaxyID),
																'shipsonnewplanet', enemyShipCount,
																'shipslost', 0,
																'moneyearned', 0
																)
								)
						);
						ELSE
							SELECT currency FROM users where id = planetOwner INTO currentEnemyBalance;
							RAISE NOTICE 'EnemyShipCount: %', enemyShipCount;
							IF userTotalPower < enemyTotalPower THEN
									RAISE NOTICE 'You have lost this fight';
									DELETE FROM ships_user WHERE id IN (SELECT UNNEST($3));
									UPDATE users SET currency = currency + userTotalPower WHERE id = planetOwner;
									for shipid, totalpowerlevel in SELECT id, user_ship_powerlevel * user_ship_health FROM ships_user WHERE user_id = planetOwner AND user_ship_galaxy_id = galaxyID AND user_ship_planet_id = $2 ORDER BY user_ship_id loop
														cummulative = cummulative + totalpowerlevel;
														raise notice 'ship: %', shipid;
														raise notice 'power: %', totalpowerlevel;
														raise notice 'total: %', cummulative;
														IF cummulative < (SELECT ROUND(enemyTotalPower - (enemyTotalPower - userTotalPower)))  THEN
																DELETE FROM ships_user WHERE id = shipid;
																RAISE NOTICE '^^deleted^^';
														END IF;
												end loop;
									IF userSentMothership THEN
									RETURN (
												json_build_object(
																'attacker', json_build_object(
																'action', 'colonize',
																'results', 'defeat',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', planetOwner,
																'enemy_name', (SELECT username FROM users WHERE id = planetOwner),
																'colonized', true,
																'shipssent', userShipCount,
																'shipslost', userShipCount,
																'remainingships', 0,
																'previousbalance', currentBalance,
																'newbalance', currentBalance,
																'moneyearned', 0
																),
																'defense',json_build_object(
																'results', 'victory',
																'userid', planetowner,
																'ownership_lost', false,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', $1,
																'enemy_name', (SELECT username FROM users WHERE id = $1),
																'shipsstationed', enemyShipCount,
																'shipslost', enemyShipCount - (SELECT COUNT(*) FROM SHIPS_USER WHERE user_id = planetOwner AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID),
																'remainingships', (SELECT JSON_AGG(id) FROM SHIPS_USER WHERE user_id = planetOwner AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID),
																'previousbalance', currentEnemyBalance,
																'newbalance', currentEnemyBalance + userTotalPower,
																'moneyearned', userTotalPower
																)
												)
									);
								ELSE
										RETURN (
												json_build_object(
																'attacker', json_build_object(
																'action', 'attack',
																'results', 'defeat',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', planetOwner,
																'enemy_name', (SELECT username FROM users WHERE id = planetOwner),
																'colonized', true,
																'shipssent', userShipCount,
																'shipslost', userShipCount,
																'remainingships', 0,
																'previousbalance', currentBalance,
																'newbalance', currentBalance,
																'moneyearned', 0
																),

																'defense',json_build_object(
																'results', 'victory',
																'userid', planetowner,
																'ownership_lost', false,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', $1,
																'enemy_name', (SELECT username FROM users WHERE id = $1),
																'shipsstationed', enemyShipCount,
																'shipslost', enemyShipCount - (SELECT COUNT(*) FROM SHIPS_USER WHERE user_id = planetOwner AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID),
																'remainingships', (SELECT JSON_AGG(id) FROM SHIPS_USER WHERE user_id = planetOwner AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID),
																'previousbalance', currentEnemyBalance,
																'newbalance', currentEnemyBalance + userTotalPower,
																'moneyearned', userTotalPower
																)
												)
									);
								END IF;
								ELSIF userTotalPower > enemyTotalPower THEN -- your power is higher than
									RAISE NOTICE 'You have won this fight';
										DELETE FROM ships_user WHERE user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID AND user_id = planetOwner;
										UPDATE users SET currency = currency + enemyTotalPower WHERE id = $1;
										FOR shipid, totalpowerlevel in SELECT id, user_ship_powerlevel * user_ship_health FROM ships_user WHERE user_id = $1 AND user_ship_galaxy_id = galaxyID AND user_ship_planet_id = startingPlanetID ORDER BY user_ship_id loop
														cummulative = cummulative + totalpowerlevel;
														raise notice 'ship: %', shipid;
														raise notice 'power: %', totalpowerlevel;
														raise notice 'total: %', cummulative;
														IF cummulative < (SELECT ROUND(userTotalPower - (userTotalPower - enemyTotalPower))) THEN
																DELETE FROM ships_user WHERE id = shipid;
																RAISE NOTICE '^^deleted^^';
														END IF;
											end loop;
										IF userSentMothership THEN
											UPDATE planets_galaxy SET colonizedby=$1 WHERE galaxy_id=galaxyID AND planet_id = $2;
											UPDATE ships_user SET user_ship_planet_id = $2 WHERE id IN (SELECT UNNEST($3));
												RETURN (
																json_build_object(
																'attacker', json_build_object(
																'action', 'colonize',
																'results', 'victory',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', planetOwner,
																'enemy_name', (SELECT username FROM users WHERE id = planetOwner),
																'colonized', true,
																'shipssent', userShipCount,
																'shipslost', userShipCount - (SELECT COUNT(*) FROM SHIPS_USER WHERE user_id = $1 AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID),
																'remainingships', (SELECT JSON_AGG(id) FROM SHIPS_USER WHERE user_id = $1 AND user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID),
																'previousbalance', currentBalance,
																'newbalance', currentBalance + enemyTotalPower,
																'moneyearned', enemyTotalPower
																),

																'defense',json_build_object(
																'results', 'defeat',
																'userid', planetowner,
																'ownership_lost', true,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', $1,
																'enemy_name', (SELECT username FROM users WHERE id = $1),
																'shipsstationed', enemyShipCount,
																'shipslost', enemyShipCount,
																'remainingships', 0
																))
												);
										ELSE
											RETURN (
															json_build_object(
																'attacker', json_build_object(
																'action', 'attack',
																'results', 'victory',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', planetOwner,
																'enemy_name', (SELECT username FROM users WHERE id = planetOwner),
																'planet_owner_id', planetOwner,
																'planet_owner_name', (SELECT username FROM users WHERE id = planetOwner),
																'colonized', false,
																'shipssent', userShipCount,
																'shipslost', userShipCount - (SELECT COUNT(*) FROM SHIPS_USER WHERE user_id = $1 AND user_ship_planet_id = startingPlanetID AND user_ship_galaxy_id = galaxyID),
																'remainingships', (SELECT JSON_AGG(id) FROM SHIPS_USER WHERE user_id = $1 AND user_ship_planet_id = startingPlanetID AND user_ship_galaxy_id = galaxyID),
																'previousbalance', currentBalance,
																'newbalance', currentBalance + enemyTotalPower,
																'moneyearned', enemyTotalPower
																),

																'defense',json_build_object(
																'results', 'defeat',
																'userid', planetowner,
																'ownership_lost', false,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', $1,
																'enemy_name', (SELECT username FROM users WHERE id = $1),
																'shipsstationed', enemyShipCount,
																'shipslost', enemyShipCount,
																'remainingships', 0
																)
															)
														);
										END IF;
								ELSIF userTotalPower = enemyTotalPower THEN
									RAISE NOTICE 'Same amount of power';
									RETURN (json_build_object('Tie', 'We Flip a coin here'));
								END IF;
						END IF;
				ELSE -- There are no ships on a colonized planet
					IF planetOwner = $1 THEN --this is your planet, just move to it
						UPDATE planets_galaxy SET colonizedby=$1 WHERE galaxy_id=galaxyID AND planet_id = $2;
						UPDATE ships_user SET user_ship_planet_id = $2 WHERE id IN (SELECT UNNEST($3));
						SELECT COUNT(*) FROM SHIPS_USER WHERE user_ship_planet_id = $2 AND user_ship_galaxy_id = galaxyID INTO enemyShipCount;
							RETURN (json_build_object(
																'attacker', json_build_object(
																'action', 'transport',
																'results', 'success',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', null,
																'enemy_name', null,
																'colonized', true,
																'shipssent', userShipCount,
																'shipsleftstationed', (SELECT COUNT(*) FROM SHIPS_USER WHERE user_ship_planet_id = startingPlanetID AND user_ship_galaxy_id = galaxyID),
																'shipsonnewplanet', enemyShipCount,
																'shipslost', 0,
																'moneyearned', 0
																)
												)
							);
					ELSE
						IF userSentMothership THEN
								UPDATE planets_galaxy SET colonizedby=$1 WHERE galaxy_id=galaxyID AND planet_id = $2;
								UPDATE ships_user SET user_ship_planet_id = $2 WHERE id IN (SELECT UNNEST($3));
								RETURN (
										json_build_object(
																'attacker', json_build_object(
																'action', 'colonize',
																'results', 'victory',
																'userid', $1,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', planetOwner,
																'enemy_name', (SELECT username FROM users WHERE id = planetOwner),
																'colonized', true,
																'shipssent', userShipCount,
																'shipslost', 0,
																'remainingships', $3,
																'previousbalance', currentBalance,
																'newbalance', currentBalance,
																'moneyearned', 0
																),

																'defense',json_build_object(
																'results', 'defeat',
																'userid', planetowner,
																'ownership_lost', true,
																'planetid', $2,
																'galaxyid', galaxyID,
																'enemy_id', $1,
																'enemy_name', (SELECT username FROM users WHERE id = $1),
																'shipsstationed', 0,
																'shipslost', 0,
																'remainingships', 0
																)


												)
								);
						ELSE
							RETURN (json_build_object('error', 'Please send a mothership to colonize this planet!, Returning to base.'));
						END IF;
					END IF;
				END IF;
				RETURN (json_build_object('error', 'This planet is already colonized'));
			END IF;
		ELSE
				RAISE NOTICE 'User: % has not disovered planet % in galaxy %', $1, $2, galaxyid;
				RETURN (json_build_object('error', 'User has not discovered this planet'));
		END IF;
	END IF;
	RETURN (json_build_object('error', CONCAT('Data does not exist for planet:', $2, ' in galaxy:', galaxyID)));
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;
