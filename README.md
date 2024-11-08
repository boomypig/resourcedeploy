# My Project

## Resource

**Music App**

Attributes:

* Album (string)
* Title (string)
* Artist (string)
* Length (integer)
* Genre (string)

## Schema

```sql
CREATE TABLE musics (
id INTEGER PRIMARY KEY,
Album TEXT,
Title TEXT,
Artist TEXT,
Length INTEGER,
Genre TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve music collection      | GET    | /musics
Retrieve music member          | GET    | /musics/*\<id\>*
Create music member            | POST   | /musics
Update music member            | PUT    | /musics/*\<id\>*
Delete music member            | DELETE | /musics/*\<id\>*

## How to Access the App

navigate to http://music.zorran.tech/

## How to build the Docker Containers

**backend dockerfiles & kubernetes deployment**
1. make sure you have docker installed on your machine.
2. open a terminal (vs code terminal will work fine)
3. Navigate to the server folder where the Dockerfile is located
4. enter docker login and follow the prompts
5. enter docker build -t yourdockerhubusername/music-backend-app
6. then enter docker push yourdockerhubusername/music-backend-app
7. make sure you have kubernetes installed on your system.
8. navigate to deployments directory and open backend-deployments.yaml in a file editor
9. On the line that you see sorenbybee/music-backend-app replace this with the name of the image you created in steps 5 - 6 and save the file
10. then run kubectl apply -f backend-deployment.yaml

**frontend dockerfiles & kubernetes deployment**
1. Repeat the previous same steps for the client folder and change the names to be music-frontend-app
