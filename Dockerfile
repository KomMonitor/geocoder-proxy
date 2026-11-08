# Node.js >= 26.12.1 (or 24.22.1 / 22.23.4) is required: fixes CVE-2026-111497 (Brotli decoder OOB write in node:zlib)
FROM node:26.13.0-alpine
RUN mkdir -p /code
COPY . /code
WORKDIR /code
RUN npm ci --omit=dev

#increase heap size to 4 GB
#ENV NODE_OPTIONS=--max_old_space_size=4096

EXPOSE 8090
# start node directly: "npm start" would run the prestart "npm install" and pull devDependencies into the container
CMD ["node", "index.js"]
