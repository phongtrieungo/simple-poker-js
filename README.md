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

The query satisfies all following requirements
1. The query return all trees that belong to the user with the email address “adam@versett.com”
2. The query returns the following information for each tree: the ID, friendly name, scientific name, the owner’s name.
3. The query also returns the total number of “likes” for each tree.

```
SELECT tree_table.id as "ID", tree_table.friendly_name as "Friendly Name", tree_table.scientific_name as "Scientific Name", user_table.name as "Owner's Name", likes.like_count as "Total Likes" 
    FROM user_table 
    INNER JOIN tree_table ON user_table.id = tree_table.owner_id 
    INNER JOIN (SELECT likes_table.tree_id, COUNT(likes_table.tree_id) as like_count FROM likes_table GROUP BY likes_table.tree_id) as likes ON likes.tree_id = tree_table.id
    WHERE user_table.email LIKE "adam@versett.com";
```
## Poker application

### Description
The small application will have a simple UI

1. A button `CREATE DECK` to create a new deck
2. A button `RESET GAME` to reset the game back to initial state
3. A button `DRAW CARDS` to draws five cards each turn and evaluate it's ranking

There are two labels

1. One will show the available cards in the deck
2. Another will show the ranking value for each draw

When the buttion `DRAW CARDS` is clicked, fives cards will be displayed and its ranking value

### NOTE

`Unit test` will be the file `spec-runner.html` to display the report following the test cases defined in file `index.spec.js`.
The reason of UT will provide test case for all available ranking values, which take time to test on the UI. You just need to open the
HTML file and the UT will be run