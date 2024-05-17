#!/bin/bash
ps -aux|grep node|grep scrum|grep master|awk '{print $2}' |xargs -I{} kill -9 {} 
lsof -i tcp:4001 | awk '{print $2}' |xargs -I{} kill -9 {}  #kill backend with port 4001
lsof -i tcp:4000 | awk '{print $2}' |xargs -I{} kill -9 {}  #kill frontend with port 4000
reset
