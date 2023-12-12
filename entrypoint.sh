#!/bin/sh
yarn db:migrate
yarn db:seed
yarn build
yarn start:debug

