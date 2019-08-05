#!/bin/bash/env sh
set -e
echo "Enter release version:"
read VERSION
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo # (optional) move to a new line
if true
then
  echo "Releasing $VERSION ..."

  #commit
  git add -A
  git commit -m "[build] $VERSION"
  # npm version $VERSION --meassage "[release] $VERSION"
  git push origin master
  echo 'success push to github!'
  #publish
  npm publish
fi