#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:prleasing/kuku.git main:gh-pages
cd -
