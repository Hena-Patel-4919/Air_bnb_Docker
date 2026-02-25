FROM nginx:alpine

COPY dashboard.html /usr/share/nginx/html/index.html
COPY dashboard.css /usr/share/nginx/html/
COPY dashboard.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]