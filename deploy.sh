#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add .
git commit -m 'New Deployment'
git subtree push --prefix dist origin gh-page

cd -