    This is open source scrum master tool that is suitable for small teams to manage software development using agile method (user stories and tasks)

    1. How to download the code:

    	On Linux/Mac (run in your home folder)
    		cd $HOME
    		git clone git@github.com:haoyitedaniu/opensource-scrum-master.git
    	On Windows (run in your documents folder)
    		Install gitbash following with https://git-scm.com/downloads
    		cd $HOME/Documents
    		git clone git@github.com:haoyitedaniu/opensource-scrum-master.git

    2. How to compile
    	#install NodeJs following https://nodejs.org/en/download
    	#install npm following https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    	#install yarn by

    	npm install -g yarn
      npm install -g env-cmd

    	#install packages for opensource-scrum-master server and client
    	cd opensource-scrum-master

    	#installl the concurrently package
    	npm install concurrently

    	#install the rest of node packages
    	yarn run install

    	#compile the client in development mode
    	yarn run build:dev # or npm run build:dev

    	#or compile the client in the productin mode

    	#compile the client in production mode
    	yarn run build	# or npm run build

    3. How to install mongodb
    	#This program uses mongodb community version and mongoose for back-end
    	#Install mongodb following https://www.mongodb.com/docs/manual/administration/install-community/

    4. How to run on local machine

    	yarn run start:dev  #run in development mode
    		#check if back-end running:  http://localhost:3001
    		#check if front-end running:  http://localhost:3000
    			    			#and by default the admin account is with scrummaster
    								#and password being TheMasterIsGr8


    	#or to run in production mode (using 4001 for backend and 4000 for front end)

    		yarn run build
    		yarn run start

      	#check if back-end running:  http://localhost:4001
    		#check if front-end running:  http://localhost:4000/scrum where /scrum is the basename that you specified in client/.env.production for REACT_APP_BASENAME and PUBLIC_URL

    		#If you are running it in linux box, you can do  with
    			  yarn run build
    			./start-scrum-master.sh   #which have all things set up
    																#and by default the admin account is with greatmaster
    																#and password being TheMasterIsGr8
    	#
    	#The program will pre-populate a default user name with default password defined in server/scripts/seedAdminUser.js
    	#

    5. How to run on DigitalOcean or other cloud VPS

    	#sign up on Digital Ocean
    	#create a project
    	#create a droplet under that project, choose latest ubuntu as OS
    		#buy a domain name from www.goddaddy.com or other domain providers
    		#Here we assume you have yourdomain.com
    	#create a firewall policy

    	#login into the ubuntu droplet with root

    		ssh root@xx.xx.xx.xx  #//here xx.xx.xx.xx is the IP address of your droplet

    		#Or ssh root@yourdomain.com

    		install nginx

    		install git

    		install nodejs

    		install npm

    		install yarn

    		install nano  #nano is an easy to use text editor

    		install mongodb

    		#follow https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

    		#start mognodb

    			systemctl start mongod

    		#download the source code of opensource-scrum-master:

    			cd $HOME
    			git clone git@github.com:haoyitedaniu/opensource-scrum-master.git

    		#compile the source code in production mode
    			cd opensource-scrum-master
    			npm install -g concurrently
    			npm install -g env-cmd

    			yarn run install #install the rest of the nodejs packages
    			yarn run build	 #build the client in production mode

    		#run opensource-scrum-master
    	  	chmod +x ./start-scrum-master.sh  #make it executable
       		./start-scrum-master.sh
    		# execute the program, which will run server on 4001 and client on 4000
    		# Note if you want to change ports, you need to edit ./start-scrum-master.sh file

    		#setup the nginx

    			systemctl stop nginx  #stop the nginx server

    			nano /etc/init.d/nginx/conf.d/local.conf  #edit a local server setup for the nginx

    			#Put the following content in the file

#=================/etc/init.d/nginx/conf.d/local.conf==============
server {
listen 443 ssl http2;
listen [::]:443 ssl http2;
server_name yourdomain.com; #Here you need to change to your own domain
root /usr/share/nginx/html;

    #ssl that works for https://yourdomain.com

    			#Here you will need to learn how to get a ssl key and ssl certificate
    			#for your domain See https://blog.hubspot.com/website/best-free-ssl-certificate-sources

        ssl_certificate /home/user-data/ssl/yourdomain-20240808-e3354f3b.pem;
        ssl_certificate_key /home/user-data/ssl/ssl_private_key.pem;

        error_page 404 /404.html;
            location = /40x.html {
        }
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }

        ssl_protocols TLSv1.2 TLSv1.3;

        #reverse proxy to front-end

        location /scrum/ {

                           proxy_pass http://127.0.0.1:4000/;  #here trailing / at the end is important
                           proxy_http_version 1.1;
                           proxy_set_header Upgrade $http_upgrade;
                           proxy_set_header Connection 'upgrade';
                           proxy_set_header Host $host;
                           proxy_cache_bypass $http_upgrade;
        }

        #reverse proxy to back-end of the scrum tool
        location /scrum/backend/  {
                           #rewrite /scrum/(.*) /$1  break;
                           proxy_pass http://127.0.0.1:4001/;  #here trailing / at the end is important
                           proxy_http_version 1.1;
                           proxy_set_header Upgrade $http_upgrade;
                           proxy_set_header Connection 'upgrade';
                           proxy_set_header Host $host;
                           proxy_cache_bypass $http_upgrade;
        }

}

server {
listen 443 ssl http2;
listen [::]:443 ssl http2;
server_name www.yourdomain.com;
root /usr/share/nginx/html;
ssl_certificate /home/user-data/ssl/yourdomain-20240808-e3354f3b.pem;
ssl_certificate_key /home/user-data/ssl/ssl_private_key.pem;

        error_page 404 /404.html;
            location = /40x.html {
        }
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
        ssl_protocols TLSv1.2 TLSv1.3;
        rewrite ^(.*) https://yourdomain.com$1 permanent;

}

#==================================================================

    			#Exit nano by Ctrl-x and choose save
    			#test the setup is okay

    			nginx -t

    			#fix any errors you may see from this "nginx -t" command above

    			#restart nginx if no errors

    			systemctl restart nginx

    		#How to visit the site: http://xx.xx.xx.xx/scrum to access front-end
    			# and http://xx.xx.xx.xx/scrum/backend to access back-end
    			# where the xx.xx.xx.xx is your server's IP address

    				# or http://www.yourdomain.com/scrum for front-end
    			# and http://www.yourdomain.com/scrum/backend for your backend
    			IP address of the server

    		#check the logs of the server/client run

    			cd $HOME/opensource-scrum-master
    			tail -f scrum-backend.log.txt   #Ctrl-c to quit viewing the log
    			tail -f scrum-frontend.log.txt  #Ctrl-c to quit viewing the log

    		#How to shutdown the server:

    			cd HOME/opensource-scrum-master
    			chmod +x ./kill-scrum-master.sh
    			./kill-scrum-master.sh   #will kill scrum-master codes and also codes running on port 4001 (back-end server) and 4000 (front-end client)
    			#Note if you use different ports, you need to edit ./kill-scrum-master.sh

    			#How to drop the database (on linux, assume you have mongo client installed)

    				mongo
    				>show dbs  #will show
    				>use opensource-scrum-database
    					#This is the databse by default for productin mode
    				>db.dropDatabse()  #becareful this is NOT reversible

Todo:

    1) hide stories and tasks to non-login users

    2) add projects model so that same site can be used to manage multiple projects

    3) assign users to one or multiple projects, so that different projects can have different set of users

    4) add project admin so that only project admin users can create/delete users to the project or create/delete user stories under that project

    5) CSS, allow showing stories list and login on mobile devices (so only showing up on wide screens)
