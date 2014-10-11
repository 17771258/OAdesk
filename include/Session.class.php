<?php
// +--------------------------------------------------------------
// | Session 操作类
// +--------------------------------------------------------------
// | Author : 王昊然 ( http://my.oschina.net/whrlmc )
// +--------------------------------------------------------------


/**
 +---------------------------------------------------------
 * Session 管理类
 +---------------------------------------------------------
 */

class Session {

 /**
 +---------------------------------------------------------
 * 启动 Session
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function start(){
    session_start();
  }

 /**
 +---------------------------------------------------------
 * 暂停 Session
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function pause(){
    session_write_close();
  }

 /**
 +---------------------------------------------------------
 * 清空 Session
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function clear(){
    $_SESSION = array();
  }

 /**
 +---------------------------------------------------------
 * 销毁 Session
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function destroy(){
    unset($_SESSION);
    session_destroy();
  }

 /**
 +---------------------------------------------------------
 * 获取 SessionID
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function getSessionID(){
    if(session_id() != ''){
      return session_id();
    }
    if(Session::useCookies()){
      if(isset($_COOKIE[Session::name()])){
	return $_COOKIE[Session::name()];
      }
    }else{
      if(isset($_GET[Session::name()])){
	return $_GET[Session::name()];
      }
      if(isset($_POST[Session::name()])){
	return $_GET[Session::name()];
      }
    }
    return null;
  }

 /**
 +---------------------------------------------------------
 * 设置或获取 Session name
 +---------------------------------------------------------
 * @param string $name session名称
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return string 返回之前的session name 值
 +---------------------------------------------------------
 */
  static public function name($name = null){
    return isset($name) ? session_name($name) : session_name();
  }

 /**
 +---------------------------------------------------------
 * 设置或获取 Session ID
 +---------------------------------------------------------
 * @param string $id sessionID
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return string 返回之前的sessionID 值
 +---------------------------------------------------------
 */
  static public function id($id = null){
    return isset($id) ? session_id($id) : session_id();
  }

 /**
 +---------------------------------------------------------
 * 设置或获取 Session 保存路径
 +---------------------------------------------------------
 * @param string $path session 保存路径
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return string 返回之前的 session 保存路径
 +---------------------------------------------------------
 */
  static public function path($path = null){
    return isset($path) ? session_save_path($path) : session_save_path();
  }

 /**
 +---------------------------------------------------------
 * 设置 Session 的过期时间
 +---------------------------------------------------------
 * @param interger $time 过期时间
 * @param boolean $add 是否为增加的时间
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function setExpirationTime($time, $add = false){
    if($add){
      $_SESSION['SESSION_EXPIRATION_TIME'] = time() + $time;
      $old = Session::setGcMaxLifetime();
      Session::setGcMaxLifetime($old + $time);    
    }else{
      $_SESSION['SESSION_EXPIRATION_TIME'] = $time;
    }
  }

 /**
 +---------------------------------------------------------
 * 设置 Session gc_maxlifttime 的值
 +---------------------------------------------------------
 * @param interger $time 过期时间
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return interger 返回之前的 gc_maxlifttime 的值
 +---------------------------------------------------------
 */
  static public function setGcMaxLifetime($gcMaxLifetime = null){
    $old = ini_get('session.gc_maxlifetime');
    if(isset($gcMaxLifetime) && is_int($gcMaxLifetime) && $gcMaxLifetime >= 1){
      ini_set('session.gc_maxlifetime', $gcMaxLifetime);
    }
    return $old;
  }

 /**
 +---------------------------------------------------------
 * 检查 SESSION 是否过期
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return boolean
 +---------------------------------------------------------
 */
  static public function isExpiration(){
    if(isset($_SESSION['SESSION_EXPIRATION_TIME']) && $_SESSION['SESSION_EXPIRATION_TIME'] > time()){
      return true;
    }else{
      return false;
    }
  }

 /**
 +---------------------------------------------------------
 * 检查并设置SESSION cookies 配置
 +---------------------------------------------------------
 * @param boolean $useCookies 是否使用cookies存储sessionID
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return boolean 返回之前的设置
 +---------------------------------------------------------
 */
  static public function useCookies($useCookies = false){
    $return = ini_get('session.use_cookies');
    if(isset($useCookies)){
      ini_set('session.use_cookies', $useCookies ? 1 : 0);
    }
    return $return;
  }

 /**
 +---------------------------------------------------------
 * 获取 Session 值
 +---------------------------------------------------------
 * @param string $name
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return string
 +---------------------------------------------------------
 */
  static public function get($name){
    if(isset($_SESSION[$name])){
      return $_SESSION[$name];
    }else{
      return null;
    }
  }
  
 /**
 +---------------------------------------------------------
 * 设置 Session 值
 +---------------------------------------------------------
 * @param string $name
 * @param string $value
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function set($name, $value = null){
    if(null === $value){
      unset($_SESSION[$name]);
    }else{
      $_SESSION[$name] = $value;
    }
    return ;
  }

 /**
 +---------------------------------------------------------
 * 检查 Session 值是否已设置
 +---------------------------------------------------------
 * @param string $name
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return boolean
 +---------------------------------------------------------
 */
  static public function is_set($name){
    return isset($_SESSION[$name]);
  }

 /**
 +---------------------------------------------------------
 * 检查当前 Session 文件名
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return string
 +---------------------------------------------------------
 */
  static public function getFilename(){
    return Session::path() . '/sess_' . Session::getSessionID();
  }

 /**
 +---------------------------------------------------------
 * Session 初始化
 +---------------------------------------------------------
 * @static
 * @access public
 +---------------------------------------------------------
 * @return void
 +---------------------------------------------------------
 */
  static public function _init(){
    session::start();
    if (is_null(Session::getSessionID())) {
      Session::id(uniqid(dechex(mt_rand())));
    }
  }
}
Session::_init();
