# famous_live_back_end API's

##### Auth API's

[ [POST] /api/auth/register ]

---

http://github.com - automatic!
[GitHub](http://github.com)

---

Request body: 
  {
      "name": "",
      "phone": ""
  }

Response body: 
  {
      "message": "Account successfully created"
  }

status code:
Success: 201
Error: 500 Internal Server Error
Response body: 
{
    "success": false,
    "message": [
        "Path `name` is required.",
        "Path `phone` is required."
    ]
}



*[POST] /api/auth/login

Request body: 
  {
      "phone": ""
  }

Response body: 
  {
      "message": "success",
      "token": ""
  }

status code:
Success: 200
Error: 204 No Content


*[GET] /api/auth/me

Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjFjNGQzYTAzM2VmNDFmYTc1MTA0MSIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwMjQ0NTM2LCJleHAiOjE2MDAzMzA5MzZ9.MQvTafbRGlI8sQN1BRLH4GlQPCtwDoRQdEb_TyTY_sY


Response body: 
  {
      "my_info": {
          "followers": [],
          "following": [],
          "role": "user",
          "status": "online",
          "isLive": false,
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjFjNGQzYTAzM2VmNDFmYTc1MTA0MSIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwMjQ0NTM2LCJleHAiOjE2MDAzMzA5MzZ9.MQvTafbRGlI8sQN1BRLH4GlQPCtwDoRQdEb_TyTY_sY",
          "_id": "5f61c4d3a033ef41fa751041",
          "name": "Mamun",
          "phone": "01533592610",
          "createdAt": "2020-09-16T07:54:59.389Z",
          "updatedAt": "2020-09-16T08:22:16.748Z",
          "__v": 0
      }
  }

status code:
Success: 200
Error: 501
Resonse body: 
{
    "message": "unauthorized request"
}
