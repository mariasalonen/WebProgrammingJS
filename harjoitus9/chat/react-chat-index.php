<?php
require_once 'rpm-chat-config.php';

 $_SESSION['user_id'] = isset($_GET['user_id']) ? (int) $_GET['user_id'] : 1;

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>RPMChat (ReactPhpMySQL)</title>
    <link href="style/core.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans%7CMuli%7CLato">
    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
  </head>
  <body>
<div id="mastercontainer">
<h1>Chat Example with React</h1>

<?php
    require_once __DBCONFIG_PATH . '/RpmChatDb.php';
    $chat = new RpmChatDb();
    $messages = $chat->getMessages();
    $users = $chat->getAllUsers();


    /** <Select User Role Navigation, vähän köpösti toteutettu> **/ 
      echo "<p id='navbar'>";
      echo "Select Role: ";
      foreach($users as $user) {
        $bgcolor = "transparent";
        if ($_SESSION['user_id'] == $user['id']) $bgcolor = "#ffc";
        echo "<a href='react-chat-index.php?user_id={$user['id']}'><span style='background-color: $bgcolor'>{$user['username']}</span></a>" . "\n";
      } 
      echo "</p>";
    /** </Select User Role Navigation, vähän köpösti toteutettu> **/ 


    ?>
    <div id="container"></div>

      <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
      <script src="https://unpkg.com/react@15.3.2/dist/react.js"></script>
      <script src="https://unpkg.com/react-dom@15.3.2/dist/react-dom.js"></script>
      <script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
      <script type="text/babel" src="js/react-chat.js"></script>

</div>
  </body>
</html>
