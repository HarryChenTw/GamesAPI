from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

import pandas as pd

from utils import to_datetime
from mysql import insert_into_mysql_table

print('Scraping data ... ')
# connect with website
option = webdriver.ChromeOptions()
option.add_argument('--headless')
browser_driver = webdriver.Chrome(executable_path='webdriver/chromedriver', options=option)
browser_driver.get(f'https://t1league.basketball/schedule')

# select game year
game_year = "2022-23 球季"
game_year_selecter = Select(browser_driver.find_elements(by=By.CSS_SELECTOR, value='div.select-wrap>select')[0])
game_year_selecter.select_by_visible_text(game_year)

# select game type
game_type = browser_driver.find_elements(by=By.CSS_SELECTOR, value='div.select-wrap>select')[1].text.split('\n')
game_type_selecter = Select(browser_driver.find_elements(by=By.CSS_SELECTOR, value='div.select-wrap>select')[1])
game_type_selecter.select_by_visible_text(game_type[0]) # 0 refers to 全部類型

# select the upcoming games
browser_driver.find_elements(by=By.CSS_SELECTOR, value='ul.tabs>li')[0].click()

# scrap through all games
games_table = list()
for match in browser_driver.find_elements(by=By.CSS_SELECTOR, value='div.match'):
    date, weekday, time = match.find_element(by=By.CSS_SELECTOR, value='div.match-head>div.match-info>p.match-date').text.split()
    game_type = match.find_element(by=By.CSS_SELECTOR, value='div.match-body>div.match-teams>div.match-time-wrap>span.match-title').text.split()[0]
    
    away_element, home_element = match.find_elements(by=By.CSS_SELECTOR, value='div.match-body>div.match-teams>div.team')
    away_team = away_element.find_element(by=By.CSS_SELECTOR, value='div.team-info>h6.team-name').text
    home_team = home_element.find_element(by=By.CSS_SELECTOR, value='div.team-info>h6.team-name').text

    games_table.append(
        [date, weekday, time, away_team, home_team, game_type]
    )

cols = ['date', 'weekday','time', 'away_team', 'home_team', 'game_type']
games_table = pd.DataFrame(games_table, columns = cols)
games_table['datetime'] = games_table.apply(to_datetime, axis = 1)
games_table['league'] = 'T1 League'
print('Done')

# insert data into mysql
print('Inserting into mysql ... ')
insert_into_mysql_table('t1league', games_table, truncat_table = True)
print('Done')
