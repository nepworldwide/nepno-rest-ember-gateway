FROM node:14.0.0-alpine
COPY . /opt/rest-ember-gateway
WORKDIR /opt/rest-ember-gateway
EXPOSE 80/tcp 
EXPOSE 80/udp
ENTRYPOINT ["yarn", "start"]
#--cachedClient seems not to work. Reported in https://github.com/olzzon/rest-ember-gateway/issues/18
#CMD ["--cachedClient"]
