#!/bin/bash

getWar(){
    cp ~/work/useme/server/target/server.war ./
}

removeWar(){
    sudo rm -rf /opt/tomcat/webapps/*
}

addWar(){
    removeWar
    sudo cp ~/work/useme/server/target/server.war /opt/tomcat/webapps/ 
}

clean(){
    cd ~/work/useme/
    mvn clean
}

cleanInstall(){
    cd ~/work/useme/
    mvn clean install -Dmaven.test.skip=true
}

startServer(){
    sudo service tomcat start
}

stopServer(){
    sudo service tomcat stop
}

startWeb(){
    cd ~/work/useme/frontend
    ws
}

all(){
    stopServer
    removeWar
    cleanInstall
    addWar
    startServer
}

if "$1" == "getWar"
then
    getWar
    
elif "$1" == "removeWar"
then
    removeWebApp
    
elif "$1" == "addWar"
then
    addWar

elif "$1" == "clean"
then
    clean
    
elif "$1" == "cleanInstall"
then
    cleanInstall

elif "$1" == "startServer"
then
    startServer

elif "$1" == "stopServer"
then
    stopServer

elif "$1" == "startWeb"
then
    startWeb

elif "$1" == "all"
then
    all
    
else
    echo "Invalid argument"
fi
