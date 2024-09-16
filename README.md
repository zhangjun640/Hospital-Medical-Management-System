# Hospital-Medical-Management-System
（可以直接运行）医院医药管理系统（Hospital Medical Management System）   
数据库课设(包含sql代码）  
It can be run directly and contains SQL code.  
![](https://github.com/zhangjun640/Hospital-Medical-Management-System/blob/main/ER%E5%9B%BE.png "ER map of program")    
## 项目主要由两部分组成，一部分是负责出入库的记录的（supplier, drag, consumer, Inventory_record, user实体），主要的关系有：   
1.supplier和drag的一对多关系，一个supplier可以提供多种药物    
2.drag和Inventory_record的一对多关系，一个药物可能有多个仓库记录（销售和出入库记录）    
3.user和Inventory_record的一对多关系，一个管理员可以管理多个仓库记录   
4.消费中存在一个消费记录，是drag， user， consumer的一对一对一的记录，即一个消费记录我设计的为一个管理员操作，一种药品，一个消费者    
## 另一部分是shiro框架的权限管理框架设计,主要的实体是menu, role, user（系统通过role来对user的访问权限进行设置）,主要的关系是：    
1.role和menu的多对多关系，一个角色可以有多个菜单权限，同时，一个菜单权限也可以被多个角色拥有    
2.user和role的多对多关系，一个管理员可以有多个角色权限，一个管理权限也可以被多个管理员拥有    
# Project Overview

This project consists of two main parts: one part handles inventory and transaction records (involving the `supplier`, `drug`, `consumer`, `inventory_record`, and `user` entities), while the other part is based on the Shiro framework for permissions management (involving the `menu`, `role`, and `user` entities). Below are the details of each section:

## 1. Inventory and Transaction Records

The main relationships and entities in this section include:

1. **One-to-Many Relationship Between `supplier` and `drug`:** A supplier can provide multiple types of drugs, establishing a one-to-many relationship between suppliers and drugs.
2. **One-to-Many Relationship Between `drug` and `inventory_record`:** A drug can have multiple warehouse records, including sales, inbound, and outbound records, creating a one-to-many relationship between drugs and inventory records.
3. **One-to-Many Relationship Between `user` and `inventory_record`:** A system administrator or user can manage multiple warehouse records, allowing for a one-to-many relationship between users and inventory records.
4. **One-to-One-to-One Relationship for Consumption Records:** A consumption record links a `drug`, a `user` (administrator), and a `consumer`, where each record represents a single operation by an administrator for a particular drug and a specific consumer.

## 2. Shiro Permissions Management Framework

This part of the project is designed based on the Shiro framework to manage user permissions. The main entities and relationships include:

1. **Many-to-Many Relationship Between `role` and `menu`:** A single role can have multiple menu permissions, while a menu permission can be assigned to multiple roles. This establishes a many-to-many relationship between roles and menus.
2. **Many-to-Many Relationship Between `user` and `role`:** A system administrator or user can hold multiple roles, and a single role can be assigned to multiple administrators, forming a many-to-many relationship between users and roles.
