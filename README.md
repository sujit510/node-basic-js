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
### Autiomate the build creation
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

    ##### Note: More can be referred here: https://docs.docker.com/ci-cd/github-actions/
    #### Optimizing the Git Actions Workflow:
    1. 
    


