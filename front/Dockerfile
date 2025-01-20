FROM node:latest AS frontend
WORKDIR /app

ARG VITE_BACKEND_IP
ENV VITE_BACKEND_IP $VITE_BACKEND_IP
ARG VITE_DEBUG
ENV VITE_DEBUG $VITE_DEBUG

RUN npm install -g serve

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
