# Hospital-Medical-Management-System
（可以直接运行）医院医药管理系统（Hospital Medical Management System）   
数据库课设(包含sql代码）  
It can be run directly and contains SQL code.  
所有代码都在master branch中（all the code are in master branch）    
！[项目ER图(ER map of program)](https://github.com/zhangjun640/Hospital-Medical-Management-System/blob/main/ER%E5%9B%BE.png "ER map of program")    
项目主要由两部分组成，一部分是负责出入库的记录的（supplier, drag, consumer, Inventory_record, user实体），主要的关系有：   
1.supplier和drag的一对多关系，一个supplier可以提供多种药物    
2.drag和Inventory_record的一对多关系，一个药物可能有多个仓库记录（销售和出入库记录）    
3.user和Inventory_record的一对多关系，一个管理员可以管理多个仓库记录   
4.消费中存在一个消费记录，是drag， user， consumer的一对一对一的记录，即一个消费记录我设计的为一个管理员操作，一种药品，一个消费者    
另一部分是shiro框架的权限管理框架设计,主要的实体是menu, role, user（系统通过role来对user的访问权限进行设置）,主要的关系是：    
1.role和menu的多对多关系，一个角色可以有多个菜单权限，同时，一个菜单权限也可以被多个角色拥有    
2.user和role的多对多关系，一个管理员可以有多个角色权限，一个管理权限也可以被多个管理员拥有
