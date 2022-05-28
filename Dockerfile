FROM node:lts
WORKDIR /app
COPY package.json /app/package.json
RUN yarn
COPY . /app
RUN npx prisma generate
ENV PORT=4000
EXPOSE 4000
RUN yarn build
CMD [ "yarn" , "start" ]