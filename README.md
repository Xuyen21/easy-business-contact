# easy-business-contact
A professional and simple way to keep your business contacts under control
### Initialize react app
using `npm create vite@latest`
### Create your credentials in `.env`
+ Copy `.env.template` to `.env`
+ Replace the placeholder values in `.env` with your actual credentials.
### Run pymongo app in browser : `python -m uvicorn main:app --reload`
note that before running the container in docker must be up and running, port 8000 by default
### stop any runnung FastAPI server: `taskkill /IM uvicorn.exe /F
`
