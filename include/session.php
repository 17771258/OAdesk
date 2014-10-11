<?php
include('Session.class.php');
if( !Session::is_set('sessionID')){
	Session::set('sessionID','2');
}
echo Session::get('sessionID').'<br>';
echo Session::getSessionID().'<br>';
echo Session::getFilename();

echo '<pre>------------------------------';
print_r($_SESSION);
echo '<br>-------------------------</pre>';
?>
