# leanote-all

[![Build Status](https://travis-ci.org/leanote/leanote-all.svg)](https://travis-ci.org/leanote/leanote-all)

The repository contains leanote source and dependencies, just for developers.

## Current version

* leanote-v2.6-beta
* revel 0.18.0
* [mgo](http://blog.labix.org/2015/01/24/readying-mgo-for-mongodb-3-0) support for mongodb-3.0

## How to install leanote

* [How to install leanote](https://github.com/leanote/leanote/wiki/leanote-develop-distribution-installation-tutorial)
* [安装leanote](https://github.com/leanote/leanote/wiki/leanote%E5%BC%80%E5%8F%91%E7%89%88%E8%AF%A6%E7%BB%86%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B)


1. 下载 golang >= 1.7, http://golangtc.com/download
```
$> cd /home/user1
$> tar -xzvf go1.6.linux-amd64.tar.gz
mkdir /home/user1/gopackage
sudo vi ~/.bash_profile

export GOROOT=/home/user1/go
export GOPATH=/home/user1/gopackage
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

source ~/.bash_profile
```
2. 下载 https://github.com/leanote/leanote-all/archive/master.zip, 将src文件夹复制到 /home/user1/gopackage/

```
go install github.com/revel/cmd/revel
```


3. 安装Mongodb version >= 3

4. 导入初始数据

```
$> mongorestore -h localhost -d leanote --dir /home/user1/gopackage/src/github.com/leanote/leanote/mongodb_backup/leanote_install_data


user1 username: admin, password: abc123 (管理员, 只有该用户才有权管理后台, 请及时修改密码)
user2 username: demo@leanote.com, password: demo@leanote.com (仅供体验使用)
```

5. 运行
```
revel run github.com/leanote/leanote
// http://127.0.0.1:9000
```

