#!/bin/sh

cd /sobeyhive/app/images
wget http://tool.s3.91sc.top/sobey_cmbase-dotnet_runtime_1.0.0.tar

docker load < sobey_cmbase-dotnet_runtime_1.0.0.tar

