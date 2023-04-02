# TODO 管理アプリ
このアプリケーションは、React (TypeScript) を使用して作成された TODO 管理アプリです。このアプリケーションを使用すると、TODO リストを作成し、編集、完了できます。
[Create React App](https://github.com/facebook/create-react-app).

## 必要なソフトウェア
このアプリケーションを実行するには、Node.js と npm (または yarn) と
JSONServerが必要です。

## 使用方法

1.このリポジトリをクローンします。
git clone https://github.com/<your-username>/react-typescript-todo-app.git

2.リポジトリのディレクトリに移動します。
cd react-typescript-todo-app

3.パッケージをインストールします。
### npm install

### `npm start`
ブラウザで http://localhost:3000 にアクセスして、TODO リストを管理できることを確認します。

4.json-serverインストールします。
### npm install @types/json-server --save-dev

5.db.json ファイルを作成します。このファイルには、TODO リストのデータが含まれます。
{
  "todos": [
    {
      "id": 1,
      "name": "TODO1",
      "isCompleted": true
    },
    {
      "id": 2,
      "name": "TODO2",
      "isCompleted": false
    },
    {
      "id": 3,
      "name": "TODO3",
      "isCompleted": true
    }
  ]
}

6.JSON Server を起動します。
### npm run start-mock
これで、JSON Server が起動し、 http://localhost:3001/todos から TODO リストのデータを取得することができるようになります。


