# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
fname           | string    |
password_digest | string    | not null, unique
session_token   | string    | not null, unique
cover_photo_id  | integer   | foreign key (references photos)
prof_pic_id     | integer   | foreign key (references photos)

## albums
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null
description     | string    | not null
user_id         | integer   | not null, foreign key (references users)

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
uploader_id | integer   | not null, foreign key (references users)
title       | string    | not null
description | string    |
privacy     | string    | not null, default: private
file_url    | string    | not null
upload_date | date      | not null

## album_photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
photo_id    | integer   | not null, foreign key (references photos)
album_id    | integer   | not null, foreign key (references albums)

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
photo_id    | integer   | not null, foreign key (references photos)
body        | text      | not null
