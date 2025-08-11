# Hospital-Medical-Management-System
---
![GitHub release (latest SemVer)](https://img.shields.io/badge/language-Java-yellowgreen)

（可以直接运行）医院医药管理系统（Hospital Medical Management System)   
数据库课设(包含sql代码)  
It can be run directly and contains SQL code.  

![](https://github.com/zhangjun640/Hospital-Medical-Management-System/blob/main/ER%E5%9B%BE.png "ER map of program")    

Hospital Medical Management System (医院医药管理系统)  
A comprehensive management system for hospital pharmacies, designed as a database course project.  
It features modules for inventory management, sales tracking, and a robust permission system built with the Apache Shiro framework.  
This project includes all necessary SQL code and is ready to run.  

这是一个为数据库课程设计的医院医药管理系统。  
系统功能包括完整的药品出入库管理、销售记录，并集成 Apache Shiro 框架实现了强大的权限管理功能。  
项目包含完整的SQL代码，可直接运行。  

## 📋 Table of Contents (目录)
- Project Overview (项目概述)
- Key Features (主要功能)
- System Architecture & ER Diagram (系统架构与ER图)
- Technology Stack (技术栈)
- Getting Started (快速开始)
  - Prerequisites (环境要求)
  - Installation & Setup (安装与配置)
  - SQL Database (数据库)

---

## 🌟 Project Overview (项目概述)
This project consists of two main parts: one part handles inventory and transaction records, while the other part is based on the Shiro framework for permissions management.  
项目主要由两部分组成，一部分是负责出入库记录的，另一部分是 Shiro 权限管理框架。  

### 1. Inventory and Transaction Records (库存与交易记录)
This module forms the core of the pharmacy's operations, managing the entire lifecycle of a drug from procurement to sale.  

**Entities (主要实体)**: `supplier`, `drug`, `consumer`, `inventory_record`, `user`  

**Key Relationships (主要关系)**:
- **Supplier to Drug (供应商 -> 药品)**: A supplier can provide multiple types of drugs (One-to-Many).
- **Drug to Inventory Record (药品 -> 库存记录)**: A drug can have multiple inventory_records, tracking its movement (inbound, outbound, sales) over time (One-to-Many).
- **User to Inventory Record (管理员 -> 库存记录)**: A user (administrator) can create and manage multiple inventory_records (One-to-Many).
- **Consumption Record (消费记录)**: A single consumption event is a unique link between one drug, one user, and one consumer, representing a specific sale transaction (One-to-One-to-One).  

### 2. Shiro Permissions Management Framework (Shiro 权限管理框架)
This module secures the system by ensuring that users can only access the functionalities authorized by their assigned roles.  

**Entities (主要实体)**: `user`, `role`, `menu`  

**Key Relationships (主要关系)**:
- **Role to Menu (角色 <-> 菜单)**: Many-to-Many.
- **User to Role (管理员 <-> 角色)**: Many-to-Many.

---

## ✨ Key Features (主要功能)
- **User & Permission Management**: Secure login and RBAC powered by Apache Shiro.
- **Supplier Management**: Add, view, and manage drug suppliers.
- **Drug Inventory**: Manage drug information, including stock levels, pricing, and supplier details.
- **Inbound/Outbound Tracking**: Record all warehouse activities.
- **Sales Management**: Process and record sales, automatically updating inventory.
- **Reporting**: View logs of all inventory and sales transactions.

---

## 🗂️ System Architecture & ER Diagram (系统架构与ER图)
The diagram below illustrates the database schema and the relationships between the core entities of the system.  

```mermaid
erDiagram
    subgraph Inventory_Management ["Inventory Management (库存管理)"]
        SUPPLIER {
            int supplier_id PK "供应商ID"
            string name "名称"
            string contact "联系方式"
        }
        DRUG {
            int drug_id PK "药品ID"
            int supplier_id FK "供应商ID"
            string name "药品名称"
            string description "描述"
            float price "价格"
        }
        CONSUMER {
            int consumer_id PK "消费者ID"
            string name "姓名"
            string contact_info "联系信息"
        }
        INVENTORY_RECORD {
            int record_id PK "记录ID"
            int drug_id FK "药品ID"
            int user_id FK "操作员ID"
            int consumer_id FK "消费者ID (可空)"
            string type "类型 (入库/出库/销售)"
            int quantity "数量"
            datetime timestamp "时间戳"
        }

        SUPPLIER ||--o{ DRUG : "supplies"
        DRUG ||--o{ INVENTORY_RECORD : "has"
        USER ||--o{ INVENTORY_RECORD : "manages"
        CONSUMER ||--o{ INVENTORY_RECORD : "consumes"
    end

    subgraph Permission_Management ["Permission Management (Shiro) (权限管理)"]
        USER {
            int user_id PK "用户ID"
            string username "用户名"
            string password "密码"
        }
        ROLE {
            int role_id PK "角色ID"
            string role_name "角色名"
        }
        MENU {
            int menu_id PK "菜单ID"
            string menu_name "菜单名称"
            string permission_code "权限代码"
        }
        USER_ROLE {
            int user_id FK "用户ID"
            int role_id FK "角色ID"
        }
        ROLE_MENU {
            int role_id FK "角色ID"
            int menu_id FK "菜单ID"
        }

        USER }|--|{ ROLE : "has"
        ROLE }|--|{ MENU : "has"
        USER ||--|{ USER_ROLE : "maps"
        ROLE ||--|{ USER_ROLE : "maps"
        ROLE ||--|{ ROLE_MENU : "maps"
        MENU ||--|{ ROLE_MENU : "maps"
    end
```

---

## 🛠️ Technology Stack (技术栈)
- **Backend**: Java
- **Security**: Apache Shiro
- **Database**: MySQL / PostgreSQL
- **Build Tool**: Maven / Gradle
- **Frontend**: Thymeleaf / JSP / Vue

---

## 🚀 Getting Started (快速开始)

### Prerequisites (环境要求)
- JDK 1.8+
- Maven 3.2+ / Gradle
- MySQL 8.0+

### Installation & Setup (安装与配置)
```bash
git clone https://github.com/zhangjun640/Hospital-Medical-Management-System.git
cd Hospital-Medical-Management-System
```

**1. 配置数据库**
- 创建数据库 `hospital_db`
- 导入 `database.sql`

**2. 修改配置文件**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

**3. 启动项目**
```bash
# Maven
mvn spring-boot:run
# Gradle
./gradlew bootRun
```

---

## 🗄️ SQL Database (数据库)
The complete SQL code for creating tables, defining relationships, and inserting initial data is included in the project repository.  
请查找 `database.sql` 或类似命名的文件。
