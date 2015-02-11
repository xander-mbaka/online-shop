<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'contact.php';
	
	class ContactPage
	{
		public $mBlog, $mComment;
		private $request, $name, $email, $subject, $message;
		// Constructor reads query string parameter
		public function __construct()
		{
			/* If DepartmentId exists in the query string, we're visiting a
			department */
			if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){
				$this->name = mysql_real_escape_string($_POST['name']);//Some clean up :)
				$this->email = mysql_real_escape_string($_POST['email']);
				$this->subject = mysql_real_escape_string($_POST['subject']);
				$this->message = mysql_real_escape_string($_POST['message']);
				$this->addEnquiry();
				echo 1;
			}else{
			
			}
		}
		/* Calls business tier method to read Journals list and create
		their links */
		
		public function addEnquiry()
		{
			// post the query to the database for later viewing
			Contact::InsertQuery($this->name, $this->email, $this->subject, $this->message);
		}

		public function getReadEnquiries()
		{
			// post the query to the database for later viewing
			Contact::SetQuery($name, $email, $subject, $message);
		}

		public function getUnreadEnquiries()
		{
			// post the query to the database for later viewing
			Contact::SetQuery($name, $email, $subject, $message);
		}

		public function getAllEnquiries()
		{
			// post the query to the database for later viewing
			Contact::SetQuery($name, $email, $subject, $message);
		}

		
	}

	new ContactPage();
	
?>