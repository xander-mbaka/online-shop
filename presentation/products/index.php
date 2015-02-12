<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'Product.php';
  	require_once DOMAIN_DIR . 'Catalog.php';
	
		class ProductCatalog
	{
		/* 	Variable available to calling function */
		
		public $mSelectedDepartment = 0;
		private $mJournals, $mArticles, $mIssues, $mCategories;
		// Constructor reads query string parameter
		public function __construct()
		{
			if(isset($_POST['operation'])){
				$operation = $_POST['operation'];
				if($operation == 'createJournal'){
					if(isset($_POST['url']) && isset($_POST['name']) && isset($_POST['category']) && isset($_POST['coverImgUrl'])){
						$url = $_POST['url'];//Some clean up :)
						$name = $_POST['name'];
						$category = $_POST['category'];
						$cover_img = $_POST['coverImgUrl'];//Some clean up :)
						$scrp_fn = $_POST['scrapingFn'];
						$this->createJournal($url, $name, $category, $cover_img, $scrp_fn);
					}else{
						echo 0;
					}
						
				}elseif($operation == 'updateJournal'){
					if(isset($_POST['journalId']) && isset($_POST['url']) && isset($_POST['category']) && isset($_POST['name']) && isset($_POST['coverImgUrl'])){
						$journalId = $_POST['journalId'];
						$url = $_POST['url'];
						$category = $_POST['category'];
						$name = $_POST['name'];
						$cover_img = $_POST['coverImgUrl'];
						$scrp_fn = $_POST['scrapingFn'];
						$this->updateJournal($journalId, $url, $name, $category, $cover_img, $scrp_fn);
					}else{
						echo 0;
					}
				
				}elseif($operation == 'deleteJournal'){
					if(isset($_POST['journalId'])){
						$journalId = $_POST['journalId'];
						$this->deleteJournal($journalId);
					}else{
						echo 0;
					}
				}elseif($operation == 'createIssue'){
					if(isset($_POST['journalId']) && isset($_POST['issue'])){
						$journalId = $_POST['journalId'];
						$issue = $_POST['issue'];
						$this->createIssue($journalId, $issue);
					}else{
						echo 0;
					}
						
				}elseif($operation == 'updateIssue'){
					if(isset($_POST['journalId']) && isset($_POST['issue']) && isset($_POST['previssue'])){
						$journalId = $_POST['journalId'];
						$issue = $_POST['issue'];
						$newissue = $_POST['issue'];
						$oldissue = $_POST['previssue'];
						$this->updateIssue($journalId, $newissue, $oldissue);
					}else{
						echo 0;
					}
				
				}elseif($operation == 'deleteIssue'){
					if(isset($_POST['journalId']) && isset($_POST['issue'])){
						$journalId = $_POST['journalId'];
						$issue = $_POST['issue'];
						$this->deleteIssue($journalId, $issue);
					}else{
						echo 0;
					}
				}elseif($operation == 'createArticle'){
					if(isset($_POST['journalId']) && isset($_POST['issue']) && isset($_POST['title']) && isset($_POST['author']) && isset($_POST['url']) && isset($_POST['abstract']) && isset($_POST['keywords'])){
						$journalId = $_POST['journalId'];
						$issue = $_POST['issue'];
						$title = $_POST['title'];
						$author = $_POST['author'];
						$url = $_POST['url'];
						$abstract = $_POST['abstract'];
						$keywords = $_POST['keywords'];
						$this->createArticle($journalId, $issue, $title, $author, $url, $abstract, $keywords);
					}else{
						echo 0;
					}
						
				}elseif($operation == 'updateArticle'){
					if(isset($_POST['articleId']) && isset($_POST['title']) && isset($_POST['author']) && isset($_POST['url']) && isset($_POST['abstract']) && isset($_POST['keywords'])){
						$articleId = $_POST['articleId'];
						$title = $_POST['title'];
						$author = $_POST['author'];
						$url = $_POST['url'];
						$abstract = $_POST['abstract'];
						$keywords = $_POST['keywords'];
						$this->updateArticle($articleId, $title, $author, $url, $abstract, $keywords);
					}else{
						echo 0;
					}
				
				}elseif($operation == 'deleteArticle'){
					if(isset($_POST['articleId']) && isset($_POST['journalId']) && isset($_POST['issue'])){
						$articleId = $_POST['articleId'];
						$journalId = $_POST['journalId'];
						$issue = $_POST['issue'];
						$this->deleteArticle($articleId, $journalId, $issue);
					}else{
						echo 0;
					}
				}elseif($operation == 'createCategory'){ 
					if(isset($_POST['name']) && isset($_POST['description']) ){
						$name = $_POST['name'];
						$description = $_POST['description'];
						$this->createCategory($name, $description);
					}else{
						echo 0;
					}
						
				}elseif($operation == 'updateCategory'){
					if(isset($_POST['categoryId']) && isset($_POST['name']) && isset($_POST['description']) ){
						$categoryId = $_POST['categoryId'];
						$name = $_POST['name'];
						$description = $_POST['description'];
						$this->updateCategory($categoryId, $name, $description);
					}else{
						echo 0;
					}
				
				}elseif($operation == 'deleteCategory'){
					if(isset($_POST['categoryId'])){
						$categoryId = $_POST['categoryId'];
						$this->deleteCategory($categoryId);
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
			}elseif(isset($_GET['journals'])){
				$this->getJournals();
			}elseif(isset($_GET['journal']) && isset($_GET['journalId'])){
				$journalId = $_GET['journalId'];
				$this->getJournal($journalId);
			}elseif(isset($_GET['latestPrefferedArticles'])){
				$this->getLatestArticlesEmail();
			}elseif(isset($_GET['latestArticles'])){
				$this->getLatestArticles();
			}elseif(isset($_GET['latestIssue']) && isset($_GET['journalId'])){
				$journalId = $_GET['journalId'];
				$this->getLatestIssueArticles($journalId);
			}elseif(isset($_GET['latestJournalIssue']) && isset($_GET['journalId'])){
				$journalId = $_GET['journalId'];
				$this->getLatestJournalIssue($journalId);
			}elseif(isset($_GET['issue']) && isset($_GET['journalId'])){
				$journalId = $_GET['journalId'];
				$issue = $_GET['issue'];
				$this->getIssueArticles($journalId, $issue);
			}elseif(isset($_GET['categoryId']) && isset($_GET['journalId'])){
				$journalId = $_GET['journalId'];
				$categoryId = $_GET['categoryId'];
				$this->getCategorisedArticles($journalId, $categoryId);
			}elseif(isset($_GET['categoryLatest'])){
				$categoryId = $_GET['categoryId'];
				$this->getCategoryArticles($categoryId);
			}elseif(isset($_GET['issues']) && isset($_GET['journalId'])){
				$journalId = $_GET['journalId'];
				$this->getIssues($journalId);
			}elseif(isset($_GET['categories'])){
				$this->getCategories();
			}elseif (isset ($_POST['coverUpload'])){
				$this->uploadJournalCover();
			}elseif (isset ($_GET['search'])){
				$operation = $_GET['search'];
				if($operation == 'title'){
					if(isset($_GET['key']) && isset($_GET['category'])){
						$key = $_GET['key'];
						$categoryId = $_GET['category'];
						$this->searchArticleByTitle($key, $categoryId);
					}else{
						echo 0;
					}						
				}elseif($operation == 'category'){
					if(isset($_GET['key']) && isset($_GET['category'])){
						$key = $_GET['key'];
						$categoryId = $_GET['category'];
						$this->searchArticleByCategory($key, $categoryId);
					}else{
						echo 0;
					}
				}elseif($operation == 'author'){
					if(isset($_GET['key']) && isset($_GET['category'])){
						$key = $_GET['key'];
						$categoryId = $_GET['category'];
						$this->searchArticleByAuthor($key, $categoryId);
					}else{
						echo 0;
					}
				}elseif($operation == 'keyword'){
					if(isset($_GET['key']) && isset($_GET['category'])){
						$key = $_GET['key'];
						$categoryId = $_GET['category'];
						$this->searchArticleByKeyword($key, $categoryId);
					}else{
						echo 0;
					}
				}

			}else{
				echo 0;
			}
		}
		/* Calls business tier method to read Journals list and create
		their links */
		
		private function validateAdmin()
		{
			if (isset ($_SESSION['admin_logged']) && $_COOKIE['admin_logged'] == true) {
				return true;
			}else{
				//return false;
				//Development override
				return true;
			}			
		}		

		public function getInventory()
		{//returns products and quantities
			echo json_encode(Catalog::GetInventory());			
		}

		public function getInventoryPage($page)
		{
			echo json_encode(Catalog::GetInventoryPage($page));
			
		}

		public function getCatalog()
		{//returns products and prices
			echo json_encode(Catalog::GetCatalog());
			
		}

		public function getCatalogPage($page)
		{//returns products and prices
			echo json_encode(Catalog::GetCatalogPage($page));
			
		}

		public function getProduct($id)
		{
			echo json_encode(Product::GetProduct($id));			
		}

		public function createProduct($name, $description, $cost, $sale, $discounted, $url, $status, $tax, $manufacturer, $make, $model)
		{
			if ($this->validateAdmin()) {
				Product::CreateProduct($name, $description, $cost, $sale, $discounted, $url, $status, $tax, $manufacturer, $make, $model);
				echo 1;
			}else{
				echo 0;
			}			
		}

		public function updateProduct($productId, $name, $description, $cost, $sale, $discounted, $url, $status, $tax, $manufacturer, $make, $model)
		{
			if ($this->validateAdmin()) {
				Product::UpdateProduct($productId, $name, $description, $cost, $sale, $discounted, $url, $status, $tax, $manufacturer, $make, $model);
				echo 1;
				// echo json_encode(model);
			}else{
				echo 0;
			}	
		}

		public function deleteProduct($productId)
		{
			if ($this->validateAdmin()) {
				Product::DeleteProduct($productId);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function getCategories()
		{
			echo json_encode(Catalog::GetCategories());
			
		}

		public function getCategory($id)
		{
			echo json_encode(Catalog::GetCategory($id));			
		}

		public function createCategory($name, $description)
		{
			if ($this->validateAdmin()) {
				Catalog::CreateCategory($name, $description);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function updateCategory($categoryId, $name, $description)
		{
			if ($this->validateAdmin()) {
				Catalog::updateCategory($categoryId, $name, $description);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function deleteCategory($categoryId)
		{
			if ($this->validateAdmin()) {
				Catalog::DeleteCategory($categoryId);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function getDepartments()
		{
			echo json_encode(Catalog::GetDepartments());
			
		}

		public function getDepartment($id)
		{
			echo json_encode(Catalog::GetDepartment($id));			
		}

		public function createDepartment($name, $description)
		{
			if ($this->validateAdmin()) {
				Catalog::CreateDepartment($name, $description);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function updateDepartment($categoryId, $name, $description)
		{
			if ($this->validateAdmin()) {
				Catalog::UpdateDepartment($categoryId, $name, $description);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function deleteDepartment($categoryId)
		{
			if ($this->validateAdmin()) {
				Catalog::DeleteDepartment($categoryId);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function getDepartments()
		{
			echo json_encode(Catalog::GetDepartments());
			
		}

		public function getDepartmentCategories($id)
		{
			echo json_encode(Catalog::GetDepartmentCategories($id));			
		}

		public function createDepartmentCategories($id, $args)
		{
			if ($this->validateAdmin()) {
				Catalog::CreateDepartmentCategories($id, $args);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function addDepartmentCategories($departmentId, $categoryId)
		{
			if ($this->validateAdmin()) {
				Catalog::AddDepartmentCategories($departmentId, $categoryId);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function updateDepartmentCategories($categoryId, $args)
		{
			if ($this->validateAdmin()) {
				Catalog::UpdateDepartmentCategories($categoryId, $args);
				echo 1;
			}else{
				echo 0;
			}	
		}

		public function deleteDepartmentCategory($departmentId, $categoryId)
		{
			if ($this->validateAdmin()) {
				Catalog::DeleteDepartmentCategory($categoryId);
				echo 1;
			}else{
				echo 0;
			}	
		}


		public function getLatestArticlesEmail()
		{
			session_start();
			if (isset($_SESSION['oauth_id'])){
	      		echo json_encode(Journal::GetLatestArticlesOauth($_SESSION['oauth_id']));
				//echo 1; 
	  		}elseif (isset($_SESSION['session_key'])){				
	      		echo json_encode(Journal::GetLatestArticlesEmail($_SESSION['session_key']));
	      		//echo $_SESSION['session_key'].'46';
				//echo 1; 
	  		}elseif (isset($_COOKIE['cookie_key'])){
	  			echo json_encode(Journal::GetLatestArticlesEmail($_COOKIE['cookie_key']));
	      		//echo $_COOKIE['session_key'].'23';
				//echo 1; 
	  		}else{
	  			echo 0;
	  		}
					 
		}		

		public function uploadJournalCover()
		{
			if (isset ($_POST['coverUpload']))
			{
			/* Check whether we have write permission on the
			product_images folder */
				if (!is_writeable(SITE_ROOT . '/assets/journalcovers/'))
				{
					echo "Can't write to the journal covers folder";
					exit();
				}
				// If the error code is 0, the file was uploaded ok
				if ($_FILES['ImageUpload']['error'] == 0)
				{	
					/* Use the move_uploaded_file PHP function to move the file
					from its temporary location to the product_images folder */
					move_uploaded_file($_FILES['ImageUpload']['tmp_name'], SITE_ROOT.'/assets/journalcovers/'.$_FILES['ImageUpload']['name']);
					// Update the product's information in the database
					//Catalog::SetImage($this->_mProductId, $_FILES['ImageUpload']['name']);
					echo $_FILES['ImageUpload']['name'];
				}
			}
		}


		public function searchCategoryByTitle($key, $categoryId)
		{
			if ($categoryId == 0) {
				$this->mArticles = Journal::SearchArticleByTitle($key);
				echo json_encode($this->mArticles);	
			}else{
				$this->mArticles = Journal::SearchCategoryArticleByTitle($key, $categoryId);
				echo json_encode($this->mArticles);	
			}
			
		}

		public function searchArticleByAuthor($key, $categoryId)
		{
			if ($categoryId == 0) {
				$this->mArticles = Journal::SearchArticleByAuthor($key);
				echo json_encode($this->mArticles);	
			}else{
				$this->mArticles = Journal::SearchCategoryArticleByAuthor($key, $categoryId);
				echo json_encode($this->mArticles);	
			}
			
		}

		public function searchArticleByCategory($key, $categoryId)
		{
			if ($categoryId == 0) {
				$this->mArticles = Journal::SearchArticleByCategory($key);
				echo json_encode($this->mArticles);
			}else{
				$this->mArticles = Journal::SearchCategoryArticleByCategory($key, $categoryId);
				echo json_encode($this->mArticles);	
			}
		}

		public function searchArticleByKeyword($key, $categoryId)
		{
			if ($categoryId == 0) {
				$this->mArticles = Journal::SearchArticleByKeyword($key);
				echo json_encode($this->mArticles);	
			}else{
				$this->mArticles = Journal::SearchCategoryArticleByKeyword($key, $categoryId);
				echo json_encode($this->mArticles);	
			}
			
		}

		
	}
	new ProductCatalog();

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