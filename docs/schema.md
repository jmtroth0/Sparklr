# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
fname           | string    | not null
password_digest | string    | not null
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

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
followee_id | integer   | not null, foreign key (references users)
follower_id | integer   | not null, foreign key (references users)

## faves
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
photo_id    | integer   | not null, foreign key (references photos)
faver_id    | integer   | not null, foreign key (references users)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
photo_id    | integer   | not null, foreign key (references photos)
tag_id      | integer   | not null, foreign key (references tags)
