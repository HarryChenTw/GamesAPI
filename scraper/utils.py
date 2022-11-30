def to_datetime(row):
    month, day = row['date'].split('/')
    if int(month) < 10 :
        year = 2023
    else:
        year = 2022
    return f"{year}-{month}-{day} {row['time']}:00"
