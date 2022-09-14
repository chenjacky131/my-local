1. 安装typescript(编译用)
````
cnpm i typescript -g
//  查看版本
tsc -v
//  生成配置文件
tsc  --init
//  编辑ts文件成js
tsc *.ts
````
2. 安装ts-node(直接调用ts文件，就不需要编译)
````
//  直接执行ts文件
ts-node *.ts
````
