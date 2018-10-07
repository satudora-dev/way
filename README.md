# WAY
https://way.satudora.co

[![Build Status](https://travis-ci.com/satudora-digital/way.svg?token=rsXJmjsg4Ce41ycX1Bij&branch=master)](https://travis-ci.com/satudora-digital/way)

# クローンして、ローカルで動かすまで
[node.js](https://nodejs.org/en/download/)(npm)のバージョンはこちら(ライブラリのバージョン衝突に念のため備える)
```bash
$ node -v
v8.12.0
$ npm -v
6.4.1
```

0. repository clone
```bash
$ git clone https://github.com/satudora-digital/way.git
```
1. package install
```bash
$ npm i
```
2. npm start
```bash
$ npm start
```

# 技術Stack

![Way structure](./way_structure.png "WAY structure")

## 言語
- [React.js](https://reactjs.org/docs/create-a-new-react-app.html)  
→ JavaScriptから[TypeScript](https://www.typescriptlang.org/)に移行予定

## Database
- [Firebase RealtimeDatabase](https://console.firebase.google.com/u/0/project/whoareyou-c231f/database)

## Storage
- Firebase Cloud Storage

## 認証
- [Firebase Authentication](https://console.firebase.google.com/u/0/project/whoareyou-c231f/authentication/users)

## Hosting
- Firebase Hosting


# おおまかな処理の流れ

![Way flow](./way_flow.png "WAY flow")
