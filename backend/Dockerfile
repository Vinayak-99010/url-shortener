
FROM node:18
WORKDIR /app
COPY . .
RUN npm install express redis shortid
EXPOSE 5000
CMD ["node", "index.js"]
