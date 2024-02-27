#!/bin/bash


# https://betterstack.com/community/questions/how-to-run-cron-jobs-every-5-10-or-30-seconds/


i=0

# 12 five-second intervals in 1 minute

while [ $i -lt 12 ]; do 
  node /root/disneyp/pupdis/gmail.js & #run your command
  sleep 5
  i=$(( i + 1 ))
done



# https://unix.stackexchange.com/questions/163352/what-does-dev-null-21-mean-in-this-article-of-crontab-basics

* * * * * cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1
* * * * * sleep 10; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1
* * * * * sleep 20; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1
* * * * * sleep 30; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1
* * * * * sleep 40; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1
* * * * * sleep 50; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1

# add to crontab

(crontab -l ; echo "* * * * * cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1") | sort - | uniq - | crontab -
(crontab -l ; echo "* * * * * sleep 20; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1") | sort - | uniq - | crontab -
(crontab -l ; echo "* * * * * sleep 40; cd /root/disneyp/pupdis && /root/.nvm/versions/node/v18.12.0/bin/node /root/disneyp/pupdis/gmail.js >/dev/null 2>&1") | sort - | uniq - | crontab -
