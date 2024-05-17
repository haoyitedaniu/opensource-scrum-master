#!/bin/bash
cd /root/opensource-scrum-master/server && (NODE_ENV="production" SCRUM_ADMIN_USERNAME="greatmaster" SCRUM_ADMIN_PASSWORD="TheMasterIsGr8"  MONGODB_URI="mongodb://localhost:27017/opensource-scrum-database" npm run seed-admin-user 2>&1 > /root/scrum-seed.log.txt) &


