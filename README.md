Should have link to live site, description/how to use, list of techs/languages/plugins/apis used, technical implementation details for anything worth mentioning (basically anything you had to stop and think about before building), and to-dos/future features. These guidelines apply to all your projects.

# Sparklr

A photo sharing site inspired by Flickr.

Located at [sparklr.xyz][www.sparklr.xyz]

## Features
* A single-page Backbone.js app built on a RESTful Ruby on Rails architecture
* Image upload via Paperclip and AWS S3
* Search by photo/albums or by user via PgSearch
* Infinite scroll implemented using Kaminari
* Sign up via omniauth-facebook
* Normal auth utilized BCrypt to store passwords

## Todos
* Add comments, faves to photos. Might implement polymorphically to simplify future development of albums
* Add followers. Might implement polymorphically to simplify future development of albums
* Add polymorphic tagging table.
* Store photo and album views
