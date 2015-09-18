# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

loki = User.create({email: 'loki@a.io', password: 'ragnarok', fname: 'Loki'})
thor = User.create({email: 'thor@a.io', password: 'ragnarok', fname: 'Thor'})

# loki.albums.create({title: })
