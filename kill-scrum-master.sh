#!/bin/bash
ps -aux|grep node|grep scrum|grep master|awk '{print $2}' |xargs -I{} kill -9 {} 
lsof -i tcp:3001 | awk '{print $2}' |xargs -I{} kill -9 {}  #kill backend with port 3001
lsof -i tcp:3000 | awk '{print $2}' |xargs -I{} kill -9 {}  #kill frontend with port 3000
reset
