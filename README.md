# TODO 管理アプリ
本アプリケーションは、React (TypeScript) を使用して作成した TODO 管理アプリです。
このプロジェクトは、[Create React App](https://github.com/facebook/create-react-app)
を使って開発しました。

## 必要なソフトウェア
このアプリケーションを実行するには、Node.js と npm (または yarn) と
JSONServerが必要です。

## 使用方法
1.このリポジトリをクローンします。
```bash
git clone https://github.com/fwr250/react-typescript-todo-app.git
```

2.リポジトリのディレクトリに移動します。
```bash
cd react-typescript-todo-app
```

3.パッケージをインストールおよび起動します。
```bash
npm install
 ```
 ```bash
npm start
```
http://localhost:3000 にて　TODO リスト管理アプリが立ち上がることを確認します。

4.json-serverインストールします。
```bash
npm install @types/json-server --save-dev
```

5.JSON Server を起動します。

```bash
npm run start-mock
```
JSON Server が起動し、 http://localhost:3001/todos から TODO リストのデータを取得することができるようになります。
