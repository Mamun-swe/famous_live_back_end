#### All users

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjFjNGQzYTAzM2VmNDFmYTc1MTA0MSIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwMjQ0NTM2LCJleHAiOjE2MDAzMzA5MzZ9
    .MQvTafbRGlI8sQN1BRLH4GlQPCtwDoRQdEb_TyTY_sY


Response body: 
{
    "users": [
        {
            "followers": [],
            "following": [
                {
                    "_id": "5f61b642a9dab92aeb4956ec",
                    "name": "Khayer",
                    "phone": "01533592611"
                }
            ],
            "_id": "5f61b636a9dab92aeb4956eb",
            "name": "Mamun",
            "phone": "01533592610"
        },
        {
            "followers": [
                {
                    "_id": "5f61b636a9dab92aeb4956eb",
                    "name": "Mamun",
                    "phone": "01533592610"
                }
            ],
            "following": [],
            "_id": "5f61b642a9dab92aeb4956ec",
            "name": "Khayer",
            "phone": "01533592611"
        },
        {
            "followers": [],
            "following": [],
            "_id": "5f61b650a9dab92aeb4956ed",
            "name": "Alif",
            "phone": "01533592612"
        },
        {
            "followers": [],
            "following": [],
            "_id": "5f61bbb4aa00763814d37d34",
            "name": "admin",
            "phone": "01711111112"
        }
    ]
}

status code:
Success: 200
Error: 501
Resonse body: 
{
    "message": "unauthorized request"
}
