#!/bin/bash

cd ~/dotfiles

git add .
git commit -m "Updated dotfiles on $(date)"
git push