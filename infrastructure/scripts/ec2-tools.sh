#!/bin/bash

sudo yum update -y
sudo yum install docker -y

sudo curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

sudo yum install -y git

sudo service docker start