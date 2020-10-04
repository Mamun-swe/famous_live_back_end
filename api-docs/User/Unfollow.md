#### Unfollow Another User

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI
    
    Request body: 
    {
        "unfollowId": "5f78d8b5a742e89bb69ebd1c"
    }

    Response body: 
    {
        "status": true,
        "message": "Successfully unfollow"
    }

status code:
Success: 200
Error: 200
{
    "message": "This user is not in your follow list"
}
