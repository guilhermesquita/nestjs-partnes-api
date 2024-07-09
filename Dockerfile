FROM node:21-slim

RUN apt update && apt install -y openssl procps

RUN npm cache clean --force

RUN npm install -g @nestjs/cli@10.3.2

# Definir diretório de trabalho
WORKDIR /home/node/app

USER node

CMD tail -f /dev/null