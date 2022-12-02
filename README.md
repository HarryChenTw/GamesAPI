# GamesAPI
🏀 如果你平常有在關注多個球賽/聯盟，想要知道這個假日有哪些比賽的話你就得點開每個網站去看

💻 這個API就是整合了不同球賽的比賽資訊，只要一個簡單的get就可以知道這禮拜有哪些比賽

<br>

### Usage
```
	https://127.0.0.1:8080/api/games
```
will return games in json format (sorted by datetime):

<img height="400" alt="Screen Shot 2022-12-02 at 11 19 04 AM" src="https://user-images.githubusercontent.com/75982405/205210265-cfd5948c-be54-4e85-be77-0a7d6433d90b.png">

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
