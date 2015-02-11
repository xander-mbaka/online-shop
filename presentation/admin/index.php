<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'user.php';
	
	class UserOperations
	{
		/* 	Variable available to calling function */
		
		public $mSelectedDepartment = 0;
		public $mJournals;
		// Constructor reads query string parameter
		public function __construct()
		{
			if(isset($_POST['operation'])){
				$operation = $_POST['operation'];
				if($operation == 'logincookie'){
					if(isset($_POST['uname']) && isset($_POST['pass'])){
						$username = mysql_real_escape_string($_POST['uname']);//Some clean up :)
						$password = mysql_real_escape_string($_POST['pass']);
						$this->login_cookie($username, $password);
					}else{
						echo 0;
					}
						
				}elseif($operation == 'login'){
					if(isset($_POST['uname']) && isset($_POST['pass'])){
						$username = mysql_real_escape_string($_POST['uname']);//Some clean up :)
						$password = mysql_real_escape_string($_POST['pass']);
						$this->login($username, $password);
					}else{
						echo 0;
					}
				
				}elseif($operation == 'availability'){
					if(isset($_POST['uname'])){
						$username = mysql_real_escape_string($_POST['uname']);		
						$this->check_replica($username);
					}else{
						echo 0;
					}
				}elseif($operation == 'subscribe'){
					if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['repeatpassword'])){
						$name = mysql_real_escape_string($_POST['name']);
						$email = mysql_real_escape_string($_POST['email']);
						$password = mysql_real_escape_string($_POST['password']);
						$rptpassword = mysql_real_escape_string($_POST['repeatpassword']);
						$this->createUser($name, $email, $password, $rptpassword);
					}else{
						echo 0;
					}
				}elseif($operation == 'logout'){
					$this->logout();
				}else{ 
						echo 0;
					}
			}else{
				echo 0;
			}
		}
		/* Calls business tier method to read Journals list and create
		their links */
		public function createUser($name, $email, $password, $rptpassword) {
			if ($password == $rptpassword) {
				User::CreateUser($name, $email, $password);
				echo 1;
			}else{
				echo 0;
			}
	    }

		public function check_valid_user($uname) {
			if (isset($_SESSION['nom'])){
				if($_SESSION['nom'] == $uname){
					return true;
				}else{
					$this->logout();							
				}
				   
	  		}else{
				return false;
	      	}
	    }
	 
		
		public function deleteUser($email) {
			User::DeleteUser($email);
	    }
		
		public function update_profile() {
			if($this->check_valid_user($uname)){
				//insert stupid code here.
			}
	    }
		
		public function check_replica($uname) {
					
			$check = mysql_query("SELECT * FROM access_restriction WHERE uname = '".$uname."'") or die(mysql_error());
			
			if (!$check) {
	     		return false;
	  		}else{
				if (mysql_num_rows($check) > 0){
					return true;
	  			}else{
	     			return false;
	  			}
			}
		  }
		
		
		public function login($email, $password) {
	       	if (isset($_SESSION['session_key'])){
	      		unset($_SESSION['session_key']);
	  		}
			if (isset($_COOKIE['cookie_key'])){
	      		unset($_COOKIE['cookie_key']);
	  		}
			
			//compare username in access_restriction table to get clearance level
				
			$login = User::AuthorizeUser($email, $password);
		
			if (!$login) {
	     		return false;
	  		}else{
				session_start();
				$_SESSION['session_key'] = sha1($email);
				return true;
				//$log = @mysql_query("INSERT INTO system_logs VALUES ('".date('Y-m-d H:i:s')."','".$uname." Log in [session] on ".strftime('%m/%d/%y')." at: ".strftime('%I:%M:%S')."')");
			}
		   //start session and its variable
		   //if remember use COOKIES
	    }
		
		public function login_cookie($email, $password) {
			if (isset($_SESSION['session_key'])){
	      		unset($_SESSION['session_key']);
	  		}
			if (isset($_COOKIE['cookie_key'])){
	      		unset($_COOKIE['cookie_key']);
	  		}
			
			//compare username in access_restriction table to get clearance level
				
			$login = User::AuthorizeUser($email, $password);
			//$login = mysql_query("SELECT * FROM users WHERE uname = '".$uname."' AND pword = 'sha1(".$upass.")'") or die(mysql_error());
			if (!$login) {
	     		return false;
	  		}else{
	  			session_start();
				setcookie('cookie_key', sha1($email), time()+1209600);
				//setcookie('level', $ulevel, time()+1209600);
				//$log = @mysql_query("INSERT INTO system_logs VALUES ('".date('Y-m-d H:i:s')."','".$uname." Log in [with cookies] on ".strftime('%m/%d/%y')." at: ".strftime('%I:%M:%S')."')");
				return true;
			}
		   //start session and its variable
		   //if remember use COOKIES
	    }
		
		public function logout() {
			session_start();
			if(isset($_SESSION['session_key'])){
				$old_user = $_SESSION['session_key'];
	      		unset($_SESSION['session_key']);
							
				if (!empty($old_user)) {
	  				if (session_destroy()){
						//$log = @mysql_query("INSERT INTO system_logs VALUES ('".date('Y-m-d H:i:s')."','".$old_user." Log out [session] on ".strftime('%m/%d/%y')." at: ".strftime('%I:%M:%S')."')");
						return true;
					}else{
						return false;
				  	}
				}else{
	 				return false;
				}
			}elseif(isset($_COOKIE['cookie_key'])){
				setcookie('cookie_key',$_COOKIE['cookie_key'],time()-1209600);
				//$log = @mysql_query("INSERT INTO system_logs VALUES ('".date('Y-m-d H:i:s')."','".$uname." Log out [with cookies] on ".strftime('%m/%d/%y')." at: ".strftime('%I:%M:%S')."')");
				return true;
			}else{
				return false;
			}
		   //logout
		   //destroy session and its variable
		   //destroy COOKIES
	    }
		
		public function change_password() {
			if($this->check_valid_user($uname)){
				//insert stupid code here.
			}       
	    }
		
		public function reset_password() {
			if($this->check_valid_user($uname)){
				//insert stupid code here.
			}       
	    }
	}

	new UserPresentation();

	/*$request_method = strtolower($_SERVER['REQUEST_METHOD']);
	//echo $request_method;
	$data = null;

	switch ($request_method) {
	    case 'post':
	    case 'put':
	        $data = json_decode(file_get_contents('php://input'));
	    break;
	}

	$response = new JournalsList();
	$response->init();
	echo json_encode($response->mJournals);*/
?>