from flask import Flask, request
from music import Music


app = Flask(__name__)

@app.route("/musics/<int:music_id>", methods=["OPTIONS"])
def handle_cors_options(music_id):
    return "" ,204, {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"DELETE,PUT",
        "Access-Control-Allow-Headers":"Content-Type"
    }

@app.route("/musics", methods=["GET"])
# GET 
def retrieve_music():
    db = Music("music_db.db")
    musics = db.getMusic()
    return musics ,200, {"Access-Control-Allow-Origin":"*"}

@app.route("/musics/<int:music_id>", methods=["GET"])
#single GET
def retrive_single_music(music_id):
    db = Music("music_db.db")
    music = db.getSingleMusic(music_id)
    return music, 200 , {"Access-Control-Allow-Origin":"*"}

@app.route("/musics", methods=["POST"])
# POST
def create_music():
    db = Music("music_db.db")
    album = request.form["album"]
    title = request.form["title"]
    artist = request.form["artist"]
    length = request.form["length"]
    genre = request.form["genre"]
    db.createMusic(album,title,artist,length,genre)
    return "created", 201, {"Access-Control-Allow-Origin": "*"}


@app.route("/musics/<int:music_id>",methods=["PUT"])
def update_Music(music_id):
    db = Music("music_db.db")
    music = db.getSingleMusic(music_id)
    print("music",music)
    if music:
        album = request.form["album"]
        title = request.form["title"]
        artist = request.form["artist"]
        length = request.form["length"]
        genre = request.form["genre"]
        db.updateMusic(music_id,album,title,artist,length,genre)
        return "Update", 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return f"Music {music_id} not found", 404, {"Access-Control-Allow-Origin":"*"}
    
@app.route("/musics/<int:music_id>",methods=["DELETE"])
def delete_Music(music_id):
    db = Music("music_db.db")
    music = db.getSingleMusic(music_id)
    print("music",music)
    print("deleted coaster with ID:", music_id)
    if music:
        db.deleteMusic(music_id)
        return "Deleted", 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return f"Music {music_id} not found", 404 ,{"Access-Control-Allow-Origin":"*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()