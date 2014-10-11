<?php
    /*
     *
     *  数据库操作类
     *
     *
     */
class Db{
    private $DB_NAME = "";
    private $DB_USER = "";
    private $DB_PASSWORD = "";
    private $DB_HOST = "";
    private $DB_CHARSET = "";

    //数据库连接标识
    private $DB_CONN = "";

    //结果集
    private $DB_RESULT = "";

    //结果集数组
    private $DB_ROWS_ARRAY = array();

    //影响行数
    private $DB_ROWS_NUM = 0;

    function __construct ($DB_HOST,$DB_USER,$DB_PASSWORD,$DB_NAME,$DB_CHARSET) {
        $this->DB_HOST = $DB_HOST;
        $this->DB_USER = $DB_USER;
        $this->DB_PASSWORD = $DB_PASSWORD;
        $this->DB_NAME = $DB_NAME;
        $this->DB_CHARSET = $DB_CHARSET;
        $this->connent($this->DB_HOST,$this->DB_USER,$this->DB_PASSWORD,$this->DB_NAME,$this->DB_CHARSET);
    }
    private function connent ($host,$user,$password,$name,$charset) {
        $this->DB_CONN = mysql_connect ($host,$user,$password);
        if (!$this->DB_CONN) {
            exit ('数据库连接失败');
        }
        if (!mysql_select_db($name,$this->DB_CONN)) {
            exit ('不能打开数据库'.$name.'，请确认数据库是否存在。');
        }
        mysql_query ('SET NAMES '.$charset);
        return $this->DB_CONN;
    }

    public function mysql_server ($num) {
        switch ($num) {
            case 1:
                //MYSQL服务信息
                return 'MYSQL服务信息'.mysql_get_server_info();
                break;
            case 2:
                //MYSQL主机信息
                return 'MYSQL主机信息'.mysql_get_host_info();
                break;
            case 3:
                //MYSQL客户端信息
                return 'MYSQL客户端信息'.mysql_get_client_info();
                break;
            case 4:
                //MYSQL协议信息
                return 'MYSQL协议信息'.mysql_get_proto_info();
                break;
                // 默认取得MYSQL版本信息
            default:
                return '默认取得MYSQL版本信息'.mysql_get_client_info();
        }
    }

    //执行sql语句函数
    public function query ($sql) {
        if (empty($sql)) {
            exit ('SQL语句不能为空！请更正后重试。');
        }
        //开始记时
        $start_time = $this->microtime_float();
        $this->DB_RESULT = mysql_query ($sql,$this->DB_CONN);
        if ($this->DB_RESULT) {
            //结束记时
            $end_time = $this->microtime_float();
            return $this->DB_RESULT;
        } else {
            exit ('SQL语句错误'.$sql);
        }
    }
    //获取当前时间 精确到秒
    private function microtime_float () {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
    }

    //获取一条记录
    public function fetch_once_array ($sql,$type=MYSQL_ASSOC) {
        $this->query($sql);
        return mysql_fetch_array ($this->DB_RESULT,$type);
    }

    //获取多条记录
    public function fetch_array ($sql) {
        $this->DB_ROWS_ARRAY = "";
        $this->query ($sql);
        while ($rs=mysql_fetch_array($this->DB_RESULT,MYSQL_ASSOC)) {
            $this->DB_ROWS_ARRAY[] = $rs;
        }
        return $this->DB_ROWS_ARRAY;
    }

    //SQL添加、更新、删除
    public function iudquery ($sql) {
        $this->query($sql);
        $this->DB_ROWS_NUM = mysql_affected_rows();

        //根据MSQL错误编码来判断是否成功
        if (mysql_errno() == 0) {
            return $this->DB_ROWS_NUM;
        } else {
            return;
        }
    }

    //返回新增的自增ID
    public function get_insert_id() {
        return mysql_insert_id();
    }

    //返回记录总数
    public function numrows ($sql) {
        $this->query($sql);
        return mysql_num_rows($this->DB_RESULT);
    }

    //清空结果集
    public function closertst() {
        $this->DB_ROWS_ARRAY = "";
        @mysql_free_result($this->DB_RESULT);
    }
    

    //析构函数，自动关闭数据库，垃圾回收机制
    public function __destruct() {
        if (!empty($this->DB_RESULT)) {
            $this->closertst();
        }
        mysql_close($this->DB_CONN);
    }


    /*
     *  像数据库插入数据  insert($table_name,$array,$insert_type)
     *  $table_name 表名
     *  $array      键值对数组
     *      格式如下
     *      /-------字段名称--------值--------------/
     *      $array(
     *          'name'=>'wuyunlong',
     *          'password'=>'abc123456'
     *      )
     *  $insert_type  插入数据方式
     *      REPLACE替换插入
     *      IGNORE防止重复插入
     *  return $id 影响的受影响的ID
     *
     */
    public function insert ($table_name,$array,$insert_type = "") {
        if ($insert_str = $this->make_sql_str($array)) {
            if($insert_type == 'REPLACE') $sql = "REPLACE INTO {$this->DB_NAME}.{$table_name} SET {$insert_str}";
            elseif($insert_type == 'IGNORE') $sql = "INSERT IGNORE INTO {$this->DB_NAME}.{$table_name} SET {$insert_str}";
            else $sql = "INSERT INTO {$this->DB_NAME}.{$table_name} SET {$insert_str}";
            $this->query($sql);
            $id = $this->get_insert_id();
            return $id;
        } else {
            exit ('您的操作有误，请检查后重新操作。');
        }
    }
    
    //将数组转换为符合SQL语句的字符串
    private function make_sql_str ($arr) {
        if (!empty($arr)) {
            foreach ($arr as $key => $val) {
                $sql_str_arr[] = "{$key}='{$val}'";
            }
            $sql_arr_str = implode (",",$sql_str_arr);
            return $sql_arr_str;
        } else {
            return false;
        }
    }
}
?>
