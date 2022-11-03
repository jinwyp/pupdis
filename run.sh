#!/bin/bash


# https://betterstack.com/community/questions/how-to-run-cron-jobs-every-5-10-or-30-seconds/


i=0

# 12 five-second intervals in 1 minute

while [ $i -lt 12 ]; do 
  node /root/disneyp/pupdis/gmail.js & #run your command
  sleep 5
  i=$(( i + 1 ))
done


* * * * *  node /root/disneyp/pupdis/gmail.js
* * * * * sleep 10; node /root/disneyp/pupdis/gmail.js
* * * * * sleep 20; node /root/disneyp/pupdis/gmail.js
* * * * * sleep 30; node /root/disneyp/pupdis/gmail.js
* * * * * sleep 40; node /root/disneyp/pupdis/gmail.js
* * * * * sleep 50; node /root/disneyp/pupdis/gmail.js
