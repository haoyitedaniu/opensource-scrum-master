#!/bin/bash
cd /root/opensource-scrum-master/server && (NODE_ENV="production" MONGODB_URI="mongodb://localhost:27017/opensource-scrum-database" SCRUM_ADMIN_USERNAME="greatmaster" SCRUM_ADMIN_PASSWORD="TheMasterIsGr8" npm run seed-admin-user 2>&1 > /root/scrum-seed.log.txt) &


#!/bin/bash
cd /root/opensource-scrum-master/server && (NODE_ENV="production"  MONGODB_URI="mongodb://localhost:27017/opensource-scrum-database"  PORT=4001 npm run start 2>&1 > /root/scrum-backend.log.txt) &


#!/bin/bash
cd /root/opensource-scrum-master/client && ( NODE_ENV="production" BACKEND_URI="http://localhost:4001" REACT_APP_BASENAME="/scrum" PUBLIC_URL="/scrum/" PORT=4000 npm run start 2>&1 > /root/scrum-frontend.log.txt) &


