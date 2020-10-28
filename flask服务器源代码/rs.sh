killall python3
echo "已经关闭所有python3后台"
screen -dm python3 ${1}
if [ "${1}" != "" ];then
echo "=> 后台开始运行" ${1} 
else
    echo "=> 没有输入文件"
fi
