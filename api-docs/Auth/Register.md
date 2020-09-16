#### Create new account

```Request body: 
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