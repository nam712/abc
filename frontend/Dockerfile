FROM node:alpine AS build

WORKDIR /usr/src/app
# package-lock.json ./
COPY package.json ./   

RUN npm install 

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /usr/src/app/dist/frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


#COPY mime.types /etc/nginx/mime.types

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]