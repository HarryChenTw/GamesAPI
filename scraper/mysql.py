import pymysql

db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "Harry669835",
    "db": "games",
    "charset": "utf8"
}


def insert_into_mysql_table(table_name, games_table, truncat_table = False):

    create_table_command = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id int PRIMARY KEY AUTO_INCREMENT,
        league varchar(255) NOT NULL,
        game_type varchar(255) NOT NULL,
        datetime datetime NOT NULL,
        weekday varchar(255) NOT NULL,
        away_team varchar(255) NOT NULL,
        home_team varchar(255) NOT NULL
    );
    """

    truncate_command = f"TRUNCATE TABLE {table_name}"

    insert_command = f"INSERT INTO {table_name}(league, game_type, datetime, weekday, away_team, home_team) VALUES(%s, %s, %s, %s, %s, %s)"

    with pymysql.connect(**db_settings) as conn :
        with conn.cursor() as cursor:
            
            # create table if not exist
            cursor.execute(create_table_command)

            if truncat_table:
                cursor.execute(truncate_command)

            for i in range(len(games_table)):
                cursor.execute(
                        insert_command, (games_table.iloc[i]['league'], games_table.iloc[i]['game_type'], games_table.iloc[i]['datetime'], games_table.iloc[i]['weekday'], games_table.iloc[i]['away_team'], games_table.iloc[i]['home_team'])
                )
            conn.commit()