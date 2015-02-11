<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'indicator.php';
	
	class IndicatorsList
	{
		/* 	Variable available to calling function */
		public $mIndicators;
		// Constructor reads query string parameter
		public function __construct()
		{
			/* If DepartmentId exists in the query string, we're visiting a
			department */
			//if (isset ($_GET['Indicators']))
			//$this->mSelectedDepartment = (int)$_GET['Indicators'];
		}
		/* Calls business tier method to read Indicators list and create
		their links */
		public function init()
		{
			// Get the list of Indicators from the business tier
			$this->mIndicators = Indicator::GetIndicators();
			// Create the department links
			//for ($i = 0; $i < count($this->mIndicators); $i++)
				//$this->mIndicators[$i]['name'] = Link::ToDepartment($this->mIndicators[$i]['department_id']);
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

	$response = new IndicatorsList();
	$response->init();
	echo json_encode($response->mIndicators);
?>