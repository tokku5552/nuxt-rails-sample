# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
```bash:
# ruby -v
ruby 2.6.6p146 (2020-03-31 revision 67876) [x86_64-linux]
# rails -v
Rails 6.1.5
# bundle -v
Bundler version 1.17.2
# gem -v
3.0.3
```

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
rails new api --database=mysql --skip-bundle --api
```

- 環境構築
```
make up
make bash
bundle install
bundle exec rails db:create
```

- 起動
```
make up
make app
```
http://localhost:3000/

- モデル追加
```
rails g model <name>
```

- コントローラー追加
```
rails g controller <name>
```

- マイグレーションファイルの実行
```
rake db:migrate
```

- テストデータ配置
```
make bash
rails db:seed
```

## エンドポイント
- get
```
curl -X GET http://localhost:8000/v1/todos
```

- show
```
curl -X GET http://localhost:8000/v1/todos/1
```

- create
```
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d @message_body/body.json \
     -X POST http://localhost:8000/v1/todos
```

- update
```
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d @message_body/body.json \
     -X PUT http://localhost:8000/v1/todos/1
```

- delete
```
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d @message_body/body.json \
     -X DELETE http://localhost:8000/v1/todos/3
```