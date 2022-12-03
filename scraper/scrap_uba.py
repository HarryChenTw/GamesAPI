from selenium import webdriver
from selenium.webdriver.common.by import By

import datetime
import pandas as pd
from mysql import insert_into_mysql_table_for_uba

month_converter = {
    'Jan' : 1,
    'Feb' : 2,
    'Mar' : 3,
    'Apr' : 4,
    'May' : 5,
    'Jun' : 6,
    'Jul' : 7,
    'Aug' : 8,
    'Sep' : 9,
    'Oct' : 10,
    'Nov' : 11,
    'Dec' : 12
}

def to_datetime(row):
    # parse date part
    month, day = row['date'].split('.')
    if month in ['Nov', 'Dec']:
        year = 2022
    else:
        year = 2023
    
    # parse time part (to 24 hour)
    time_, ampm = row['time'].split()
    if ampm == 'PM':
        time_ = time_.split(':')
        time_[0] = str(int(time_[0]) + 12)
        time_ = ":".join(time_)
    
    return f"{year}-{month_converter[month]}-{day} {time_}:00"

weekday_converter = {
    0 : '(ㄧ)',
    1 : '(二)',
    2 : '(三)',
    3 : '(四)',
    4 : '(五)',
    5 : '(六)',
    6 : '(日)',
}

def get_weekday(row):
    date_ = row['datetime'].split()[0]
    weekday = datetime.datetime(*[int(x) for x in date_.split('-')]).weekday()
    return weekday_converter[weekday]


print('Scraping data ... ')
# connect with website
option = webdriver.ChromeOptions()
option.add_argument('--headless')
browser_driver = webdriver.Chrome(executable_path='webdriver/chromedriver', options=option)
browser_driver.get(f'http://uba.tw/111/%E5%85%AC%E9%96%8B%E7%94%B7%E4%B8%80%E7%B4%9A/Schedule?page=1&count=False')

# get all games
games_table = list()
while True:
    for match in browser_driver.find_elements(by=By.CSS_SELECTOR, value='div.content_detail'):
        match_info = match.find_elements(by=By.CSS_SELECTOR, value='div.fixtures_text>p')
        date_ = match_info[0].text
        time = match_info[1].text
        game_type = match_info[3].text
        teams = match.find_elements(by=By.CSS_SELECTOR, value='div.school_name')
        team1, team2 = teams[0].text, teams[1].text
        games_table.append([date_, time, game_type, team1, team2])
    
    next_button = browser_driver.find_elements(by=By.CSS_SELECTOR, value='li.PagedList-skipToNext>a')
    if len(next_button) > 0:
        next_button[0].click()
    else:
        break
cols = ['date','time', 'game_type', 'team_1', 'team_2']
games_table = pd.DataFrame(games_table, columns = cols)
games_table['league'] = 'UBA'
games_table['datetime'] = games_table.apply(to_datetime, axis = 1)
games_table['weekday'] = games_table.apply(get_weekday, axis = 1)
print('Done')


# insert data into mysql
print('Inserting into mysql ... ')
insert_into_mysql_table_for_uba('uba', games_table, truncat_table = True)
print('Done')
