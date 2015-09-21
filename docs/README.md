# Sparklr

[Heroku link][heroku]

[heroku]: not yet up

## Minimum Viable Product
Sparklr is a clone of Flickr built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Log in and out
- [x] Create albums
- [x] Upload photos
- [x] Add titles, descriptions
- [ ] Edit titles, descriptions
- [x] View album as collection of photo thumbnails
- [ ] See individual enlarged photos
- [ ] Follow Users
- [ ] See a list of followed users
- [ ] Search for photos by title or user

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Album Creation (~1 day) --> hopefully less
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create albums using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Creating Albums and Photos (~1 days)
I will add API routes to serve album and photo data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create and view primitive albums. I plan to
integrate Filepicker for file upload so users can finally upload images. I will
take some time and look around for other file I/O libraries, though. I know
rather little of what makes one better than another at this point. Users will
start with the special camera roll and photostream albums, consisting of private
and public photos respectively.

[Details][phase-two]

### Phase 3: Displaying Albums and Photos (~3 days)
Then I will develop both show views
as composites. The album show view will be a list of photos streaming down the
page in rows. It will link to the photo show pages on click at first, but will
develop some further editing capabilities including privacy adjustment, which
will probably lead to a doubleclick view. The photo show page will, in addition
to the photo, also show comments, and some metadata in subviews below the photo.
I will probably also make the navbars and headers during this phase.

[Details][phase-three]


### Phase 4: Searching for Users and Photos (~2 days)
I'll need to add `search` routes to both the Users and Photos controllers. On the
Backbone side, there will be a `SearchResults` composite view has `UsersIndex`
and `PhotosIndex` subviews. These views will use plain old `users` and `photos`
collections, but they will fetch from the new `search` routes.

[Details][phase-four]


### Bonus Phase: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`followed_users_photos` association to serve a list of photos ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `photos`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-four]

### Bonus Features (TBD)
- [ ] Add comments
- [ ] "Fave" button and counter for photos
- [ ] "Fave" album for your favorite photos around Sparklr
- [ ] View counter for photos
- [ ] Collaborative albums
- [ ] Photo tagging and tag searches
- [ ] Photo download to local
- [ ] Custom user urls
- [ ] Pagination/infinite scroll
- [ ] Activity history (e.g. faves, shares, taggings)
- [ ] Photo editing
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-four]: ./docs/phases/phase5.md
