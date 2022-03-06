# NestJSのサンプルAPI

#### 準備
`yarn install`

#### 起動
`yarn start`

#### API仕様
`http://localhost:3000/openapi`

### 実行方法(curl)
```
curl --location --request POST 'http://localhost:3000/placeOrder' \
--header 'Content-Type: application/json' \
--data-raw '{
    "serviceId": "0x3SUBYOax",
    "amount": 10000
}'
```
