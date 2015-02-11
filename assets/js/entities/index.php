<?php
// Manages the Journals list
  	require_once '../../include/config.php';
  	require_once DOMAIN_DIR . 'property.php';
	
	class PropertyListing
	{
		/* 	Variable available to calling function */
		
		//private static $mBlog = null;
		private $featured, $latest, $searchResult, $properties;
		// Constructor reads query string parameter
		public function __construct()
		{
			

			if(isset($_POST['operation'])){
				$operation = $_POST['operation'];
				if($operation == 'search'){
					if(isset($_POST['category'])){
						$category = $_POST['category'];
						if ($category == 'residential') {
							$type = mysql_real_escape_string($_POST['type']);
							$county = mysql_real_escape_string($_POST['county']);
							$town = mysql_real_escape_string($_POST['town']);
							$offer = mysql_real_escape_string($_POST['offer']);
							$bedrooms = mysql_real_escape_string($_POST['bedrooms']);
							$bathrooms = mysql_real_escape_string($_POST['bathrooms']);
							$size = mysql_real_escape_string($_POST['size']);
							$minPrice = mysql_real_escape_string($_POST['minprice']);
							$maxPrice = mysql_real_escape_string($_POST['maxprice']);
							$this->searchResidence($type, $county, $town, $offer, $bedrooms, $bathrooms, $size, $minPrice, $maxPrice);
						} elseif ($category == 'commercial') {
							$type = mysql_real_escape_string($_POST['type']);
							$county = mysql_real_escape_string($_POST['county']);
							$town = mysql_real_escape_string($_POST['town']);
							$offer = mysql_real_escape_string($_POST['offer']);
							$elevation = mysql_real_escape_string($_POST['elevation']);
							$zone = mysql_real_escape_string($_POST['zone']);
							$size = mysql_real_escape_string($_POST['size']);
							$minPrice = mysql_real_escape_string($_POST['minprice']);
							$maxPrice = mysql_real_escape_string($_POST['maxprice']);
							$this->searchCommercial($type, $county, $town, $offer, $elevation, $zone, $size, $minPrice, $maxPrice);
						} elseif ($category == 'land') {
							$type = mysql_real_escape_string($_POST['type']);
							$county = mysql_real_escape_string($_POST['county']);
							$town = mysql_real_escape_string($_POST['town']);
							$offer = mysql_real_escape_string($_POST['offer']);
							$landuse = mysql_real_escape_string($_POST['landuse']);
							$size = mysql_real_escape_string($_POST['size']);
							$minPrice = mysql_real_escape_string($_POST['minprice']);
							$maxPrice = mysql_real_escape_string($_POST['maxprice']);
							$this->searchLand($type, $county, $town, $offer, $landuse, $size, $minPrice, $maxPrice);
						} else {
							echo 0;
						}
						
					}else{
						$county = mysql_real_escape_string($_POST['county']);
						$town = mysql_real_escape_string($_POST['town']);
						$offer = mysql_real_escape_string($_POST['offer']);
						$minPrice = mysql_real_escape_string($_POST['minprice']);
						$maxPrice = mysql_real_escape_string($_POST['maxprice']);
						$this->searchProperty($county, $town, $offer, $minPrice, $maxPrice);
					}
						
				}elseif($operation == 'featured'){
					$this->getFeaturedProperties();				
				}elseif($operation == 'latest'){
					if(isset($_POST['home'])){	
						$this->getHomeLatestProperties();
					}elseif(isset($_POST['page'])){
						$page = mysql_real_escape_string($_POST['page']);
						$this->getLatestProperties($page);
					}else{
						echo 0;
					}
				}else{ 
					echo 0;
				}
			}else{
			     echo 0;
			}
		}
		/* Calls business tier method to read Journals list and create
		their links */
		
		public function getFeaturedProperties()
		{
			// Get the list of Journals from the business tier
			$this->featured = Property::GetFeaturedProperties();
			echo json_encode($this->featured);
		}

		public function getLatestProperties($page)
		{
			// Get the list of Journals from the business tier
			if ($page == undefined) {
				$page = 1;
			}

			$this->latest = Property::GetLatestProperties($page * 30);
			
			echo json_encode($this->latest);
		}

		public function getHomeLatestProperties()
		{
			// Get the list of Journals from the business tier
			$this->latest = Property::GetLatestProperties(9);
			
			echo json_encode($this->latest);
		}

		public function getProperties($page)
		{
			// Get the list of Journals from the business tier
			if ($page == undefined) {
				$page = 1;
			}
			
			$this->properties = Property::GetProperties($page * 30);
			
			echo json_encode($this->properties);
		}

		public function searchProperty($county, $town, $offer, $minPrice, $maxPrice)
		{
			// Get the list of Journals from the business tier
			$this->searchResult = Property::SearchProperty($county, $town, $offer, $minPrice, $maxPrice);

			echo json_encode($this->searchResult);
		}

		public function searchResidence($type, $county, $town, $offer, $bedrooms, $bathrooms, $size, $minPrice, $maxPrice)
		{
			// Get the list of Journals from the business tier
			$this->searchResult = Property::SearchResidence($type, $county, $town, $offer, $bedrooms, $bathrooms, $size, $minPrice, $maxPrice);

			echo json_encode($this->searchResult);
		}

		public function searchCommercial($type, $county, $town, $offer, $elevation, $zone, $size, $minPrice, $maxPrice)
		{
			// Get the list of Journals from the business tier
			$this->searchResult = Property::SearchCommercial($type, $county, $town, $offer, $elevation, $zone, $size, $minPrice, $maxPrice);

			echo json_encode($this->searchResult);
		}

		public function searchLand($type, $county, $town, $offer, $landuse, $size, $minPrice, $maxPrice)
		{
			// Get the list of Journals from the business tier
			$this->searchResult = Property::SearchLand($type, $county, $town, $offer, $landuse, $size, $minPrice, $maxPrice);

			echo json_encode($this->searchResult);
		}
	}

	$response = new PropertyListing();
	//$response->init();
	//echo json_encode($response->mJournals);
?>