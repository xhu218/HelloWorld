#!/bin/sh
sed -i 's/<IsLoggingReceiveMessage>false<\/IsLoggingReceiveMessage>/<IsLoggingReceiveMessage>true<\/IsLoggingReceiveMessage>/g' /sobeyhive/app/cmserver-1.4.0/CMServer/Config/NHostConfig.WebApi.CMApi.xml
sed -i 's/<IsLoggingReplyMessage>false<\/IsLoggingReplyMessage>/<IsLoggingReplyMessage>true<\/IsLoggingReplyMessage>/g' /sobeyhive/app/cmserver-1.4.0/CMServer/Config/NHostConfig.WebApi.CMApi.xml
sed -i 's/<EnableRecordRequest>false<\/EnableRecordRequest>/<EnableRecordRequest>true<\/EnableRecordRequest>/g' /sobeyhive/app/cmserver-1.4.0/CMServer/Config/NHost.Core.NHostMainConfig.xml 

