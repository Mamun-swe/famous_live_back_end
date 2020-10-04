#### Block Another User

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI
    
    Request body: 
    {
        "blockId": "5f7a0dbafc697e8bde4fa66b"
    }

    Response body: 
    {
        "status": true,
        "message": "Successfully blocked user"
    }

status code:
Success: 200
Error: 200
{
    "message": "Already blocked this user"
}
