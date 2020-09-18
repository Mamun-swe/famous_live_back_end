#### All User

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI

Response body: 
    {
        "results": [
            {
                "id": "5f64a9dbf292b055702eb88b",
                "name": "Mamun",
                "phone": "01533592610",
                "role": "user",
                "status": "offline",
                "isLive": false,
                "mainCoinBalane": 0,
                "presentCoinBalance": 0,
                "userLevel": 0,
                "image": "http://localhost:3000/uploads/images/1600443419630.2.jpg",
                "followers": [
                    {
                        "id": "5f64a9e6f292b055702eb88c",
                        "name": "Sabbir",
                        "phone": "01533592611",
                        "image": "http://localhost:3000/uploads/images/1600444072388.IMG_20200914_000208.jpg"
                    }
                ],
                "following": [
                    {
                        "id": "5f64a9e6f292b055702eb88c",
                        "name": "Sabbir",
                        "phone": "01533592611",
                        "image": "http://localhost:3000/uploads/images/1600444072388.IMG_20200914_000208.jpg"
                    }
                ]
            }
        ]
    }

status code:
Success: 200
Error: 501
{
    "message": "unauthorized request"
}
