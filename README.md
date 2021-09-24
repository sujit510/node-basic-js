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

###### Note: This can be automated using one of following, so when you push code to github, it will build and push new image to docker hub:
1. Using Pro subscription of Docker hub.
1. Using Github Actions (Followed here in this repo-branch):
    1. Go to Dockerhub > Account Settings > Security > New Access Token > Add Description and access rights (Read/Write/Delete) > Create and Copy the access token.
    1. Go to Github Repo > Settings > Secrets > New
        1. Add DOCKER_HUB_USERNAME as Name and your docker hub username as Value
        1. Click Add Secret
        1. Similary create secret for DOCKER_HUB_ACCESS_TOKEN with value as dokcer hub access token obtained above.
    1. Go to Github Repo > Actions > New Workflow > Select Node.js template by clicking "Set up this workflow"
        1. Specify which events you want the build to be triggered, inside "on" section.
            ```
            # If you want to trigger the build everytime you push to "node-with-auto-build" branch
            on:
              push:
                branches: [ node-with-auto-build ]
            ```
        1. Check if the node-version inside node.js.yml has the node version you are using locally, else it throws error at the build time on Github Actions. You can change this later also.
        1. Add the "Login to Docker Hub" step to perform docker login as follows:
            ```
            - name: Login to Docker Hub
              uses: docker/login-action@v1
              with:
                  username: ${{ secrets.DOCKER_HUB_USERNAME }}
                  password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
            ```
        1. In the end, add steps to build and push the docker image to docker hub
            ```
            - run: docker build --tag ${{ secrets.DOCKER_HUB_USERNAME }}/nodebasic:0.1.0 .
            - run: docker push ${{ secrets.DOCKER_HUB_USERNAME }}/nodebasic:0.1.0
            ```
        1. Once done, click "Start Commit" button on right side.
            1. It asks if you want to check in into main branch or want to create new one (and then raise PR), select accordingly.
            1. Basically, tt adds a new file node.js.yml at .github/workflows path (Already checked in this repo-branch)

        1. Now go to Actions and see if build process has started. This will get triggered everytime any change happens to repo as indicated in "on" section

#### Deploy to Cloud (AWS)
1. Create cloud instance for compute (here, EC2)
1. SSH to it
1. Install NGINX
    1. sudo apt update
    1. sudo apt-get install nginx
    1. Check nginx status by following command:
        ```
        sudo service nginx status
        ```
    1. If not started automatically, you may need to start the service
        ```
        sudo service nginx start
        # For restart
        sudo service nginx restart
        ```
1. Install Docker
    1. Remove old docker
        ```
        sudo apt-get purge docker-ce
        sudo rm -rf /var/lib/docker
        ```
    1. Add GPG key for the official Docker repository to the system:
        ```
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add
        ```
    1. Add the Docker repository to APT sources
        ```
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
        ```
    1. Update packages
        ```
        sudo apt-get update
        ```
    1. Run following to avoid installing Ubuntu repo and use docker instead
        ```
        apt-cache policy docker-ce
        ```
    1. Run install command
        ```
        sudo apt-get install docker-ce
        ```
    1. Check status
        ```
        sudo systemctl status docker
        ```
    1. Set user
        ```
        sudo usermod -aG docker ${USER}
        sudo su - ${USER}
        ```
1. Install docker-compose
    1. Download Docker Compose
        ```
        sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        ```
    1. Apply executable permissions to the binary
        ```
        sudo chmod +x /usr/local/bin/docker-compose
        ```
    1. Check the version and status
        ```
        docker-compose --version
        ```
1. Now, at some appropriate place, create a folder, inside that create docker-compose.yml file
1. Inside docker-compose.yml, paste following
    ```
    version: '3'
    services:
      nodebasic:
        image: sujit510/nodebasic:0.2.0
        container_name: nodebasic
        ports:
                - 8000:8000
        expose:
          - "8000"
        environment:
          - APP_PORT:8000

    volumes:
      nodebasic-data:

    networks:
      default:
        external:
          name: nodebase-net
    ```
1. Create bash script (update-app.sh) to restart server
    ```
    docker-compose pull && docker-compose down && docker-compose up -d
    ```
1. Now create docker network
    ```
    docker network create -d overlay --attachable nodebase-net
    ```
1. Start the server by running bash script file
    ```
    sh update-app.sh
    ```
1. Verify that you are able to curl to the container
    ```
    # This should return text as "Hello World with Nodemon+TS!"
    curl localhost:8000
    ```
1. Now go to /etc/nginx/sites-enabled/
1. Edit "default" file to add new server section as follows:
    ```
    server {
          listen 80;
          server_name <your domain>; # e.g. server_name myapi.google.com
          location / {
                  proxy_pass http://localhost:8000;
          }
    }
    ```
1. Save, Exit and restart the nginx
    ```
    sudo service nginx restart
    ```
1. Done!!! You should be able to send GET and POST requests to your endpoint
