#!/bin/bash
# script to automate deployments from main, best way would be to ssh but i guess its not allowed :/
# crontab -e 
# * * * * * run-one ~/.local/bin/cron/deploy.sh >> ~/.deploy.log 2>&1
source ~/.bashrc

cd "$(dirname "$0")"

sha_file="groovy-gurus-main-commit-sha.txt"
if [[ ! -f $sha_file ]]; then
	touch $sha_file
fi

deployed_sha=$(<$sha_file)
latest_sha=$(git ls-remote git@git.doit.wisc.edu:cdis/cs/courses/cs506/sp2023/l2_41/groovy-gurus.git main)

if [[ "$deployed_sha" == "$latest_sha" ]] ;then
	echo "$(date +%F_%T): Latest commit(${latest_sha}) already deployed"
  exit
fi

docker-compose -f groovy-gurus/docker-compose.yml down 
rm -rf groovy-gurus
git clone git@git.doit.wisc.edu:cdis/cs/courses/cs506/sp2023/l2_41/groovy-gurus.git
chmod -R 777 groovy-gurus
cd groovy-gurus
env > .env
docker-compose up --build --detach

echo "$latest_sha" > ../$sha_file
