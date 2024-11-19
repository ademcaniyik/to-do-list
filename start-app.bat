@echo off
cd /d %~dp0
start pm2 start ecosystem.config.js
