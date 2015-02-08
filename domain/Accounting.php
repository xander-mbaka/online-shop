 <?php
require_once 'FourthDimension.php';
require_once 'Event.php';

class ResourceType extends FourthDimension
{
 	public $name; 	
  	public $standardUnitOfMeasure;
 	
 	function __construct($name, Unit $unit)
 	{
 		$this->name = $name;
 		$this->standardUnitOfMeasure = $unit;
 		$sql = 'INSERT IGNORE INTO resource_types (name, units) VALUES ("'.$this->name.'", "'.$this->standardUnitOfMeasure.'")';
 		DatabaseHandler::Execute($sql);
 	}
}

class ConsumableType extends ResourceType
{ 	
 	function __construct($name, Unit $unit)
 	{
 		parent::__construct($name, $unit);
 	}
}

class AssetType extends ResourceType
{ 	
 	function __construct($name, Unit $unit)
 	{
 		parent::__construct($name, $unit);
 	}
}

/*class LiabilityType extends ResourceType
{
 	public $name;
 	
 	function __construct($name)
 	{
 		parent::__construct($name);
 		$this->name = $name;
 	}
}


class EquityType extends ResourceType
{
 	public $name;
 	
 	function __construct($name)
 	{
 		parent::__construct($name);
 		$this->name = $name;
 	}
}*/


class Unit
{
	public $unitId;
	public $name;
	function __construct($name)
	{
		$this->name = $name;
	}
}

class Quantity
{
	public $amount;
	public $units;
	function __construct($amount, $unit)
	{
		$this->amount;
		$this->unit;
	}
}

 
class Resource extends FourthDimension
{
  	public $type;
  	public $amount;
 
  	public function __construct(ResourceType $type, Quantity $amount)
  	{
     	//array_push($this->type, $type);
     	$this->type = $type;
     	$this->amount = $amount;
  	}	

  	public function type()
  	{
      	return $this->type;
  	}

  	public function amount()
  	{
      	return $this->amount;
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

class Account extends FourthDimension
{
	public $resourceType;
	public $entries = array();
	public $balance;//Quantity
	public $actualBalance;//Quantity
	public $availableBalance;//Quantity

	function __construct(ResourceType $type)
	{
		$this->resourceType = $type;
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

class AccountEntry extends Action
{
	public $eventId;
  	public $resource;
	public $whenBooked;
	public $whenCharged;

	function __construct($eventId, ResourceType $type, Quantity $amount)
	{
		parent::__construct();
		$this->resource = new Resource($type, $amount)
		$this->eventId = $eventId;
		//create database entry
	},

	public function book()
	{
		$timestamp = new DateTime();
		$this->whenBooked = $timestamp->format('YmdHis');//('Y-m-d H:i:s');
	}

	public function charge()
	{
		$timestamp = new DateTime();
		if (empty($this->whenBooked)) {
			$this->whenBooked = $timestamp->format('YmdHis');
		}
		
		$this->whenCharged = $timestamp->format('YmdHis');//('Y-m-d H:i:s');
	}

	public function bookAndCharge()
	{
		$timestamp = new DateTime();
		$this->whenBooked = $timestamp->format('YmdHis');
		$this->whenCharged = $timestamp->format('YmdHis');//('Y-m-d H:i:s');
		//update database
	}
}

//A resource entry qualifies as a resource allocation
class ResourceAllocation extends AccountEntry
{
 
  	function __construct($eventId, ResourceType $type, Quantity $amount)
  	{
     	parent::__construct($eventId, $type, $amount);
  	}

	public function use()
	{
		$this->charge();
		//update database
	}

	public function bookAndUse()
	{
		$this->bookAndCharge();
		//update database
	}
}

class GeneralResourceAllocation extends ResourceAllocation
{ 
  	public function __construct($eventId, ResourceType $type, Quantity $amount)
  	{
     	parent::__construct($eventId, $type, $amount);
  	}
}

class SpecificResourceAllocation extends ResourceAllocation
{
  	public $name;//unique identifier e.g serial number
 
  	public function __construct($eventId, ResourceType $type, Quantity $amount)
  	{
     	parent::__construct($eventId, $type, $amount);
  	}
}

class ConsumableResourceAllocation extends SpecificResourceAllocation
{
  	public function __construct($eventId, ResourceType $type, Quantity $amount)
  	{
     	parent::__construct($eventId, $type, $amount);
  	}
}

class TemporalResourceAllocation extends SpecificResourceAllocation
{
  	public function __construct($eventId, ResourceType $type, Quantity $amount)
  	{
     	parent::__construct($eventId, $type, $amount);
  	}
}

?>