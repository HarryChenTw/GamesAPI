# GamesAPI
ð å¦æä½ å¹³å¸¸æå¨éæ³¨å¤åçè³½/è¯çï¼æ³è¦ç¥ééååæ¥æåªäºæ¯è³½çè©±ä½ å°±å¾é»éæ¯åç¶²ç«å»ç

ð» éåAPIæ´åäºä¸åçè³½çæ¯è³½è³è¨ï¼åªè¦ä¸åç°¡å®çgetå°±å¯ä»¥ç¥ééç¦®ææåªäºæ¯è³½

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
