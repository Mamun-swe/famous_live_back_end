#### Share Coin with Another User

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI
    
    Request body: 
    {
        "shareId": "5f78c4d1182ef974cc338e68",
        "coinAmount": "10"
    }

    Response body: 
    {
        "message": "10 Coin successfully shared"
    }

status code:
Success: 200
Error: 501
{
    "message": "unauthorized request"
}


#### Update Coin

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI
    
    Request body: 
    {
        "coin": "10"
    }

    Response body: 
    {
        "status": true,
        "message": "Successfully coin updated."
    }

status code:
Success: 200
Error: 501
{
    "message": "unauthorized request"
}
