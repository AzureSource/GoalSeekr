
DROP INDEX IF EXISTS users_id_index, users_galaxy_id_index, tasks_user_task_id_index, tasks_user_user_id_index, chat_user_id_index, chat_galaxy_id_index, chat_alliance_id_index, planets_galaxy_planet_id_index, planets_galaxy_galaxy_id_index, planets_galaxy_colonizedBy_index, ships_user_id_index, ships_user_ship_id_index, ships_user_ship_planet_id_index, ships_user_galaxy_id_index;
DROP TABLE IF EXISTS galaxies, users, planets, ships, alliances, tasks, chat, planets_galaxy, ships_user, tasks_user CASCADE;

CREATE TABLE galaxies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  yearsPerTurn INT NOT NULL,
  currentYear INT NOT NULL,
  maxPlayers INT NOT NULL,
  currentPlayers INT NOT NULL DEFAULT 1
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  googleuid TEXT,
	email TEXT,
  motto TEXT,
  about TEXT,
  profile_picture_url TEXT,
  currency INT NOT NULL DEFAULT 1000,
  currentGalaxy INT REFERENCES galaxies(id) DEFAULT NULL,
  currentAlliance INT
);

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
  name TEXT UNIQUE,
  memberCount INT NOT NULL DEFAULT 1
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL UNIQUE,
  reward INT NOT NULL,
  difficulty TEXT
);

CREATE TABLE tasks_user (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  task_id INT REFERENCES tasks(id)
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
  discoverd BOOLEAN DEFAULT false
);

CREATE TABLE ships_user (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  user_ship_id INT REFERENCES ships(id),
  user_ship_name TEXT,
  user_ship_health FLOAT,
  user_ship_rangeCapacity INT NOT NULL,
  user_ship_powerLevel INT NOT NULL,
  user_ship_planet_id INT REFERENCES planets(id),
  user_ship_galaxy_id INT REFERENCES galaxies(id)
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
CREATE OR REPLACE FUNCTION buyShip("userID" INT, "shipname" TEXT)
  RETURNS JSON AS $func$
DECLARE
RESULT JSON;
currentBalance INT;
shipCost INT;
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
CREATE OR REPLACE FUNCTION assignTaskToUser("taskname" TEXT, "userid" INT)
  RETURNS JSON AS $func$
	DECLARE result JSON;
BEGIN
	WITH task AS (SELECT * FROM tasks WHERE description ILIKE $1)
	INSERT INTO tasks_user (task_id, user_id) VALUES ((SELECT id FROM task), $2)
	RETURNING json_build_object('UserID', $2, 'Name', (SELECT description FROM task), 'Reward', (SELECT reward FROM task), 'Difficulty', (SELECT difficulty FROM task)) INTO result;
	RETURN result;
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Assigns a task to all users if they are not currently assigned said task (by task's name)
CREATE OR REPLACE FUNCTION assignTaskToAllUsers("taskName" TEXT)
  RETURNS TEXT AS $func$
	DECLARE
	  ids INT;
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


-- Gets All players ship data by galaxy
CREATE OR REPLACE FUNCTION getPlayerDataByGalaxyID(INT)
  RETURNS JSON AS $func$
DECLARE
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'Players', JSON_AGG( (SELECT "getusersships"(id)) )
		) AS results
	FROM users
	WHERE currentgalaxy = $1
);
END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;


--Gets all chat messages in decending order by galaxyID
CREATE OR REPLACE FUNCTION getChatMessagesByGalaxy("galaxyID" INT)
  RETURNS JSON AS $func$
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
DECLARE
BEGIN
	RETURN (
	SELECT
	json_build_object(
		'Messages',
		json_agg(
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
		FROM
			ships_user
		WHERE
			user_ship_galaxy_id = $1
			AND user_ship_planet_id = $2
		GROUP BY
			1,
			2
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
		SELECT
		  json_build_object (
				'galaxy', json_build_object ( 'id', $1, 'name', ( SELECT NAME FROM galaxies WHERE ID = $1 ) ),
				'planet', json_build_object ( 'id', $2, 'name', ( SELECT NAME FROM planets WHERE ID = $2 ) ),
				'players', json_agg ( ships )
			)
		FROM results INTO RESPONSE;
	RETURN ( RESPONSE );

END;
$func$ LANGUAGE plpgsql VOLATILE COST 100;

--Create a new user or update a current user's username(display name) by user ID (will be changed upon Google UID implementation)
CREATE OR REPLACE FUNCTION createorupdateuser("googleUID" INT, "displayName" TEXT, "email" TEXT, "motto" TEXT, "about" TEXT, "avatarURL" TEXT)
  RETURNS json AS $func$
  DECLARE result JSON;
	userExists BOOLEAN;
BEGIN
	SELECT EXISTS(SELECT id FROM users WHERE googleuid = $1) INTO userExists;
	IF userExists THEN
		UPDATE users SET username = $2 WHERE googleuid = $1;
		SELECT row_to_json(users) FROM users WHERE googleuid = $1 INTO result;
		RETURN result;
	ELSE
	  INSERT INTO users (username, googleuid, email,  motto, about, profile_picture_url, currency, currentgalaxy)
		VALUES ($2, $1, $3, $4, $5, $6, 10000, 1)
		RETURNING * INTO result;
  END IF;
	RETURN result;
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;

-- ================================================================= --
-- ================================================================= --
--                        DB FUNCTION TO POPULATE DB                 --
-- 100 USERS, 8 PLANETS, 8 GALAXIES, 4 TASKS, 8 ALLIANCES, 200 MSGS  --
-- ================================================================= --
-- ================================================================= --

CREATE OR REPLACE FUNCTION populateDatabase()
  RETURNS void AS $func$
BEGIN
  --galaxies
do $$
begin
   for num in 1..10 loop
   INSERT INTO galaxies (name, yearsperturn, currentyear, maxplayers, currentplayers) VALUES (CONCAT('Galaxy', num), 20, 2020, 12, 0);
   raise notice 'Galaxy% Inserted', num;
   end loop;
end; $$;

--planets
INSERT INTO planets (name) VALUES ('Mars');
INSERT INTO planets (name) VALUES ('Jupiter');
INSERT INTO planets (name) VALUES ('Saturn');
INSERT INTO planets (name) VALUES ('Earth');
INSERT INTO planets (name) VALUES ('Pluto');
INSERT INTO planets (name) VALUES ('Venus');
INSERT INTO planets (name) VALUES ('Neptune');
INSERT INTO planets (name) VALUES ('Mercury');

--ships
INSERT INTO ships (name, cost, rangecapacity, healthlevel, powerlevel) VALUES ('Scout', 2000, 500, '100', 2);
INSERT INTO ships (name, cost, rangecapacity, healthlevel, powerlevel) VALUES ('Fighter', 2000, 200, '100', 5);
INSERT INTO ships (name, cost, rangecapacity, healthlevel, powerlevel) VALUES ('Tank', 2500, 200, '150', 3);
INSERT INTO ships ( name, cost, rangecapacity, healthlevel, powerlevel) VALUES ('Mothership', 4500, 600, '100', 1);

--users (generate 100 in random galaxies from 1-5)
do $$
declare isInAlliance boolean := false;
declare allianceID int := null;
begin
   for num in 1..100 loop
	 	SELECT floor(random() * 2) = 1 INTO isInAlliance;
		raise notice 'Alliance %', isInAlliance;
		IF isInAlliance THEN
			SELECT floor(random() * 8 + 1) INTO allianceID;
			raise notice 'AllianceID is %', allianceID;
		ELSE
			allianceID := null;
			raise notice 'AllianceID is %', allianceID;
		END IF;
		INSERT INTO users (username, googleuid, email, motto, about, profile_picture_url, currency, currentgalaxy, currentAlliance) VALUES (CONCAT('User', num), CONCAT('googleuid', num), CONCAT('user', num, '@gmail.com'), 'hi', 'yolo', 'imgur.com/image', 20000, (SELECT floor(random() * 10 + 1)), allianceID);
    raise notice 'User% Inserted', num;
   end loop;
end; $$;

--tasks

INSERT INTO tasks (description, reward, difficulty) VALUES ('Go outside', 1000, 'Hard');
INSERT INTO tasks (description, reward, difficulty) VALUES ('Finish BlueOcean', 50000, 'Impossible');
INSERT INTO tasks (description, reward, difficulty) VALUES ('Eat dinner', 100, 'Easy');
INSERT INTO tasks (description, reward, difficulty) VALUES ('Learn about recursion', 5000, 'Medium');

--alliances

INSERT INTO alliances (id, name, membercount) VALUES (1, 'Luanda', 0);
INSERT INTO alliances (id, name, membercount) VALUES (2, 'Tunis', 0);
INSERT INTO alliances (id, name, membercount) VALUES (3, 'Banjul', 0);
INSERT INTO alliances (id, name, membercount) VALUES (4, 'Bamako', 0);
INSERT INTO alliances (id, name, membercount) VALUES (5, 'Ashgabat', 0);
INSERT INTO alliances (id, name, membercount) VALUES (6, 'Tokyo', 0);
INSERT INTO alliances (id, name, membercount) VALUES (7, 'Nagoya', 0);
INSERT INTO alliances (id, name, membercount) VALUES (8, 'Wellington', 0);

--chat
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (1, 'Champions keep playing until they get it right.', 9, 7, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (2, 'Anyone who has ever made anything of importance was disciplined. The Information Pane shows the detailed object information, project                  ', 24, 7, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (3, 'The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance.', 56, 3, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (4, 'The first step is as good as half over. After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat                   ', 27, 2, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (5, 'I may not have gone where I intended to go, but I think I have ended up where I needed to be. I may not have gone where I intended                    ', 47, 4, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (6, 'All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration.', 7, 2, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (7, 'Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle                   ', 35, 10, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (8, 'Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find                   ', 58, 1, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (9, 'Navicat provides a wide range advanced features, such as compelling code editing capabilities, smart code-completion, SQL formatting, and more.', 99, 5, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (10, 'Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring           ', 23, 2, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (11, 'If opportunity doesn’t knock, build a door. The reason why a great man is great is that he resolves to be a great man.', 93, 6, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (12, 'Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet.', 65, 7, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (13, 'The first step is as good as half over. Anyone who has ever made anything of importance was disciplined.', 96, 7, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (14, 'SSH serves to prevent such vulnerabilities and allows you to access a remote server''s shell without compromising security.', 6, 6, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (15, 'How we spend our days is, of course, how we spend our lives. There is no way to happiness. Happiness is the way. HTTP Tunneling is                    ', 21, 5, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (16, 'To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window.', 79, 8, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (17, 'The first step is as good as half over. Creativity is intelligence having fun. Sometimes you win, sometimes you learn.', 32, 8, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (18, 'SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. The Information Pane shows the detailed object               ', 98, 9, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (19, 'Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and                 ', 3, 6, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (20, 'You will succeed because most people are lazy. A comfort zone is a beautiful place, but nothing ever grows there. You cannot save people,             ', 6, 1, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (21, 'Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files                   ', 16, 7, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (22, 'Typically, it is employed as an encrypted version of Telnet.', 42, 5, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (23, 'You cannot save people, you can just love them. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://)           ', 59, 7, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (24, 'Anyone who has never made a mistake has never tried anything new. If it scares you, it might be a good thing to try.', 46, 5, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (25, 'HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does.         ', 25, 10, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (26, 'To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab.', 13, 2, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (27, 'To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source.', 92, 8, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (28, 'Difficult circumstances serve as a textbook of life for people. If your Internet Service Provider (ISP) does not provide direct access                ', 75, 3, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (29, 'To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and                  ', 77, 3, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (30, 'What you get by achieving your goals is not as important as what you become by achieving your goals.', 62, 9, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (31, 'You will succeed because most people are lazy.', 70, 6, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (32, 'The reason why a great man is great is that he resolves to be a great man. If your Internet Service Provider (ISP) does not provide                   ', 94, 6, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (33, 'Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle                   ', 7, 6, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (34, 'Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences.', 52, 8, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (35, 'The reason why a great man is great is that he resolves to be a great man. You can select any connections, objects or projects, and                   ', 45, 6, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (36, 'To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source.', 65, 8, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (37, 'Navicat Monitor requires a repository to store alerts and metrics for historical analysis. You cannot save people, you can just love them.', 99, 10, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (38, 'Optimism is the one quality more associated with success and happiness than any other. Export Wizard allows you to export data from                   ', 18, 5, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (39, 'To connect to a database or schema, simply double-click it in the pane.', 53, 4, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (40, 'Difficult circumstances serve as a textbook of life for people. Champions keep playing until they get it right.', 38, 2, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (41, 'You must be the change you wish to see in the world.', 41, 8, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (42, 'How we spend our days is, of course, how we spend our lives.', 80, 5, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (43, 'It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling),                    ', 67, 9, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (44, 'The On Startup feature allows you to control what tabs appear when you launch Navicat. Monitored servers include MySQL, MariaDB and                   ', 34, 5, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (45, 'To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window.', 97, 7, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (46, 'You will succeed because most people are lazy. Navicat Cloud provides a cloud service for synchronizing connections, queries, model                   ', 35, 2, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (47, 'You will succeed because most people are lazy.', 41, 10, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (48, 'Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers               ', 94, 9, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (49, 'Typically, it is employed as an encrypted version of Telnet. You cannot save people, you can just love them.', 72, 2, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (50, 'Typically, it is employed as an encrypted version of Telnet.', 62, 2, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (51, 'All journeys have secret destinations of which the traveler is unaware.', 14, 10, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (52, 'It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough                   ', 16, 9, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (53, 'It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling),                    ', 56, 9, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (54, 'Navicat 15 has added support for the system-wide dark mode.', 97, 8, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (55, 'To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window.', 49, 4, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (56, 'A man’s best friends are his ten fingers.', 88, 6, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (57, 'Champions keep playing until they get it right.', 94, 3, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (58, 'How we spend our days is, of course, how we spend our lives.', 88, 4, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (59, 'Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring           ', 27, 2, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (60, 'Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files                   ', 2, 6, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (61, 'It wasn’t raining when Noah built the ark.', 42, 3, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (62, 'To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information                ', 75, 3, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (63, 'Flexible settings enable you to set up a custom key for comparison and synchronization.', 41, 5, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (64, 'To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source.', 81, 6, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (65, 'There is no way to happiness. Happiness is the way. Flexible settings enable you to set up a custom key for comparison and synchronization.', 78, 8, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (66, 'Optimism is the one quality more associated with success and happiness than any other. A man’s best friends are his ten fingers.', 94, 4, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (67, 'I destroy my enemies when I make them my friends.', 11, 5, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (68, 'The first step is as good as half over. If it scares you, it might be a good thing to try. To get a secure connection, the first thing                ', 10, 6, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (69, 'If you wait, all that happens is you get older.', 3, 8, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (70, 'To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external             ', 86, 3, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (71, 'The reason why a great man is great is that he resolves to be a great man.', 92, 5, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (72, 'Anyone who has ever made anything of importance was disciplined.', 76, 7, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (73, 'If opportunity doesn’t knock, build a door.', 41, 6, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (74, 'The On Startup feature allows you to control what tabs appear when you launch Navicat.', 85, 3, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (75, 'I may not have gone where I intended to go, but I think I have ended up where I needed to be. You can select any connections, objects                 ', 88, 5, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (76, 'The reason why a great man is great is that he resolves to be a great man. You can select any connections, objects or projects, and                   ', 80, 2, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (77, 'It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough                   ', 7, 4, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (78, 'You must be the change you wish to see in the world. A man is not old until regrets take the place of dreams.', 99, 2, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (79, 'The Synchronize to Database function will give you a full picture of all database differences.', 88, 10, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (80, 'Instead of wondering when your next vacation is, maybe you should set up a life you don’t need to escape from.', 1, 4, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (81, 'You must be the change you wish to see in the world.', 40, 4, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (82, 'Creativity is intelligence having fun. Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed                   ', 35, 4, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (83, 'You must be the change you wish to see in the world.', 100, 6, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (84, 'Flexible settings enable you to set up a custom key for comparison and synchronization.', 44, 4, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (85, 'To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source.', 43, 9, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (86, 'Such sessions are also susceptible to session hijacking, where a malicious user takes over your session once you have authenticated.', 57, 9, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (87, 'Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process.', 35, 2, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (88, 'Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find                   ', 50, 9, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (89, 'Anyone who has ever made anything of importance was disciplined. Instead of wondering when your next vacation is, maybe you should                    ', 40, 5, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (90, 'I may not have gone where I intended to go, but I think I have ended up where I needed to be. If your Internet Service Provider (ISP)                 ', 68, 10, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (91, 'Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences.', 19, 9, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (92, 'Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find                   ', 64, 7, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (93, 'A comfort zone is a beautiful place, but nothing ever grows there.', 21, 3, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (94, 'Export Wizard allows you to export data from tables, collections, views, or query results to any available formats.', 90, 2, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (95, 'If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution.', 86, 7, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (96, 'If you wait, all that happens is you get older. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud                    ', 18, 3, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (97, 'HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does.', 17, 9, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (98, 'It wasn’t raining when Noah built the ark. I will greet this day with love in my heart. With its well-designed Graphical User Interface(GUI),       ', 44, 4, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (99, 'A man is not old until regrets take the place of dreams. The first step is as good as half over.', 97, 1, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (100, 'Navicat provides a wide range advanced features, such as compelling code editing capabilities, smart code-completion, SQL formatting, and more.', 5, 9, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (101, 'In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view.', 68, 1, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (102, 'You must be the change you wish to see in the world. Navicat 15 has added support for the system-wide dark mode.', 56, 7, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (103, 'To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab.', 83, 9, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (104, 'In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in                 ', 68, 6, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (105, 'Actually it is just in an idea when feel oneself can achieve and cannot achieve.', 74, 8, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (106, 'All journeys have secret destinations of which the traveler is unaware. The Synchronize to Database function will give you a full picture             ', 71, 3, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (107, 'If it scares you, it might be a good thing to try. Champions keep playing until they get it right.', 93, 10, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (108, 'A man is not old until regrets take the place of dreams. I destroy my enemies when I make them my friends. The first step is as good as half over.', 52, 10, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (109, 'How we spend our days is, of course, how we spend our lives.', 25, 4, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (110, 'To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and                  ', 88, 3, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (111, 'Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. Instead of wondering when your next vacation             ', 16, 3, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (112, 'To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source.', 93, 1, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (113, 'Champions keep playing until they get it right. To successfully establish a new connection to local/remote server - no matter via SSL,                ', 20, 5, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (114, 'Typically, it is employed as an encrypted version of Telnet.', 67, 3, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (115, 'The reason why a great man is great is that he resolves to be a great man.', 92, 9, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (116, 'Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Champions keep playing until they get it right.', 83, 6, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (117, 'Export Wizard allows you to export data from tables, collections, views, or query results to any available formats.', 19, 6, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (118, 'Anyone who has never made a mistake has never tried anything new. Optimism is the one quality more associated with success and happiness              ', 57, 6, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (119, 'Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and                 ', 57, 8, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (120, 'Navicat 15 has added support for the system-wide dark mode. Flexible settings enable you to set up a custom key for comparison and synchronization.', 78, 2, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (121, 'It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP.', 69, 10, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (122, 'All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration.', 55, 2, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (123, 'Champions keep playing until they get it right.', 68, 6, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (124, 'The Synchronize to Database function will give you a full picture of all database differences.', 52, 7, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (125, 'Flexible settings enable you to set up a custom key for comparison and synchronization.', 29, 1, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (126, 'Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring           ', 87, 1, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (127, 'It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP.', 4, 6, 3, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (128, 'HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does.', 48, 8, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (129, 'If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane.', 76, 1, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (130, 'The reason why a great man is great is that he resolves to be a great man. Genius is an infinite capacity for taking pains.                           ', 9, 2, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (131, 'Navicat authorizes you to make connection to remote servers running on different platforms (i.e. Windows, macOS, Linux and UNIX), and                 ', 25, 9, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (132, 'Anyone who has ever made anything of importance was disciplined. Navicat allows you to transfer data from one database and/or schema                  ', 9, 1, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (133, 'Navicat 15 has added support for the system-wide dark mode. The Navigation pane employs tree structure which allows you to take action                ', 53, 6, 1, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (134, 'You must be the change you wish to see in the world.', 20, 8, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (135, 'To connect to a database or schema, simply double-click it in the pane. A query is used to extract data from the database in a readable               ', 42, 2, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (136, 'It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough                   ', 55, 4, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (137, 'The Navigation pane employs tree structure which allows you to take action upon the database and their objects through their pop-up                   ', 75, 10, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (138, 'A comfort zone is a beautiful place, but nothing ever grows there. Export Wizard allows you to export data from tables, collections,                  ', 35, 4, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (139, 'After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections.', 84, 5, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (140, 'Optimism is the one quality more associated with success and happiness than any other.', 75, 9, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (141, 'Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process.', 42, 7, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (142, 'You will succeed because most people are lazy. To get a secure connection, the first thing you need to do is to install OpenSSL Library               ', 92, 6, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (143, 'You must be the change you wish to see in the world. All journeys have secret destinations of which the traveler is unaware.', 29, 5, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (144, 'Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring           ', 7, 6, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (145, 'After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target.', 63, 6, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (146, 'Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more.', 4, 4, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (147, 'To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source.', 85, 10, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (148, 'All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration.', 3, 9, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (149, 'I may not have gone where I intended to go, but I think I have ended up where I needed to be. Navicat Cloud provides a cloud service                  ', 28, 5, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (150, 'Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. In other words, Navicat provides the                  ', 39, 5, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (151, 'In the middle of winter I at last discovered that there was in me an invincible summer. Optimism is the one quality more associated                   ', 27, 4, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (152, 'After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections.', 93, 6, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (153, 'The Synchronize to Database function will give you a full picture of all database differences.', 13, 2, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (154, 'Navicat provides a wide range advanced features, such as compelling code editing capabilities, smart code-completion, SQL formatting, and more.', 81, 4, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (155, 'The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership          ', 22, 8, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (156, 'Flexible settings enable you to set up a custom key for comparison and synchronization.', 66, 2, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (157, 'Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. Navicat is a multi-connections Database                  ', 32, 6, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (158, 'Genius is an infinite capacity for taking pains. Instead of wondering when your next vacation is, maybe you should set up a life you                  ', 26, 6, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (159, 'HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does.', 28, 4, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (160, 'All journeys have secret destinations of which the traveler is unaware. How we spend our days is, of course, how we spend our lives.', 67, 3, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (161, 'It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling),                    ', 49, 7, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (162, 'Export Wizard allows you to export data from tables, collections, views, or query results to any available formats.', 31, 2, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (163, 'To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window.', 28, 4, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (164, 'HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does.', 79, 8, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (165, 'All journeys have secret destinations of which the traveler is unaware.', 96, 5, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (166, 'Such sessions are also susceptible to session hijacking, where a malicious user takes over your session once you have authenticated.', 96, 1, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (167, 'In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in                 ', 15, 4, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (168, 'You will succeed because most people are lazy.', 36, 2, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (169, 'Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. Navicat Data Modeler is a powerful                    ', 44, 7, 2, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (170, 'Champions keep playing until they get it right.', 27, 10, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (171, 'All journeys have secret destinations of which the traveler is unaware. HTTP Tunneling is a method for connecting to a server that                    ', 43, 4, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (172, 'If it scares you, it might be a good thing to try.', 35, 6, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (173, 'Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries,                  ', 7, 7, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (174, 'To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window.             ', 4, 5, 7, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (175, 'Navicat authorizes you to make connection to remote servers running on different platforms (i.e. Windows, macOS, Linux and UNIX), and                 ', 99, 4, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (176, 'There is no way to happiness. Happiness is the way. The Main Window consists of several toolbars and panes for you to work on connections,            ', 9, 10, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (177, 'I may not have gone where I intended to go, but I think I have ended up where I needed to be.', 99, 7, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (178, 'A man’s best friends are his ten fingers.', 55, 2, 7, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (179, 'SQL Editor allows you to create and edit SQL text, prepare and execute selected queries.', 28, 1, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (180, 'Sometimes you win, sometimes you learn. The reason why a great man is great is that he resolves to be a great man.', 51, 6, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (181, 'Sometimes you win, sometimes you learn. To successfully establish a new connection to local/remote server - no matter via SSL or SSH,                 ', 62, 4, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (182, 'With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information              ', 45, 1, 1, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (183, 'Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences.', 85, 7, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (184, 'Always keep your eyes open. Keep watching. Because whatever you see can inspire you.', 71, 8, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (185, 'What you get by achieving your goals is not as important as what you become by achieving your goals.', 43, 4, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (186, 'Actually it is just in an idea when feel oneself can achieve and cannot achieve. Flexible settings enable you to set up a custom key                  ', 24, 5, 4, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (187, 'To connect to a database or schema, simply double-click it in the pane. If the plan doesn’t work, change the plan, but never the goal.', 50, 3, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (188, 'After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target.', 39, 3, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (189, 'The Synchronize to Database function will give you a full picture of all database differences.', 48, 3, 6, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (190, 'Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring           ', 44, 9, 5, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (191, 'Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers               ', 13, 9, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (192, 'In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view.', 33, 3, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (193, 'Navicat Monitor requires a repository to store alerts and metrics for historical analysis.', 15, 9, 2, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (194, 'Export Wizard allows you to export data from tables, collections, views, or query results to any available formats.', 76, 2, 5, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (195, 'It wasn’t raining when Noah built the ark.', 63, 2, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (196, 'The past has no power over the present moment. After logged in the Navicat Cloud feature, the Navigation pane will be divided into                    ', 96, 9, 4, 't');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (197, 'You must be the change you wish to see in the world. A man’s best friends are his ten fingers. You can select any connections, objects              ', 25, 7, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (198, 'I will greet this day with love in my heart. The Navigation pane employs tree structure which allows you to take action upon the database             ', 24, 5, 3, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (199, 'Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers               ', 7, 5, 6, 'f');
INSERT INTO chat (id, message, user_id, galaxy_id, alliance_id, alliance_only) VALUES (200, 'In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository             ', 96, 3, 4, 't');

--fix correct Ids for alliances
		UPDATE chat
			SET alliance_id = users.currentAlliance
		FROM users
		WHERE chat.user_id = users.id;
END
$func$ LANGUAGE plpgsql VOLATILE COST 100;
