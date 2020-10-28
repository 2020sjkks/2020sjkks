from flask import Flask
from flask import request, json,Response,send_file, send_from_directory
import pymysql
import json
import simplejson #可以解决decimal无法序列化的问题
import datetime
#import matplotlib
#指定默认字体
#matplotlib.rcParams['font.sans-serif'] = ['SimHei'] 
#matplotlib.rcParams['font.family']='sans-serif'
#解决负号'-'显示为方块的问题
#matplotlib.rcParams['axes.unicode_minus'] = False
#import matplotlib.pyplot as plt

DATABASE='meituan'#数据库名称
USER='root'#数据库用户
PASSWORD='sjkks'#数据库密码

app = Flask(__name__)
@app.route('/')
def hello_world():
    return "this is Get method!"

@app.route('/goods',methods=['POST'])  #访问地址设置为http://brucemarkdown.top:5000/goods  访问方法为POST
def goods():
    """
    用POST方法返回商品信息
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) #用用户名、密码登录数据库
    cursor = db.cursor()    #定义一个sql执行对象
    sql="select gid,gname,gphoto,gprice from good where gonsale=1;"   #写sql查询语句                  
    cursor.execute(sql)      #用sql执行对象执行sql语句
    res1=cursor.fetchall()   #执行对象返回所有查询结果到res     
    return simplejson.dumps(res1)   #返回查询结果到前端

@app.route('/sales')
def sales():
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()  
    sql2="SELECT sum(quantity) FROM `order_detail` right outer join good on good.gid=order_detail.gid where gonsale=1 GROUP BY (good.gid)" #需要外连接
    cursor.execute(sql2)
    res2=cursor.fetchall()
    return simplejson.dumps(res2)

@app.route('/goodinfo',methods=['POST']) 
def goodinfo():
    """
    用POST方法返回对应商品id的详细信息
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    good_id=request.json['good_id']
    sql="select * from good where gid="+str(good_id)+";"      
    sql2="SELECT user.uname,date_format(`order`.otime,'%Y-%m-%d'), order_detail.`comment`,uphoto FROM `user`,order_detail,`order` where order_detail.oid=order.oid and order.uid=user.uid and order_detail.`comment`!='' and order_detail.gid="+str(good_id)+";" 
    #sql2="select comment from order_detail where gid="+str(good_id)+";"        
    cursor.execute(sql)    
    res1=cursor.fetchall()
    cursor.execute(sql2)
    res2=cursor.fetchall()
    result={'info':res1,'comment':res2}   
    return json.dumps(result, default=str)   #返回查询结果到前端
    

@app.route('/image/<imagename>.jpg')
def getimage(imagename):
    '''
    所有图片都放在/home/sjkks/sjk/img/目录下
    该函数通过文件名获取图片
    '''
    img_local_path='/home/sjkks/sjk/img/'+imagename+'.jpg'
    return send_file(img_local_path, mimetype='image/jpeg')

@app.route("/upload_photo", methods=['POST']) 
def upload_photo():
    '''
    上传菜品图片
    '''
    photo =  request.files['file']
    postdata = request.form['gid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="update good set gphoto="+str(postdata)+" where gid="+str(postdata)+";"
    try:
        cursor.execute(sql)
        db.commit()
        photo.save("/home/sjkks/sjk/img/"+str(postdata)+".jpg")
        return 'succeed'
    except:
        db.rollback()
        return 'fail'

@app.route("/upload_user_photo", methods=['POST']) 
def upload_user_photo():
    '''
    上传用户图片
    '''
    photo =  request.files['file']
    uid = request.form['uid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="update user set uphoto='u"+str(uid)+"' where uid="+str(uid)+";"
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
        photo.save("/home/sjkks/sjk/img/u"+str(uid)+".jpg")
        print("/home/sjkks/sjk/img/u"+str(uid)+".jpg")
        return 'succeed'
    except:
        db.rollback()
        return 'fail'
    

@app.route('/setphone', methods=['POST'])
def setphone():
    """
    设置电话，接收参数uid和input(要更改的电话)。
    """
    uid=request.json['uid']
    input=request.json['input']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    sql="update user set uphone='"+input+"' where uid="+str(uid)+";"
    try:
        cursor.execute(sql)
        db.commit()
        return {'state':'succeed'}
    except pymysql.err.InternalError as err: #手机号码格式匹配不对
        return {'state':str(err)}
    except:
        db.rollback()
        return {'state':'fail'}
        
@app.route('/setaddress', methods=['POST'])
def setaddress():
    """
    设置电话，接收参数uid和input(要更改的地址)。
    """
    uid=request.json['uid']
    input=request.json['input']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    sql="update user set uaddress='"+input+"' where uid="+str(uid)+";"
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return "fail"
    

@app.route('/login', methods=['POST'])
def login():
    """
    登录，比较密码。
    """
    name=request.json['name']
    password=request.json['password']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    sql="select count(*) from user where uname='"+name+"';"
    cursor.execute(sql)
    result=cursor.fetchall()[0][0]
    if result==0:
        thang={
            'state':'not_exist'
        }
        return simplejson.dumps(thang)
    elif result>0:
        sql2="select * from user where uname='"+name+"';"
        cursor.execute(sql2)
        user_info=cursor.fetchall()[0]
        true_password=user_info[4]
        if true_password==password:
            thang={
                'state':'succeed',
                'user_info':user_info
            }
            return simplejson.dumps(thang)
        else:
            thang={
            'state':'fail'}
        return simplejson.dumps(thang)



@app.route('/register', methods=['POST'])
def register():
    """
    注册账号，若用户名已在数据库中则返回"exist";若用户名不存在则插入(用户名，密码)，返回"succeed".
    """
    name=request.json['name']
    password=request.json['password']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    sql="select count(*) from user where uname='"+name+"';"
    cursor.execute(sql)
    result=cursor.fetchall()[0][0]
    if result>0:
        return 'exist'
    elif result==0:
        sql2="insert into user values(null,'"+name+"',null,null,'"+password+"',null);"
        try:
            cursor.execute(sql2)
            db.commit()
            return 'succeed'
        except:
            db.rollback()
            return "fail"

@app.route('/set_user_name', methods=['POST'])
def set_user_name():
    uid=request.json['uid']
    input_name=request.json['input_name']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    sql="select count(*) from user where uname='"+input_name+"';"
    cursor.execute(sql)
    result=cursor.fetchall()[0][0]
    print(result)
    if result>0:
        return 'exist'
    elif result==0:
        sql2="update user set uname='"+input_name+"' where uid="+str(uid)+";"
    try:
        cursor.execute(sql2)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return "fail"

@app.route('/set_user_password', methods=['POST'])
def set_user_password():
    uid=request.json['uid']
    input_new_password=request.json['input_new_password']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    sql="update user set upassword='"+input_new_password+"' where uid="+str(uid)+";"
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return "fail"


@app.route('/order',methods=['POST'])
def order():
    '''
    用户提交下单信息 若返回succeed则代表下单成功,同时返回订单id号
    '''
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    data=request.json
    print("提交订单",data)
    uid=data['uid']
    selected=data['goods']
    totalprice=data['totalprice']
    address=data['address']
    phone=data['phone']
    if phone==None or address==None:
        return {'result':'wrong'}
    dt=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") #格式化当前时间
    sql="INSERT INTO `meituan`.`order`( `uid`, `accepted`, `totalprice`,otime,address,phone) VALUES ( +"+str(uid)+", 0, "+str(totalprice)+",'"+dt+"','"+address+"',"+phone+");"
    cursor.execute(sql)
    sql="SELECT LAST_INSERT_ID();" #获取该订单的订单号
    cursor.execute(sql)
    oid=cursor.fetchall()[0][0]
    print("返回单号:",oid)
    for key in selected.keys(): #遍历点菜信息
        if(selected[str(key)]!=0):
            sql="insert into order_detail values("+str(oid)+","+str(key)+",null,null,"+str(selected[str(key)])+")"
            cursor.execute(sql)
    try:
        db.commit()
    except:
        db.rollback()
        return {"result":"fail","id":0}
    return {"result":"succeed","id":oid}

@app.route('/orderinfo',methods=['POST'])
def orderinfo():
    '''
    通过订单号查询具体订单信息
    '''
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()
    data=request.json
    #print(data)
    oid=data['oid']
    sql='select gname,gphoto,gprice,quantity,otime,totalprice,accepted,good.gid,`order`.phone,`order`.address,courier,courier_phone from `order`,order_detail,good where good.gid=order_detail.gid and `order`.oid=order_detail.oid and `order`.oid='+str(oid)
    cursor.execute(sql)
    db.commit()
    res=cursor.fetchall()
    #print(res)
    res= {'result':'succeed','data':res}
    return json.dumps(res, indent=2, sort_keys=True, default=str)

@app.route('/get_user_order',methods=['POST'])
def get_user_order():
    """
    查询某个uid的订单。
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    uid=request.json['uid']
    print(uid)
    sql="select * from `order` where uid="+str(uid)+" order by otime desc;"
    cursor.execute(sql)    
    res=cursor.fetchall()
    print(res)
    return json.dumps(res, indent=5, sort_keys=True, default=str)


@app.route('/get_comment',methods=['POST'])
def get_comment():
    """
    查询某个oid,gid的评价
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    oid=request.json['oid']
    gid=request.json['gid']
    sql="select score,comment from order_detail where oid="+str(oid)+" and gid="+str(gid)+";"
    cursor.execute(sql)    
    res=cursor.fetchall()
    return json.dumps(res,default=str)

@app.route('/get_introd',methods=['POST'])
def get_introd():
    """
    查询某个菜的平均分 菜的id传进来 返回菜的平均分数
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    gid=request.json['good_id']
    sql="select avg_score from user_good where gid="+str(gid)
    print(sql)
    cursor.execute(sql)    
    res=cursor.fetchall()
    return simplejson.dumps(res)

@app.route('/set_comment',methods=['POST'])
def set_somment():
    """
    修改某个oid,gid的评价
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    oid=request.json['oid']
    gid=request.json['gid']
    input=request.json['input']
    score=request.json['score']
    if input is None and score is not None:
        print('1!')
        sql="update order_detail set score="+str(score)+" where oid="+str(oid)+" and gid="+str(gid)+";"
    if score is None and input is not None:
        print('2!')
        sql="update order_detail set comment='"+input+"' where oid="+str(oid)+" and gid="+str(gid)+";"
        print(sql)
    if score is not None and input is not None:
        print('3!')
        sql="update order_detail set comment='"+input+"', score="+str(score)+" where oid="+str(oid)+" and gid="+str(gid)+";"
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return "fail"

@app.route('/add_good',methods=['POST'])
def add_good():
    '''
    添加商品
    '''
    data=request.json
    print(data)
    gname=data['gname']
    gdetail=data['gdetail']
    gprice=data['gprice']
    gphoto=data['gphoto']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="insert into good(gname,gdetail,gphoto,gprice,gonsale) values('"+gname+"','"+gdetail+"','"+gphoto+"',"+str(gprice)+",1);"
    try:
        cursor.execute(sql)
        sql="SELECT LAST_INSERT_ID();" #获取该订单的订单号
        cursor.execute(sql)
        gid=cursor.fetchall()[0][0]
        db.commit()
        return {'state':'succeed','gid':gid}
    except pymysql.err.InternalError as err: #价格为负
        return {'state':str(err)}
    except:
        db.rollback()
        return {'state':'fail'}

@app.route('/edit_good',methods=['POST'])
def edit_good():
    '''
    修改商品信息
    '''
    data=request.json
    gid=data['gid']
    gname=data['gname']
    gdetail=data['gdetail']
    gprice=data['gprice']
    gphoto=data['gphoto']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="update good set gname='"+gname+"',gdetail='"+gdetail+"',gprice="+str(gprice)+",gphoto='"+gphoto+"' where gid="+str(gid)
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except pymysql.err.InternalError as err: #价格为负
        return {'state':str(err)}
    except:
        db.rollback()
        return {'state':'fail'}


@app.route('/delete_good',methods=['POST'])
def delete_good():
    '''
    删除商品
    '''
    data=request.json
    print(data)
    gid=data['gid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="update good set gonsale=0 where gid="+str(gid)+";"
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return 'fail'

@app.route('/get_unaccepted_order')
def get_unaccepted_order():
    """
    查询未接受的订单。
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="select * from `order` where accepted<>3 order by otime desc;"
    cursor.execute(sql)    
    res=cursor.fetchall()
    return json.dumps(res,sort_keys=True, default=str)


@app.route('/get_uncouried_order')
def get_uncouried_order():
    """
    查询需要接的订单
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="select oid,address,phone,otime from `order` where accepted=1 order by otime desc;"
    cursor.execute(sql)    
    res=cursor.fetchall()
    return json.dumps(res,sort_keys=True, default=str)

@app.route('/end_game',methods=['POST'])
def end_game():
    """
    已送达--这也是整个课设的最后一个函数
    """
    oid=request.json['oid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="update `order` set accepted=3 where oid="+str(oid)+" ;"
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return "fail"

@app.route('/get_my_package',methods=['POST'])
def get_my_package():
    """
    配送员查询已经接下的单
    """
    uid=request.json['uid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="select oid,address,phone,otime,accepted from `order` where courier="+str(uid)+" order by otime desc;"
    print(sql)
    cursor.execute(sql)    
    res=cursor.fetchall()
    print(res)
    return json.dumps(res,sort_keys=True, default=str)

@app.route('/be_a_courier',methods=['POST'])
def be_a_courier():
    '''
    配送员请求接单
    '''
    oid=request.json['oid']
    phone=request.json['phone']
    uid=request.json['uid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="select accepted from `order` where oid="+str(oid)
    cursor.execute(sql)    
    res=cursor.fetchall()
    if(res[0][0]!=1):
        return 'fail'
    else:
        sql="update `order` set accepted=2,courier="+str(uid)+",courier_phone='"+str(phone)+"' where oid="+str(oid)+" ;"
        print(sql)
        try:
            cursor.execute(sql)
            db.commit()
            return 'succeed'
        except:
            db.rollback()
            return "fail"

@app.route('/get_all_order')
def get_all_order():
    """
    查询所有订单。
    """
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="select * from `order` where accepted=3 order by otime desc;"
    cursor.execute(sql)    
    res=cursor.fetchall()
    return json.dumps(res,sort_keys=True, default=str)

@app.route('/accept_order',methods=['POST'])
def accept_order():
    oid=request.json['oid']
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE) 
    cursor = db.cursor()
    sql="update `order` set accepted=1 where oid="+str(oid)+" ;"
    try:
        cursor.execute(sql)
        db.commit()
        return 'succeed'
    except:
        db.rollback()
        return "fail"

@app.route('/refresh_sales')
def refresh_sales():
    '''
    刷新所有的统计图
    '''
    db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
    cursor = db.cursor()  
    sql = "select * from sales_by_day;"
    try:
        cursor.execute(sql)
        res=cursor.fetchall()
        xname=[]
        ynum=[]
        for x in res:
            xname.append(x[0][4:])
            ynum.append(x[1])
        x1=xname
        y1=ynum
        #plt.figure()
        #plt.xlabel('日期')
        #plt.ylabel('销售额')
        #plt.plot(xname,ynum)
        #for x,y in enumerate(ynum):
        #    plt.text(x,y,'%s'% y)
        
        #plt.savefig('/home/sjkks/sjk/img/sales_by_day.jpg') #保存路径
        sql='select gname,sales_volume from user_good order by sales_volume desc'
        cursor.execute(sql)
        res=cursor.fetchall()
        xname=[]
        ynum=[]
        for x in res:
            xname.append(x[0])
            if(x[1] is None):
                ynum.append(0)
            else:
                ynum.append(x[1])
        #plt.figure()
        #plt.xlabel('菜品')
        #plt.ylabel('平均评分')
        #plt.bar(xname,ynum)
        #plt.savefig('/home/sjkks/sjk/img/good_score.jpg') #保存路径
        return {'state':'succeed','x1':x1,'y1':y1,'x2':xname,'y2':ynum}
    except:
        return 'fail'
    
@app.route('/get_best_good',methods=['POST'])
def get_best_good():
    '''
    返回热门推荐
    '''
    try:
        db = pymysql.connect("localhost",USER,PASSWORD,DATABASE)
        cursor = db.cursor()  
        sql = "select * from user_good order by avg_score desc;"
        cursor.execute(sql)
        res=cursor.fetchall()
        print(res[:3])
        return {'state':'succeed','data':res[:3]}
    except:
        return {'state':'fail'}
    


if __name__ == '__main__':
    #app.run(host='0.0.0.0', debug=True, port=5000,threaded=True,ssl_context=('/www/server/panel/vhost/cert/brucemarkdown.top/fullchain.pem','/www/server/panel/vhost/cert/brucemarkdown.top/privkey.pem'))
    app.run(host='0.0.0.0', debug=True, port=5000,threaded=True)

