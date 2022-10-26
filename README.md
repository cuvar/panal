# panal
simple linkstorage

## Deployment
No matter how you want to deploy this application, you need to specify the following environment variables:
````
USER_HASH: SHA256 hash of the username
PASSWORD_HASH: SHA256 hash of the password
JWT_SECRET: A secret for the JWT token
TOKEN_PERIOD: Amount of hours an auth token is valid
````

### Deploy with Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcuvar%2Fpanal)