<?php
require_once '../rpm-chat-config.php';
require_once __DBCONFIG_PATH . '/RpmChatDb.php';

$chat = new RpmChatDb();
$users = $chat->getAllUsers();
//var_dump($users);exit();

$chat_user = array();

if (!empty($users)) {
  foreach ($users as $user) {
    $user_id = (int) $user['id'];
    $user_name = $user['username'];
    $email = $user['email'];
    $chat_user[] = array (
        'user_id' => $user_id,
        'name' => $user_name,
        'email' => $email
    );
  }
  $response = json_encode($chat_user);
} else {
  echo '<span style="margin-left: 15px;">No chat users available!</span>';
}

/*
ob_start();
echo "get_user:\n";
echo $response;
$data = ob_get_contents();
$fp = fopen("debug.txt", "w");
fwrite ($fp, $data);
fclose($fp);
ob_end_clean();
*/

// Toimii testattu:
header('Content-type: application/json');
echo $response;
?>
