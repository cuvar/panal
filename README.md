⚠️ This project is still work in progress.  
# panal
widget-based dashboard for managing life

## Idea
I wanted to have a simple self-hosted dashboard application for viewing every service that is relevant for my daily life:
- Calendar
- Todos
- a simple link storage
- search field with various search engines
- etc

Each service should be a customizable widget on the dashboard. A widget engine (currently working on [that one](https://github.com/cuvar/rswe)) should be used for managing widgets more easily.

[dashy](https://github.com/Lissy93/dashy) solves some of the problems and is doing great at that (so maybe that's something for you). However, it is missing some of the functionality I wanted. That's why we're here.

## Current state
This project is still in early development. If you have any ideas for other features, just open an issue!

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
