 <?php

 /**
 * 
 */
require_once '../include/config.php';
require_once DOMAIN_DIR . 'error_handler.php';
ErrorHandler::SetHandler();
require_once DOMAIN_DIR . 'database_handler.php';

/**
* 
*/


class PartyType extends SeventhDimension
{
 	public static $types = array();
 	public $name;
 	
 	function __construct($name)
 	{
 		$this->name = $name;
 		$sql = 'INSERT IGNORE INTO party_types (name) VALUES ("'.$this->name.'")';
 		DatabaseHandler::Execute($sql);
 	}
}

class AccountabilityType extends SeventhDimension
{
 	public $name;
 	
 	function __construct($name)
 	{
 		$this->name = $name;
 		//$sql = 'INSERT INTO accountabilities (name) VALUES ("'.$this->name.'")';
 		//DatabaseHandler::Execute($sql);
 	}
}

class Accountability extends SeventhDimension
{
 	public $name;
 	
 	function __construct($name)
 	{
 		$this->name = $name;
 		//$sql = 'INSERT INTO accountabilities (name) VALUES ("'.$this->name.'")';
 		//DatabaseHandler::Execute($sql);
 	}
}
 
class Party extends SeventhDimension
{
  	protected $parentAccountabilities = array();
  	protected $childAccountabilities = array();
  	//protected $type = array();
  	public $type;
  	public $id;
  	public $name;
  	public $telephone;
  	public $email;
  	public $address;
  	public $shippingInfo;
 
  	public function __construct(PartyType $type)
  	{
     	//array_push($this->type, $type);
     	$this->type = $type;
  	}	

  	public function type()
  	{
      	return $this->type;
  	}

  	public function friendAddChildAccountability(Accountability $arg)
  	{
      	array_push($this->childAccountabilities, $arg);
  	}

  	public function friendAddParentAccountability(Accountability $arg)
  	{
      	array_push($this->parentAccountabilities, $arg);
  	}

  	public function __toString()
  	{
      	return $this->name;
  	}

  	function __set($propName, $propValue)
	{
		$this->$propName = $propValue;
	}

  	public function __destruct()
  	{
     	//echo 'The class "', __CLASS__, '" was destroyed.<br />';
  	} 
}

/**
* 
*/
class CustomerProfile
{
	private $name;
	private $address;
	private $telephone;
	private $email;
	private $shippingInfo;

	function __construct($name, $telephone, $address, $email, $shippingInfo)
	{
		$this->name = $name;
		$this->telephone = $telephone;
		$this->address = $address;
		$this->email = $email;
		$this->shippingInfo = $shippingInfo;
	}

	public function setProfile()
  	{
      	
  		$query = self::customerCheck($this->email);

  		if (empty($query)) {
	  		$today = new DateTime();
			$today = $today->format('Y-m-d H:i:s');
			//"UPDATE customers SET password = sha1('".$password."') WHERE email = '".$this->email."'";
	      	$sql = 'INSERT INTO customers (type, name, telephone, address, email, shippingInfo) VALUES ("UnregisteredCustomer", "'.$this->name.'", "'.$this->telephone.'", "'.$this->address.'", "'.$this->email.'", "'.$this->shippingInfo.'")';
	 		DatabaseHandler::Execute($sql);

	      	$sql2 = 'SELECT * FROM customers WHERE email = "'.$this->email.'"';
			// Execute the query and return the results
			$res =  DatabaseHandler::GetRow($sql2);
			return self::initialize($res);
		}else{
  			return false;
  		}
  	}

  	public function updateProfile()
  	{
      	
  		$query = self::customerCheck($this->email);

  		if (empty($query)) {
	  		$today = new DateTime();
			$today = $today->format('Y-m-d H:i:s');

			$sqltwo = "UPDATE customers SET subscription_status = 1, subscription_date = '". new DateTime() ."' subscription_expiry = '".$date."' WHERE email = '".$email."'";
					
				// Execute the query and return the results
				return DatabaseHandler::Execute($sqltwo);
			//"UPDATE customers SET password = sha1('".$password."') WHERE email = '".$this->email."'";
	      	$sql = 'INSERT INTO customers (type, name, telephone, address, email, shippingInfo) VALUES ("UnregisteredCustomer", "'.$this->name.'", "'.$this->telephone.'", "'.$this->address.'", "'.$this->email.'", "'.$this->shippingInfo.'")';
	 		DatabaseHandler::Execute($sql);

	      	$sql2 = 'SELECT * FROM customers WHERE email = "'.$this->email.'"';
			// Execute the query and return the results
			$res =  DatabaseHandler::GetRow($sql2);
			return self::initialize($res);
		}else{
  			return false;
  		}
  	}

  	private static function customerCheck($email)
	{
		// Build SQL query
		//$sql = 'CALL blog_get_comments_list(:blog_id)';
		$sql = 'SELECT * FROM customers WHERE email = "'.$email.'"';

		return DatabaseHandler::GetRow($sql);
	}

	private static function initialize($args)
  	{
      	return new CustomerProfile($args['name'], $args['telephone'], $args['address'], $args['email'], $args['shippingInfo']);
  	}
}
 
class Customer extends Party
{

  	public function __construct($type)
  	{
      	parent::__construct(new PartyType($type));
  	}
 
  	public static function get($id)
  	{
      	$sql = 'SELECT * FROM customers WHERE id = '.$id;
		// Execute the query and return the results
		$res =  DatabaseHandler::GetRow($sql);
		return self::initialize($res);
  	}

  	public static function registerNew($name, $telephone, $address, $email, $shippingInfo, $password)
  	{
      	
  		$query = self::customerCheck($email);

  		if (empty($query)) {
  			$today = new DateTime();
			$today = $today->format('Y-m-d H:i:s');

	      	$sql = 'INSERT INTO customers (type, name, telephone, address, email, shippingInfo, password, reg_date) VALUES ("RegisteredCustomer",'.$name.'", "'.$telephone.'", "'.$address.'", "'.$email.'", "'.$this->shippingInfo.'", sha1("'.$password.'"), "'.$today.'")';
	 		DatabaseHandler::Execute($sql);

	      	$sql2 = 'SELECT * FROM customers WHERE email = "'.$email.'"';
			// Execute the query and return the results
			$res =  DatabaseHandler::GetRow($sql2);
			return self::initialize($res);
  		}else{
  			return false;
  		}
  		
  	}

  	public function register($password)
  	{
      	
  		$query = self::customerCheck($this->email);

  		if (empty($query)) {
	  		$today = new DateTime();
			$today = $today->format('Y-m-d H:i:s');
			//"UPDATE customers SET password = sha1('".$password."') WHERE email = '".$this->email."'";
	      	$sql = 'INSERT INTO customers (type, name, telephone, address, email, shippingInfo, password, reg_date) VALUES ("RegisteredCustomer", "'.$this->name.'", "'.$this->telephone.'", "'.$this->address.'", "'.$this->email.'", "'.$this->shippingInfo.'", sha1("'.$password.'"), "'.$today.'")';
	 		DatabaseHandler::Execute($sql);

	      	$sql2 = 'SELECT * FROM customers WHERE email = "'.$this->email.'"';
			// Execute the query and return the results
			$res =  DatabaseHandler::GetRow($sql2);
			return self::initialize($res);
		}else{
  			return false;
  		}
  	}

  	public static function create($name, $telephone, $address, $email, $shippingInfo)
  	{
      	
  		$party = array(
		  			"type"=>"UnregisteredCustomer",
		  			"name"=>$name,
		  			"telephone"=>$telephone,
		  			"address"=>$address,
		  			"email"=>$email,
		  			"shippingInfo"=>$shippingInfo
		  		);

		return self::initialize($party);
  	}

  	public static function customerCheck($email)
	{
		// Build SQL query
		//$sql = 'CALL blog_get_comments_list(:blog_id)';
		$sql = 'SELECT * FROM customers WHERE email = "'.$email.'"';

		return DatabaseHandler::GetRow($sql);
	}

  	private static function initialize($args)
  	{
     	//parent::__construct();
     	$customer = new Customer($args['type']);

     	/*if (isset($args['id'])) {
     		$customer->id = $args['id'];
     	}     	
     	$customer->name = $args['name'];
     	$customer->telephone = $args['telephone'];
      	$customer->address = $args['address'];
      	$customer->email = $args['email'];
      	$customer->shippingInfo = $args['shippingInfo'];*/
      	foreach($args as $key=>$value){
      		if ($key == 'password') {
	     		$value = 'xxx-xxxx';
	     	}
			$customer->$key = $value;
		}
      	return $customer;
  	}

  	public static function authorize($email, $password)
	{
		// Build SQL query
		//$sql = 'CALL blog_get_comments_list(:blog_id)';
		$sql = 'SELECT id FROM customers WHERE email = "'.$email.'" AND password = sha1("'.$password.'")';
		// Execute the query and return the results
		$id = DatabaseHandler::GetOne($sql);

		if ($id) {
			//initiate global $_SESSION variables
			return self::get($id);
		}else{
			return false;
		}
	}
}
 
// Create a new object
//$newobj = new Customer('UnregisteredCustomer');
$newobj3 = Customer::create('Alex Mbaka', '0727596626', 'Apartment 602, Marafique Arcade, Thika', 'alex@qet.co.ke', 'Apartment 602, Marafique Arcade, Thika, Between 1800Hrs and 2100Hrs');
$val = $newobj3->register('password');
if ($val) {
	echo json_encode($val);
} else {
	echo 'Customer already exists. Try update';
}
//Replace all queries with procedure calls
 
?>