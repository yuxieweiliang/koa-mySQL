/**
 * Created by xueyufei on 2018/3/8.
 */
var http = require('http');

var mysql = require('mysql');
var TEST_DATABASE = 'test';
var TEST_TABLE = 'test';
var TEST2_TABLE = 'test2';

var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'xyf.33423342'
});

connection.connect(function(err) {
  if (err) {
    console.error('连接错误: ' + err.stack);
    return;
  }

  console.log('连接ID ' + connection.threadId);
});

//创建数据库
connection.query('CREATE DATABASE '+TEST_DATABASE, function(err) {
  if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
    throw err;
  }
});

//不指定回调函数，如果出错，则体现为客户端错误
connection.query('USE '+TEST_DATABASE, function(err) {
  if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
    throw err;
  }
});

//创建表格,插入数据
/*connection.query(
  'CREATE TABLE '+TEST2_TABLE+
  '(id INT(11) AUTO_INCREMENT, '+
  'name VARCHAR(255), '+
  'age VARCHAR(255), '+
  'PRIMARY KEY (id))'  // 约束主键id必须有且唯一
);*/

/*connection.query(
  'INSERT INTO '+TEST2_TABLE+' '+
  'SET age = ?',
  ['nodejs1']
);

var query = connection.query(
  'INSERT INTO '+TEST2_TABLE+' '+
  'SET age = ?',
  ['nodejs2']
);*/

//查询，并设置回调函数
connection.query(
  'SELECT * FROM '+ TEST2_TABLE,
  function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }

    console.log('results: ', results);
    console.log('fields: ', fields);
    connection.end();
  }
);


http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('<b>Hello World</b>');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
