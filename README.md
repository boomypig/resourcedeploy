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