# GamesAPI
🏀 如果你平常有在關注多個球賽/聯盟，想要知道這個假日有哪些比賽的話你就得點開每個網站去看

💻 這個API整合了不同球賽的比賽資訊，只要一個簡單的get就可以知道這禮拜有哪些比賽

<br>

### Usage
```
	https://127.0.0.1:8080/api/games
```
will return games in json format (sorted by datetime):

<img height="400" alt="Screen Shot 2022-12-03 at 7 58 22 PM" src="https://user-images.githubusercontent.com/75982405/205439936-516b4c53-16ae-481b-9ec9-460c2476e64f.png">

it could also specify a league, e.g. ```https://127.0.0.1:8080/api/games/pleague```


<br>

## Future Work
1. deploy to cloud (e.g. GCP)
2. scheduled and automatically scrap all games and store to database
3. front-end

<br>

## Setup
1. install node package
	```shell
	npm install
	```
2. setup environment variables
	```shell
	sh createEnvFile.sh
	``` 
3. modify environment variables (in **.env**) of your own
