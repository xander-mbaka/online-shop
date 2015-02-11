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
					if(isset($_POST['email']) && isset($_POST['password'])){
						$username = $_POST['email'];
						$password = $_POST['password'];
						$this->login_cookie($username, $password);
					}else{
						echo 0;
					}
						
				}elseif($operation == 'login'){
					if(isset($_POST['email']) && isset($_POST['password'])){
						$username = $_POST['email'];
						$password = $_POST['password'];
						$this->login($username, $password);
					}else{
						echo 0;
					}				
				}elseif($operation == 'logintwitter'){
					header("Location: login-twitter.php");
				}elseif($operation == 'loginfacebook'){
					header("Location: login-facebook.php");
				}elseif($operation == 'availability'){
					if(isset($_POST['uname'])){
						$username = $_POST['uname'];	
						$this->check_replica($username);
					}else{
						echo 0;
					}
				}elseif($operation == 'change_subscription'){
					if(isset($_POST['email']) && isset($_POST['journal_ids'])){
						$email = $_POST['email'];
						$journal_ids = $_POST['journal_ids'];	
						$this->update_subscription($email, $journal_ids);
					}else{
						echo 0;
					}
				}elseif($operation == 'subscribe'){
					if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['rptpassword'])){
						$name = $_POST['name'];
						$email = $_POST['email'];
						$password = $_POST['password'];
						$rptpassword = $_POST['rptpassword'];
						$this->createUser($name, $email, $password, $rptpassword);
					}else{
						echo 0;
					}
				}elseif($operation == 'newsletter'){
					if(isset($_POST['name']) && isset($_POST['email'])){
						$name = $_POST['name'];
						$email = $_POST['email'];
						$this->subscribeNewsletter($name, $email);
					}else{
						echo 0;
					}
				}elseif($operation == 'preferredJournals'){
					if(isset($_POST['preferences']) && isset($_POST['userId'])){
						$prefs = $_POST['preferences'];
						$userId = $_POST['userId'];
						$this->setPreferredJournals($userId, $prefs);
					}else{
						echo 0;
					}
				}elseif($operation == 'changePassword'){
					if(isset($_POST['email']) && isset($_POST['oldpassword']) && isset($_POST['newpassword']) && isset($_POST['rptpassword'])){
						$email = $_POST['email'];
						$oldpassword = $_POST['oldpassword'];
						$newpassword = $_POST['newpassword'];
						$rptpassword = $_POST['rptpassword'];
						$this->changePassword($email, $oldpassword, $newpassword, $rptpassword);
					}else{
						echo 0;
					}
				}elseif($operation == 'recoverPassword'){
					if(isset($_POST['email'])){
						$email = $_POST['email'];
						$this->recoverPassword($email);
					}else{
						echo 0;
					}
				}elseif($operation == 'logout'){
					$this->logout();
				}elseif($operation == 'checkauth'){
					$this->check_auth();
				}else{ 
					echo 0;
				}
			}elseif(isset($_GET['username'])){
				$this->getUserName();
			}elseif(isset($_GET['preferredJournals'])){
				$this->getPreferredJournals();
			}elseif(isset($_GET['accountDetails'])){
				$this->getUserDetails();
			}elseif(isset($_GET['subscriptionDetails'])){
				$this->getUserDetails();
			}elseif(isset($_GET['userDetails'])){
				$this->getUserDetails();
			}else{
				echo 0;
			}
		}
		/* Calls business tier method to read Journals list and create
		their links */
		public function createUser($name, $email, $password, $rptpassword) {
			if ($password == $rptpassword) {
				echo User::CreateUser($name, $email, $password);
				//set user up with a default subscription to all journals
			}
	    }

	    public function subscribeNewsletter($name, $email) {
	    	echo User::SubscribeNewsletter($name, $email);
	    }

	    public function check_auth() {
	    	session_start();
			if (isset($_SESSION['session_key'])){
	      		echo 1;
	  		}elseif (isset($_COOKIE['cookie_key'])){
	      		echo 1;
	  		}else{
	  			echo 0;
	  		}
	    }
		
		public function update_subscription($email, $includedJournals) {
			//build array of journal ids then post to business tier
			
			/*if (/*condition) {
				User::UpdateSubscription($email, $journalIds);
				//set user up with a default subscription to all journals
				echo 1;
			}else{
				echo 0;
			}*/
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
	      		//setcookie('cookie_key',$_COOKIE['cookie_key'],time()-1209600, "/");
	  		}
			
			//compare username in access_restriction table to get clearance level
				
			$login = User::AuthorizeUser($email, $password);
		
			if (!isset($login['email'])) {
	     		echo 0;
	  		}else{
				session_start();
				$_SESSION['session_key'] = $email;
				$_SESSION['user_name'] = $login['username'];
				echo 1;
				//log user action
			}
	    }
		
		public function login_cookie($email, $password) {
			if (isset($_SESSION['session_key'])){
	      		unset($_SESSION['session_key']);
	  		}
			if (isset($_COOKIE['cookie_key'])){
	      		unset($_COOKIE['cookie_key']);
	      		//setcookie('cookie_key',$_COOKIE['cookie_key'],time()-1209600, "/");
	  		}
				
			$login = User::AuthorizeUser($email, $password);

			if (!isset($login['email'])) {
	     		echo 0;
	  		}else{
	  			session_start();
				setcookie("cookie_key", $email, time()+1209600, "/");	
				setcookie("user_name", $login['username'], time()+1209600, "/");				
				//log user action
				echo 1;
			}
	    }

	    public function getUserName() {
	    	session_start();
			if (isset($_SESSION['user_name'])){
	      		echo $_SESSION['user_name'];
	  		}elseif (isset($_COOKIE['user_name'])){				
	      		echo $_COOKIE['user_name'];
	  		}else{
	  			echo 300;
	  		}
	    }
		
		public function logout() {
			session_start();
			if(isset($_SESSION['session_key'])){
				$old_user = $_SESSION['session_key'];
	      		unset($_SESSION['session_key']);
	      		unset($_SESSION['user_name']);
							
				if (!empty($old_user)) {
	  				if (session_destroy()){
						//$log
						echo 1;
					}else{
						echo 0;
				  	}
				}else{
	 				echo 0;
				}
			}elseif(isset($_COOKIE['cookie_key'])){
				setcookie('cookie_key',$_COOKIE['cookie_key'],time()-1209600, "/");
				setcookie("user_name", $login['username'], time()-1209600, "/");
				unset($_COOKIE['cookie_key']);
				unset($_COOKIE['user_name']);
				setcookie('cookie_key', null, -1, '/');
				setcookie('user_name', null, -1, '/');
				//$log
				echo 1;
			}else{
				echo 0;
			}
	    }
		
		public function changePassword($email, $oldpassword, $newpassword, $rptnewpassword) {
			session_start();
			if (isset($_COOKIE['cookie_key'])){
				if ($newpassword == $rptnewpassword) {
					User::ChangePassword($email, $oldpassword, $newpassword);
					echo 1;
				}else{
					echo 0;
				}
				//echo json_encode($prefs);
				//echo $prefs[2];
			}elseif (isset($_SESSION['session_key'])){				
	      		if ($newpassword == $rptnewpassword) {
					User::ChangePassword($email, $oldpassword, $newpassword);
					echo 1;
				}else{
					echo 0;
				}
	  		}else{
	  			echo 0;
	  		}
			       
	    }

	    public function setPreferredJournals($userId, $prefs) {
			session_start();
			if (isset($_COOKIE['cookie_key'])){
				User::SetPreferredJournals($userId, $prefs);
				echo 1;
				//echo json_encode($prefs);
				//echo $prefs[2];
			}elseif (isset($_SESSION['session_key'])){				
	      		User::SetPreferredJournals($userId, $prefs);
				echo 1;
	  		}else{
	  			echo 0;
	  		}   
	    }
		
		public function recoverPassword($email) {
			echo User::RecoverPassword($email);
	    }

	    public function getPreferredJournals() {
			session_start();
			if (isset($_SESSION['oauth_id'])){
	      		echo json_encode(User::GetPreferredJournalsOauth($_SESSION['oauth_id']));
				//echo 1; 
	  		}elseif (isset($_COOKIE['cookie_key'])){
	      		echo json_encode(User::GetPreferredJournals($_COOKIE['cookie_key']));
				//echo 1; 
	  		}elseif (isset($_SESSION['session_key'])){				
	      		echo json_encode(User::GetPreferredJournals($_SESSION['session_key']));
				//echo 1; 
	  		}else{
	  			echo 0;
	  		}
	    }

	    public function getUserDetails() {
	    	session_start();
			if (isset($_SESSION['oauth_id'])){
	      		echo json_encode(User::GetUserDetailsOauth($_SESSION['oauth_id']));
				//echo 1; 
	  		}elseif (isset($_SESSION['session_key'])){				
	      		echo json_encode(User::GetUserDetails($_SESSION['session_key']));
				//echo 1; 
	  		}elseif (isset($_COOKIE['cookie_key'])){
	      		echo json_encode(User::GetUserDetails($_COOKIE['cookie_key']));
				//echo 1; 
	  		}else{
	  			echo 0;
	  		}
	    }
	}

	new UserOperations();

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