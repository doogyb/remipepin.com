#! /bin/bash

ng build
cd dist
rsync -azvP remi/ ubuntu@doogyb.me:/home/ubuntu/Sites/remi.com
