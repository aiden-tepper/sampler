FROM node:18-alpine
ENV NODE_ENV=production
COPY . .
RUN npm install --production
CMD [ "npm", "run", "start"]
