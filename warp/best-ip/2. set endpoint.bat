@echo off
chcp 936 > nul
set endpoint=162.159.192.1:2408
set /p endpoint=��������ѡ�˵�(Ĭ��%endpoint%):
warp-cli.exe clear-custom-endpoint
warp-cli.exe set-custom-endpoint %endpoint%
echo ��ǰ�˵��Ѿ�����Ϊ %endpoint%
pause