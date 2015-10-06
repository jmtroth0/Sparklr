# Sparklr

A photo sharing site inspired by Flickr.

Located at www.sparklr.xyz

## Features
* A single-page Backbone.js app built on a RESTful Ruby on Rails architecture
* Image upload via Paperclip and AWS S3
* Search by photo/albums or by user via PgSearch
* Infinite scroll implemented using Kaminari
* Sign up via omniauth-facebook
* Normal auth utilizes BCrypt to store passwords

## Todos
* Add comments, faves to photos. Might implement polymorphically to simplify future development of albums
* Add followers. Might implement polymorphically to simplify future development of albums
* Add polymorphic tagging table.
* Store photo and album views
