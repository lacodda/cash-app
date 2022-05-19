# ---- Base ----
FROM node:14-alpine AS base

# RUN npm config set registry http://registry.npmjs.org/ --global
# RUN npm config set strict-ssl false
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN yarn config set "strict-ssl" false

# RUN apk add --no-cache tini

# ENV appdir /var/www/gateway
# RUN mkdir -p ${appdir}
# WORKDIR ${appdir}
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies

# RUN ls -las
# install node packages
# RUN npm install -g @nestjs/cli
# RUN npm install 
# RUN npm install --only=dev
RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# ---- Build ----
FROM dependencies AS build

# RUN yarn build gateway
# RUN rm -rf apps/

# COPY . .

# ---- Release ----
FROM build AS release
# EXPOSE 3000
# CMD ["tini","npm", "run", "start"]
# RUN ls -las
CMD yarn start:dev
# ENTRYPOINT [ "node", "dist/apps/gateway/main.js" ]