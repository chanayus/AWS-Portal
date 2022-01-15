FROM node:14

WORKDIR /usr/src/app

# Installing dependencies
COPY . /usr/src/app
RUN npm install

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD ["npm", "run", "start"]