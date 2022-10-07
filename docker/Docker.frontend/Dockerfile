FROM node:16

RUN apt-get update && apt-get install -y

RUN mkdir /code
RUN mkdir /code/server/

COPY /frontend /code/frontend

ADD .eslintrc.js .prettierrc tsconfig.json package.json /code/

# schema.json is just being coppied to the dockerfile so when the base .eslintrc.js
# is read by the .eslintrc.js in the frontend folder it doesn't throw
# that schema is not used since the schema is copied over from the server/src/generated folder
# alternatively, in docker-compose we could mount the server volume but that seem's like an overkill
ADD server/src/services/graphql/generated/schema.json /code/server/src/services/graphql/generated/schema.json

WORKDIR /code
RUN yarn install

WORKDIR /code/frontend
RUN yarn install

EXPOSE 3000

# for prod
# RUN yarn build
# CMD ["yarn", "start"]

CMD ["yarn", "dev"]
