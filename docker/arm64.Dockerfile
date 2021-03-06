FROM arm64v8/node:10-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    net-tools \
    unzip \
    systemd-sysv \
    && rm -rf /var/lib/apt/lists/*

ENV WORKINGDIR /app
WORKDIR ${WORKINGDIR}

ADD package.json ${WORKINGDIR}/package.json
ADD tslint.json ${WORKINGDIR}/tslint.json
ADD tsconfig.json ${WORKINGDIR}/tsconfig.json
ADD src ${WORKINGDIR}/src
ADD hapiTypes.d.ts ${WORKINGDIR}/hapiTypes.d.ts

RUN npm install -q && \
    cp ./hapiTypes.d.ts ./node_modules/@types/hapi__hapi/index.d.ts && \
    ./node_modules/.bin/tsc -p . && \
    ./node_modules/.bin/tslint -p . && \
    npm prune --production && \
    rm -f tslint.json && \
    rm -f tsconfig.json && \
    rm -f hapiTypes.d.ts && \
    rm -rf src

HEALTHCHECK \
    --interval=30s \
    --timeout=30s \
    --start-period=60s \
    --retries=3 \
    CMD curl -f http://localhost:9010/health || exit 1

EXPOSE 9010

CMD ["node", "./dist/index"]
