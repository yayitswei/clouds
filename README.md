# Clouds (lite version)

A no-db version of the cloud-guessing game, using rack instead of rails.

![ScreenShot](https://raw.github.com/yayitswei/clouds/master/public/images/calistoga-thumb.png)

## Docs

### Running locally

Note: runs on port 9292 locally, not 3000 like rails.

    $ rackup
    $ open http://localhost:9292

### Deploying

Replace `clouds-game` with a name that's not taken.

    $ heroku create
    $ heroku apps:rename clouds-game
    $ git push heroku master
    $ heroku open
