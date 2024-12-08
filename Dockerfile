FROM node:20-alpine as build_image
WORKDIR /app/react-app

COPY package.json .
COPY package-lock.json* .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as production_image
WORKDIR /app/react-app

COPY --from=build_image /app/react-app/dist/ /app/react-app/dist/

COPY package.json .
COPY vite.config.ts .
RUN npm install typescript

EXPOSE 9191

CMD ["npm", "run", "preview"]