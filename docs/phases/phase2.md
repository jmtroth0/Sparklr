# Phase 2: Viewing Albums and Photos

## Rails
### Models

### Controllers
Api::AlbumsController (create, destroy, show, update)
Api::PhotosController (create, destroy, index, show)

### Views
* albums/show.json.jbuilder

## Backbone
### Models
* Album (parses nested `photos` association)
* Photo

### Collections
* Album
* Photo

### Views
* AlbumForm
* AlbumShow (composite view, contains PhotoIndex subview)
* PhotosIndex (composite view, contains PhotosIndexItem subviews)
* PhotosIndexItem

## Gems/Libraries
