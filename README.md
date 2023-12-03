	This is open source scrum master tool that is suitable for small teams and for open source development

	1. How to download

		On Linux/Mac (run in your home folder)
			cd $HOME
			git git@github.com:haoyitedaniu/opensource-scrum-master.git
		On Windows (run in your documents folder)
			Install gitbash following with https://git-scm.com/downloads
			cd $HOME/Documents
			git clone git@github.com:haoyitedaniu/opensource-scrum-master.git

	2. How to compile
		#install NodeJs following https://nodejs.org/en/download 
		#install npm following https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
		#install yarn by

		npm install -g yarn


		#install packages for opensource-scrum-master server and client
		cd opensource-scrum-master 
		yarn run install 

		#compile the client 
		yarn run build


	3. How to install mongodb
		#This program uses mongodb community version and mongoose for back-end 
		#Install mongodb following https://www.mongodb.com/docs/manual/administration/install-community/	
		
	4. How to run on local machine

		yarn start

		#
		#The program will pre-populate a default user name with default password defined in server/scripts/seedAdminUser.js
		#

	5. How to run on DigitalOcean or other cloud VPS 
		
		#sign up on Digital Ocean

		#create a project

		#create a droplet under that project, choose latest ubuntu as OS

		#create a firewall policy

		#login into the ubuntu droplet with root

			ssh root@xx.xx.xx.xx  #//here xx.xx.xx.xx is the IP address of your droplet

			#install nginx

			#install git

			#install nodejs

			#install npm

			#install yarn 


			#install nano  #nano is an easy to use text editor

			#install mongodb 

				#follow https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

			#start mognodb

				systemctl start mongod 

			#download the source code of opensource-scrum-master:

		
				cd $HOME
				git clone git@github.com:haoyitedaniu/opensource-scrum-master.git

			#compile the source code

				cd opensource-scrum-master
				yarn run install
				yarn run build
			
			#run opensource-scrum-master
		  		chmod +x ./start-scrum-master.sh  #make it executable 
				./start-scrum-master.sh		# execute the program, which will run server on 3001 and client on 3000
								# if you want to change ports, you need to edit ./start-scrum-master.sh file 

			#setup the nginx 

				systemctl stop nginx  #stop the nginx server

				nano /etc/init.d/nginx/conf.d/local.conf  #edit a local server setup for the nginx 
				
				#Put the following content in the file

				#=================/etc/init.d/nginx/conf.d/local.conf==============



				#==================================================================


				#Exit nano by Ctrl-x and choose save
				#test the setup is okay

				nginx -t

				#fix any errors you may see from this "nginx -t" command above
				
				#restart nginx if no errors
				
				systemctl restart nginx

	
			#How to visit the site: http://xx.xx.xx.xx/scrum   #where the xx.xx.xx.xx is the IP address of the server 
	
			#check the logs of the server/client run

				cd $HOME/opensource-scrum-master 
				tail -f scrum-backend.log.txt   #Ctrl-c to quit viewing the log

				tail -f scrum-frontend.log.txt  #Ctrl-c to quit viewing the log


			#How to shutdown

				cd HOME/opensource-scrum-master
				chmod +x ./kill-scrum-master.sh 
				./kill-scrum-master.sh   #will kill scrum-master codes and also codes running on port 3001 (back-end server) and 3000 (front-end client)

				#Note if you use different ports, you need to edit ./kill-scrum-master.sh


Todo:

	1)hide stories and tasks to non-login users

	2)add projects model so that same site can be used to manage multiple projects

	3)Assign users to one or multiple projects, so that different projects can have different set of users

	4)Add project admin so that only project admin users can create/delete users to the project or create/delete user stories under that project

	
