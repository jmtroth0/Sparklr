# Sparklr

Inspired by Flickr, a single-page Backbone.js app built on a RESTful Ruby on Rails architecture.

Located at www.sparklr.xyz

## Tech

### Core
Rails, PostgreSql, Backbone.js

### Implementation
* Image upload via Paperclip and AWS S3
* Composite views facilitate re-rendering of just small portions of the page.
* Multisearch by photo/albums or by user via PgSearch
* Infinite scroll implemented using Kaminari
* Sign up via omniauth-facebook
* Normal auth utilizes BCrypt to store passwords

## Todos
* Add comments to photos. Might implement polymorphically to simplify future development to albums as well
* Add followers. Might implement polymorphically to simplify future development to albums as well
* Add polymorphic tagging table.
* Store photo and album views
