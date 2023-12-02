#!/bin/bash
cd /root/opensource-scrum-master/server && (npm run seed-admin-user 2>&1 > /root/scrum-seed.log.txt) &
cd /root/opensource-scrum-master/server && (PORT=3001 npm run start 2>&1 > /root/scrum-backend.log.txt) &
cd /root/opensource-scrum-master/client && (PORT=3000 npm run start 2>&1 > /root/scrum-frontend.log.txt) &


