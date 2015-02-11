<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'blog.php';
	
	class BlogRoll
	{
		/* Public variables available in journals_list.tpl Smarty template

		Variable available to calling function

		 */
		public $mSelectedDepartment = 0;
		//private static $mBlog = null;
		public $mBlog, $blogId, $journalId, $request, $name, $message;
		// Constructor reads query string parameter
		public function __construct()
		{
			

			if(isset($_POST['comblogid']) && isset($_POST['comname']) && isset($_POST['commessage'])){
				$this->name = $_POST['comname'];//Some clean up )
				$this->message = $_POST['commessage'];
				$this->blogId = $_POST['comblogid'];
				$this->addComment($this->blogId);
				echo 1;
			}else if(isset($_GET['comments'])){
				$this->journalId = $_GET['comments'];
				//echo "Yesssss";
				$this->getComments($this->journalId);
				
			}else if(isset($_GET['blogId'])){
				$this->blogId = $_GET['blogId'];
				//echo json_encode($response->mComment);
				$this->getBlogs();
				echo $this->mBlog[$this->blogId - 1]['full'];
			}else{
				$this->getBlogs();
				echo json_encode($this->mBlog);
			}

			/* If DepartmentId exists in the query string, we're visiting a
			department */
			//if (isset ($_GET['Journals']))
			//$this->mSelectedDepartment = (int)$_GET['Journals'];
		}
		/* Calls business tier method to read Journals list and create
		their links */
		
		public function getBlogs()
		{
			// Get the list of Journals from the business tier
			$this->mBlog = Blog::GetBlogRoll();
			
			// Create the department links
			//for ($i = 0; $i < count($this->mBlog); $i++)
				//$this->mBlog[$i]['name'] = Link::ToDepartment($this->mBlog[$i]['department_id']);
		}

		public function getComments($id)
		{
			// Get the list of Journals from the business tier
			echo json_encode(Blog::GetComments($id));
		}

		public function addComment($blogid)
		{
			// post the query to the database for later viewing
			Blog::InsertComment($blogid, $this->name, $this->message);
		}
	}

	new BlogRoll();
	
	//$response->getComments(1);
	
?>