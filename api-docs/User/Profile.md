#### Update Profile Picture

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjRhOWRiZjI5MmIwNTU3MDJlYjg4YiIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwNDQzMTUwLCJleHAiOjE2MDA1Mjk1NTB9
    .SLykgXtptbzCwmEz5gILXOF8wNgEwBL6rtI5DL6PhWI
    
    Request params: { 5f64a9dbf292b055702eb88b }
    
    Request body: 
    {
        "profile_image": "2.jpg"
    }

    Response body: 
    {
        "message": true
    }

    status code:
    Success: 200
    Error: 501
    {
        "message": "unauthorized request"
    }
