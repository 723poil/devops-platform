FROM node:18-alpine

WORKDIR /usr/src/app

#RUN apk update && apk add bash
#RUN apk add --no-cache bash
#RUN apk --no-cache add tzdata && \
#    cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
#    echo "Asia/Seoul" > /etc/timezone \
#    apk del tzdata

COPY package*.json ./
RUN npm install -g pnpm pm2
RUN pnpm install

RUN ls

COPY ./.env ./
COPY ./pm2.config.js ./
COPY ./dist ./

EXPOSE 3031

CMD ["sh", "-c", "pm2-runtime start pm2.config.js"]
