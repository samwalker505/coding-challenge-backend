## Prerequites

Please make sure you have internet access and
docker, docker-compose, npm ready

## installation

### Notice: because the frontend woold proxy to the backend, please make sure the backend run first

### backend

1. `git clone git@github.com:samwalker505/finddoc-backend.git`

2. `cd finddoc-backend`

3. `docker-compose up`

the backend should run at `localhost:8080`

you can run the test case to make sure it is ok

1. `npm install`

2. `npm run test`

### frontend

1. `git clone git@github.com:samwalker505/finddoc-frontend.git`

2. `cd finddoc-frontend`

3. `yarn`

4. `yarn start`

the frontend will run at `localhost:3000`
