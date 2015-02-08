 <?php
require_once 'FourthDimension.php';

class ResourceType extends FourthDimension
{
 	public $name;
 	
 	function __construct($name)
 	{
 		$this->name = $name;
 		$sql = 'INSERT IGNORE INTO resource_types (name) VALUES ("'.$this->name.'")';
 		DatabaseHandler::Execute($sql);
 	}
}

class ConsumableType extends ResourceType
{
 	public $name;
 	
 	function __construct($name)
 	{
 		parent::__construct($name);
 		$this->name = $name;
 	}
}

class AssetType extends ResourceType
{
 	public $name;
 	
 	function __construct($name)
 	{
 		parent::__construct($name);
 		$this->name = $name;
 	}
}



 
class Resource extends FourthDimension
{
  	public $type;
  	public $name;
 
  	public function __construct(ResourceType $type)
  	{
     	//array_push($this->type, $type);
     	$this->type = $type;
  	}	

  	public function type()
  	{
      	return $this->type;
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

class ConsumableResource extends Resource
{
	
	function __construct(argument)
	{
		# code...
	}
}

class TemporalResource extends Resource
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Account extends FourthDimension
{
	public $resourceType;
	public $resourceEntry = array();

	function __construct(argument)
	{
		# code...
	}

	function credit(ResourceEntry $resourceEntry)
	{
		# code...
	}

	function debit(ResourceEntry $resourceEntry)
	{
		# code...
	}
}

class ResourceEntry
{
	public $quantity;

	function __construct(Quantity )
	{
		# code...
	}
}

class ResourceAllocation extends ResourceEntry
{
  	public $type;
  	public $name;
 
  	public function __construct(ResourceType $type)
  	{
     	//array_push($this->type, $type);
     	$this->type = $type;
  	}	

  	public function type()
  	{
      	return $this->type;
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



?>