FROM node

WORKDIR /app/customer

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "install"]