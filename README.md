# HAPI micro-service template

## Summary
This is basic HAPI micro-service to be used as a starting place for a micro-service project. As a convenience it includes the following package/frameworks:
* TypeScript
* spryly
  * TypeScript classes and decorations for HapiJS
* HapiJS
  * [Simple, secure, powerful, scalable, micro-service framework](https://hapi.dev/)
* TSLint pre-configured
* Jest test framework
* Git ignore pre-configured
* Opinionated micro-service layout (api, plugin, service, hierarchy)
  * Installation scripts
  * Docker builds

## Dependencies
* Node 10.x+
* VS Code (not really but it's a really great dev tool)

## Build
* Clone this repo
* Install it
  ```
  cd hapi-template
  npm i
  code .
  ```
* In VS Code open `./configs/imageConfig.json` and create a name for your docker image. E.g.
  ```
  {
      "arch": "amd64",
      "imageName": "yourcontainerregistry.azurecr.io/yourmodulename"
  }
  ```
* Build it
  ```
  npm run dockerbuild
  ```
  This will build the source into a docker container and upload it to your container registry. It will use the version tag from the `package.json` version field. In the future you can use the `version` command which will increase the `package.json` version number, test, then build, then upload.
  ```
  npm version patch
  ```
  In the `./configs/imageConfig.json` you can specify `amd64` for the 64bit build or `arm32v7` for the Arm build. These correspond to the Dockerfile's in the `./docker` directory. Feel free to create other flavors.
