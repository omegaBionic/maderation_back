# How to install maderation_back

## commands
### POST
### ADD/DELETE:
syntax :
```bash
curl -d '{"0": {"status":"add", "table": "madera_user", "values": {"phoneNumber":{"S":"666666666"},"isActive":{"BOOL":true},"lastname":{"S":"je suis un lastname"},"password":{"S":"coucou"},"firstname":{"S":":d"},"idShop":{"N":"9"},"mail":{"S":"test@aaaaa.net"},"username":{"S":"test69"}}}, "1": {"status":"add", "table":"madera_address_client", "values": {"city":{"S":"dijon"},"idAddressClient":{"S":"1"},"country":{"S":"france"},"postalCode":{"N":"21000"},"street":{"S":"mirande"}}}}' -X POST "http://madera-api.maderation.net:8080/api/post/post_datas?key=993b06009dce6a9962esecf49801d32e&id=user"
```

add exemple :
```bash
{"0": {"status":"add", "table":"madera_address_client", "values": {"city":{"S":"dijon"},"idAddressClient":{"S":"5"},"country":{"S":"france"},"postalCode":{"N":"21000"},"street":{"S":"mirande"}}}}
```

delete exemple :
```bash
{"0": {"status":"delete", "table":"madera_address_client", "values": {"city":{"S":"dijon"},"idAddressClient":{"S":"5"},"country":{"S":"france"},"postalCode":{"N":"21000"},"street":{"S":"mirande"}}}}
```

### GET
get sync
http://madera-api.maderation.net:8080/api/get/sync?key=03f1ce90995780a5c6fe80eacccfb080&id=69

get status
http://madera-api.maderation.net:8080/api/get/status?key=179616f1a4cecab2a7eab481b84d076c

get user
http://madera-api.maderation.net:8080/api/get/user?key=83c2c07ea1251a1a39ec46d52cbba19c

get client
http://madera-api.maderation.net:8080/api/get/client?key=9f15cb387f77c3284bd1bdc364a21eb7

get attribut
http://madera-api.maderation.net:8080/api/get/attribut?key=86ad7be9d92e838132c9c182554531e9&id=69

get address_client
http://madera-api.maderation.net:8080/api/get/address_client?key=28e60ed41c0a59a442cade866bff3a97

get address_supplier
http://madera-api.maderation.net:8080/api/get/address_supplier?key=33f85cb0c62fc22f5c2ad0f067c5e83a

get category
http://madera-api.maderation.net:8080/api/get/category?key=182ea700442885f568585f374423073d

get chat
http://madera-api.maderation.net:8080/api/get/chat?key=80aacfbde81d03d20788f370417651cc

get component
http://madera-api.maderation.net:8080/api/get/component?key=6400edeffb01785cb7426801619d8535

get gamme
http://madera-api.maderation.net:8080/api/get/gamme?key=9af660ef63fbb9e5175d56f064d7a0db

get invoice_quotation
http://madera-api.maderation.net:8080/api/get/invoice_quotation?key=74cc360b19fc2a94ea620ef5803a381b

get message
http://madera-api.maderation.net:8080/api/get/message?key=a853ca2949386f7d527bf06117bda9e3

get product
http://madera-api.maderation.net:8080/api/get/product?key=4789725dd2d8061e7faf00fce9af48e1

get project
http://madera-api.maderation.net:8080/api/get/project?key=3f61093fa59c13f81fc8648a3d644e0b

get promotion_cat
http://madera-api.maderation.net:8080/api/get/promotion_cat?key=557c0271e30cf474e0f46f93721fd1ba

get promotion_comp
http://madera-api.maderation.net:8080/api/get/promotion_comp?key=2b11565d85da178b3a1942a22d20c624

get quotation
http://madera-api.maderation.net:8080/api/get/quotation?key=eb307516cffbc5e529cf9c7350ffc299

get role
http://madera-api.maderation.net:8080/api/get/role?key=33f85cb0c62f522f5c2ad09067c5e83a

get shop
http://madera-api.maderation.net:8080/api/get/shop?key=p3f85cbdc62fc22f5c2ad0f067m5eldlda

get stock
http://madera-api.maderation.net:8080/api/get/stock?key=93f85cb0cc2fc22f5c2ad0f067c5e95116

get supplier
http://madera-api.maderation.net:8080/api/get/supplier?key=3ff85cb0c62fc22z5c2adff067c5e83a

## Return code:
Return code:
200: OK
401: unauthorized
403: forbidden
404: page not found
500: internal server error

## setup crendential
$ aws configure
AWS Access Key ID [****************4714]:
AWS Secret Access Key [****************lop2]:
Default region name [eu-west-3]:
Default output format [None]:

## How install prod server :
```bash
$ sudo apt-get install ansible
$ ansible-playbook install.yml
```
## for run test use :
```bash
$ ./runServer.sh
```

## How install test server :
```bash
$ npm install supertest
$ npm install mocha
```
## for run test use :
```bash
$ ./runTests.sh 
```

## ansible configuration
```bash

- name: manage users
  user:
    name: jenkins
    groups: jenkins
    append: yes
    shell: /bin/bash
    password: jenkins
    state: present
    createhome: yes
    remove: yes

- name: Copy ssh key for git
  copy:
    src: /data/private.ppk
    dest: /home/jenkins/.ssh/id_rsa
    owner: jenkins
    group: jenkins
    mode: '0600'

- name: Copy ssh key for git
  copy:
    src: /data/public.ppk
    dest: /home/jenkins/.ssh/id_rsa.pub
    owner: jenkins
    group: jenkins
    mode: '0600'

- name: get nodejs key
  shell: "curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -"

- name: install nodejs
  apt:
   name: nodejs
   state: present

- name: get git repo
  git:
    repo: jenkins@bitbucket.org/melodianocturnis/maderation_back.git
    dest: /home/jenkins/maderation_back
    owner: jenkins

- name: run server
  shell: /home/jenkins/maderation_back/runServer.sh
```

## Overview
```bash
.
├── get
│   ├── address_client.js
│   ├── address_supplier.js
│   ├── all.js
│   ├── category.js
│   ├── chat.js
│   ├── client.js
│   ├── component.js
│   ├── gamme.js
│   ├── invoice_quotation.js
│   ├── message.js
│   ├── product.js
│   ├── project.js
│   ├── promotion_cat.js
│   ├── promotion_comp.js
│   ├── quotation.js
│   ├── role.js
│   ├── shop.js
│   ├── status.js
│   ├── stock.js
│   ├── supplier.js
│   └── users.js
├── index.js
├── log
│   ├── module_api_AAAA-MM-DD_HH-MN-SS-MS.log
├── node_modules
├── post
├── README.md
├── resources
│   ├── id.json
│   └── token.json
├── runTests.sh
├── tests
│   ├── get
│   │   ├── test_address_client.js
│   │   ├── test_address_supplier.js
│   │   ├── test_category.js
│   │   ├── test_chat.js
│   │   ├── test_client.js
│   │   ├── test_component.js
│   │   ├── test_gamme.js
│   │   ├── test_invoice_quotation.js
│   │   ├── test_message.js
│   │   ├── test_product.js
│   │   ├── test_project.js
│   │   ├── test_promotion_cat.js
│   │   ├── test_promotion_comp.js
│   │   ├── test_quotation.js
│   │   ├── test_role.js
│   │   ├── test_shop.js
│   │   ├── test_status.js
│   │   ├── test_stock.js
│   │   ├── test_supplier.js
│   │   └── test_users.js
│   ├── post
│   └── test_top.js
└── utils
    ├── id.js
    ├── logger.js
    └── token.js
```
