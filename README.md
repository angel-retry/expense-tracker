# 家庭記帳本
此網站可紀錄、編輯、刪除支出開銷費用。

## Features - 產品功能

1.使用者可查閱全部的支出開銷費用以及總金額。
2. 使用者可新增一筆支出開銷費用。
3. 使用者可編輯一筆支出開銷費用
4. 使用者可刪除一筆支出開銷費用。
5. 使用者可選擇分類來看各個分類的開銷費用。
6. 使用者可調整支出開銷費用表單中的日期、金額的降升順序。

## Screen Photo - 專案畫面
![image](https://github.com/angel-retry/expense-tracker/assets/71422058/257cbc9c-736d-405c-8ec3-3edd16538a82)
![image](https://github.com/angel-retry/expense-tracker/assets/71422058/360bde01-aec1-4b7b-b778-dbfa31a06a34)
![image](https://github.com/angel-retry/expense-tracker/assets/71422058/765813b1-7023-467d-a812-dea0c95b1d8e)

## Installing - 專案安裝流程
1. 請git clone我的專案。
```
git clone https://github.com/angel-retry/expense-tracker
```
2. git clone專案後，cd此專案名稱，進入此專案資料夾。
```
cd expense-tracker
```
3. 接下來安裝npm套件，請輸入以下指令開始安裝npm套件。
```
npm install
```
4. 完成安裝npm套件以後，輸入以下指令，載入種子專案。
```
npm run seed
```
5. 載入種子專案完後，輸入以下指令，可啟動專案
```
npm run dev
```
6. 接下來會在terminal看到以下內容，代表伺服器建立成功。
```
> restaurant-list@1.0.0 dev
> nodemon app.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Example app listening on port 3000
```
7.現在，可開啟任一瀏覽器輸入[http://localhost:3000](http://localhost:3000) 開始使用此網站，可使用以下帳號登入。
```
email: user1@example.com
password: password
```
## Development tool - 開發工具
1. [Node.js](https://nodejs.org/en/)
2. [Handlebars](https://handlebarsjs.com/)
3. [express-handlebars](https://github.com/express-handlebars/express-handlebars)
4. [Bootstrape v5.1.3](https://getbootstrap.com/)
5. bcryptjs
6. connect-flash
7. dayjs
8. express
9. express-session
10. mysql2
11. passport
12. passport-local
13. sequelize
14. sequelize-cli
