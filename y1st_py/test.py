import MySQLdb

db = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'mBiGaS@()#()', db = 'test')
cur = db.cursor()
songs = ('Lift u Up', 'Stairway to Heaven', 'Dream On')
for song in songs:
    cur.execute("INSERT INTO song (title) VALUES (%s)", (song,))
    print("Auto Increment ID: %s" % cur.lastrowid)
db.commit()
cur.close()
