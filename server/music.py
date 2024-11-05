import sqlite3
# make the array of arrays into an array of objects with dictionaries
def dict_factory(cursor, row):
 fields = []
 # Extract column names from cursor description
 for column in cursor.description:
    fields.append(column[0])

 # Create a dictionary where keys are column names and values are row values
 result_dict = {}
 for i in range(len(fields)):
    result_dict[fields[i]] = row[i]

 return result_dict

class Music:

    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()


    def getMusic(self):
        self.cursor.execute("SELECT * FROM Musics")
        musics = self.cursor.fetchall()
        return musics
    

    def getSingleMusic(self,music_id):
       data = [music_id]
       self.cursor.execute("SELECT * FROM musics WHERE id = ?",data)
       music = self.cursor.fetchone()
       return music
    
    def createMusic(self,album,title,artist,length,genre):

        data = [album,title,artist,length,genre]

        self.cursor.execute("INSERT INTO musics (album,title,artist,length,genre) VALUES (?,?,?,?,?)", data)
        self.connection.commit()
        return
    
    def updateMusic(self,music_id,album,title,artist,length,genre):
       data = [album,title,artist,length,genre,music_id]
       self.cursor.execute("UPDATE musics set album = ?, title = ?, artist = ?, length = ?, genre = ?  WHERE id = ?", data)
       self.connection.commit()
       return
    
    def deleteMusic(self,music_id):
       data = [music_id]
       self.cursor.execute("DELETE FROM `musics` WHERE (`rowid` IN (?))", data)
       self.connection.commit()
       return