# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* Tips
- 初期構築
```
rails new api --database=postgresql --skip-bundle --api
```

- 環境構築
```
make up
make bash
cd api
bundle install
bundle exec rails db:create
```

- 起動
```
make up
make app
```
http://localhost:3000/

