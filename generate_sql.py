import os

music_dir = 'music'
sql_file = 'insert_songs.sql'

with open(sql_file, 'w', encoding='utf-8') as f:
    # A hmaa test data kan dah kha kan paih hmasa ang
    f.write("DELETE FROM songs;\n") 
    
    count = 0
    for filename in os.listdir(music_dir):
        if filename.endswith('.mp3'):
            title = filename.replace('.mp3', '').replace('_', ' ')
            url = f"music/{filename}"
            
            # Lyrics (.lrc) a awm chuan a chhiar tel nghal ang
            lrc_path = os.path.join(music_dir, filename.replace('.mp3', '.lrc'))
            lyrics = ""
            if os.path.exists(lrc_path):
                with open(lrc_path, 'r', encoding='utf-8') as lrc_file:
                    # SQL-a single quote (') a buai loh nan a siamtha ang
                    lyrics = lrc_file.read().replace("'", "''") 
            
            # SQL Insert code a ziak ang
            title_escaped = title.replace("'", "''")
            url_escaped = url.replace("'", "''")
            f.write(f"INSERT INTO songs (title, url, lyrics) VALUES ('{title_escaped}', '{url_escaped}', '{lyrics}');\n")
            count += 1

print(f"✅ Hla {count} hmuh a ni. '{sql_file}' file siam a ni e!")
print("Tunah Wrangler hmangin he SQL hi database ah run tawh rawh le.")