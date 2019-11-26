<?php

require_once '../rpm-chat-config.php';
require_once __DBCONFIG_PATH . '/RpmChatDb.php';


if (isset($_POST['msg'])) {
  
  $userId = (int) $_SESSION['user_id'];
  $msg = strip_tags(($_POST['msg']));
 
  $chat = new RpmChatDb();
  $result = $chat->addMessage($userId, $msg);

  // Send back the updated messages
  $messages = $chat->getMessages();
  $chat_conversation = array();

  if (!empty($messages)) {
    foreach ($messages as $message) {
      $chat_id = (int) $message['chat_id'];
      $msg = $message['message'];
      $user_name = $message['username'];
      $sent = $message['sent_on'];
      $chat_conversation[] = array (
          'username' => $user_name,
          'message' => $msg,
          'time' => $sent,
          'id' => $chat_id
      );
    }
    $response = json_encode($chat_conversation);
  } else {
    echo '<span style="margin-left: 25px;">No chat messages available!</span>';
  }

  header('Content-type: application/json');
  echo $response;
}
?>
