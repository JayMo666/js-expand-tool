#!/bin/bash/env sh
set -e
echo "Enter release version:"
read VERSION
echo "Releasing $VERSION ..."
#commit
git add -A
git commit -m "[build] $VERSION"
# npm version $VERSION --meassage "[release] $VERSION"
git push origin master
echo 'success push to github!'
#publish
npm publish