import pandas as pd

from utils import to_datetime
from mysql import insert_into_mysql_table

game_type_converter = {
    'regular-season': '例行賽', 
    'playoffs': '季後賽',
    'finals': '總決賽'
}

# srape all data
print('Scraping data ... ')
from SeasonGameList import SeasonGameList
season_game_list = SeasonGameList('2022-23')
games_table = pd.DataFrame([])
for game_type in ['regular-season', 'playoffs', 'finals']:
    table = season_game_list.get_game_list(game_type)
    if not len(table) == 0:
        table['datetime'] = table.apply(to_datetime, axis = 1)
        table['game_type'] = game_type_converter[game_type]
        games_table = pd.concat([games_table, table])
games_table['league'] = 'P League'
print('Done')

# upload data into mysql
print('Inserting into mysql ... ')
insert_into_mysql_table('pleague', games_table, truncat_table=True)
print('Done')
