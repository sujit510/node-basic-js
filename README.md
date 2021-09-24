# node-basic-js

This is basic NodeJS project.

### Steps:
1. git checkout https://<personal_token>@github.com/sujit510/node-basic-js.git
1. cd node-basic-js
1. npm i
1. Run - nodemon OR npm start


### To build docker img
1. Add Dockerfile (already in repo)
1. docker build --tag sujit510/nodebasic .
1. docker push sujit510/nodebasic
(If you get error as "denied: requested access to the resource is denied", try "docker login", or "docker logout" and then "docker login")

##Note: This can be automated using Pro subscription of Docker hub. So when you push code to github, it will build and push new image to docker hub
