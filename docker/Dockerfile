FROM nginx:latest

COPY docker/nginx/nginx.prod.conf /etc/nginx/nginx.prod.conf
COPY docker/nginx/nginx.dev.conf /etc/nginx/nginx.dev.conf

ARG ENV=dev
ENV ENV=${ENV:-dev} 

CMD sh -c "cp /etc/nginx/nginx.$ENV.conf /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
