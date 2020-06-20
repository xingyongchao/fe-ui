#FROM nginx
FROM ycr.yonyoucloud.com/base/nginx:1.15-alpine-perl
ADD dist /workbench/dist
ADD zh_CN /workbench/dist/zh_CN
ADD en_US /workbench/dist/en_US
ADD zh_TW /workbench/dist/zh_TW
ADD default.conf /etc/nginx/conf.d/default.conf