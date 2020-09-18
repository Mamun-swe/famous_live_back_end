#### Follow Another User

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI
    
    Request body: 
    {
        "myid": "5f61b636a9dab92aeb4956eb",
        "followid": "5f61b642a9dab92aeb4956ec"
    }

    Response body: 
    {
        "message": "success"
    }

status code:
Success: 200
Error: 501
{
    "message": "unauthorized request"
}
