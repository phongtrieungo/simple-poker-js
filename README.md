# Vernett Interview

## SQL

### Create tables

1. User table
CREATE TABLE `versett`.`user_table` ( `id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `name` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`email`)) ENGINE = InnoDB;

2. Tree table
CREATE TABLE `versett`.`tree_table` ( `id` INT NOT NULL AUTO_INCREMENT , `friendly_name` TEXT NOT NULL , `scientific_name` TEXT NOT NULL , `owner_id` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

3. Likes table
CREATE TABLE `versett`.`likes_table` ( `tree_id` INT NOT NULL , `user_id` INT NOT NULL ) ENGINE = InnoDB;

### Queries

1. SELECT tree_table.friendly_name, tree_table.scientific_name 
    FROM user_table 
    INNER JOIN tree_table ON user_table.id = tree_table.owner_id 
    WHERE user_table.email LIKE "adam@versett.com"

2. SELECT tree_table.id, tree_table.friendly_name, tree_table.scientific_name, user_table.name 
    FROM user_table 
    INNER JOIN tree_table 
    ON user_table.id = tree_table.owner_id

3. select result.friendly_name, COUNT(result.friendly_name) from (select tree_table.id, tree_table.friendly_name, user_table.name 
        from tree_table 
        inner join likes_table on tree_table.id = likes_table.tree_id 
        inner join user_table on user_table.id = likes_table.user_id 
        ORDER BY tree_table.id
        ) as result GROUP BY result.friendly_name

## Poker application

### Description
The small application will have a simple UI

1. A button `CREATE DECK` to create a new deck
2. A button `RESET GAME` to reset the game back to initial state
3. A button `DRAWS CARDS` to draws five cards each turn and evaluate it's ranking

There are two labels

1. One will show the available cards in the deck
2. Another will show the ranking value for each draw

`Unit test` will be the file `spec-runner.html` to display the report following the test cases defined in file `index.spec.js`.
The reason of UT will provide test case for all available ranking values, which cannot take time to test on the UI. You just need to open the
HTML file and the UT will be run