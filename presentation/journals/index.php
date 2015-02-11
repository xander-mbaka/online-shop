<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'journal.php';
	
	class JournalsList
	{
		/* 	Variable available to calling function */
		
		public $mSelectedDepartment = 0;
		public $mJournals;
		// Constructor reads query string parameter
		public function __construct()
		{
			/* If DepartmentId exists in the query string, we're visiting a
			department */
			//if (isset ($_GET['Journals']))
			//$this->mSelectedDepartment = (int)$_GET['Journals'];
		}
		/* Calls business tier method to read Journals list and create
		their links */
		public function init()
		{
			// Get the list of Journals from the business tier
			$this->mJournals = Journal::GetJournals();
			// Create the department links
			//for ($i = 0; $i < count($this->mJournals); $i++)
				//$this->mJournals[$i]['name'] = Link::ToDepartment($this->mJournals[$i]['department_id']);
		}
	}

	$request_method = strtolower($_SERVER['REQUEST_METHOD']);
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
	echo json_encode($response->mJournals);
?>