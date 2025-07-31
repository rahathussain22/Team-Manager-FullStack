git clone https://github.com/rahathussain22/Team-Manager-FullStack
cd backend

# Install dependencies
npm install

#Configure environment variables in .env
PORT=8000
REFRESH_TOKEN=ItsmyRefreshToken
REFRESH_TOKEN_EXPIRY=30d
ACCESS_TOKEN=ItsmyAccessToken
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=http://localhost:5173
DB_URI=postgresql://<username>:<password>@<host>:<port>/<database>

# Start backend server
npm start


cd ../frontend/my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
