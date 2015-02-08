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
	public $phenomena;
	public $symbol;
	public $name;
	public $isSIUnit = false;//boolean

	//e.g new Unit('Time', 'Seconds', 's'), new Unit('Time', 'Minutes', 'm') ... etc.
	function __construct($phenomena, $name, $symbol)
	{
		$this->phenomena = $phenomena;
		$this->name = $name;
		$this->symbol = $symbol;
	}

	public function makeSIUnit()
	{
		$this->isSIUnit = true;
	}

	public static function getUnitByName()

	public static function getUnitByPhenomena()

	public static function getUnitBySIUnit()
}

class Quantity
{
	public $amount;
	public $unit;

	function __construct($amount, Unit $unit)
	{
		$this->amount = intval($amount);
		$this->unit = $unit;
	}

	public function amount()
	{
		return $this->amount;
	}

	public function unit()
	{
		return $this->unit;
	}
}

 
class Resource extends FourthDimension
{
  	public $type;
  	public $quantity;
 
  	public function __construct(ResourceType $type, Quantity $quantity)
  	{
     	//array_push($this->type, $type);
     	$this->type = $type;
     	$this->quantity = $quantity;
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
	public $unit;
	public $entries = array();
	public $balance;//Quantity
	public $actualBalance;//Quantity
	public $availableBalance;//Quantity

	function __construct(ResourceType $type, Unit $unit)
	{
		$this->resourceType = $type;
		$this->unit = $unit;
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

//Inventory
class HoldingAccount extends Account
{
	function __construct(ConsumableType $type, Unit $unit)
	{
		parent::__construct($type, $unit)
	}

}

//Fixed/Temporal Assets - furniture, machines, buildings, employees.
class AssetAccount extends Account
{
	function __construct(AssetType $type, Unit $unit)
	{
		parent::__construct($type, $unit)
	}

}

class EntryType
{
	public $type;//credit or debit


	function __construct($type)
	{
		$this->type = $type;
	}

	public function type()
	{
		return $this->type();
	}
}

class FinancialEntryType extends EntryType
{
	function __construct($type)
	{
		parent::__construct($type);
	}

}

class ConsumableEntryType extends EntryType
{
	function __construct($type)
	{
		parent::__construct($type);
	}

}

class TemporalEntryType extends EntryType
{
	function __construct($type)
	{
		parent::__construct($type);
	}

}


class Credit extends FinancialEntryType
{
	function __construct()
	{
		parent::__construct('credit');
	}

}

class Debit extends FinancialEntryType
{
	function __construct()
	{
		parent::__construct('debit');
	}

}

class StockIncrease extends ConsumableEntryType
{
	function __construct()
	{
		parent::__construct('stock increase');
	}

}

class StockDecrease extends ConsumableEntryType
{
	function __construct()
	{
		parent::__construct('stock decrease');
	}

}

class LogSession extends TemporalEntryType
{
	function __construct()
	{
		parent::__construct('session period log');
	}

}

class AccountEntry extends Action
{
	public $eventId;//transaction ID
	public $accountNumber;
  	public $resource;
	public $whenBooked;
	public $whenCharged;

	function __construct($eventId, EntryType $entryType, ResourceType $type, Quantity $quantity)
	{
		parent::__construct();
		$this->resource = new Resource($type, $quantity)
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
 
  	function __construct($eventId, ResourceType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $type, $quantity);
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
  	public function __construct($eventId, ResourceType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $type, $quantity);
  	}
}

class SpecificResourceAllocation extends ResourceAllocation
{
  	public $name;//unique identifier e.g serial number or name of person

  	public function __construct($eventId, ResourceType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $type, $quantity);
  	}
}

class ConsumableResourceAllocation extends SpecificResourceAllocation
{
  	public function __construct($eventId, ConsumableType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $type, $quantity);
  	}
}

abstract class TimeRecord
{
	
}

class TimePoint extends TimeRecord
{
	public $timestamp;
	
	function __construct($timestamp = new DateTime())
	{
		$this->timestamp = $timestamp;
	}
}

class TimePeriod extends TimeRecord
{
	public $start;
	public $end;
	
	function __construct(TimePoint $startTime = NULL, TimePoint $endTime = NULL)
	{
		$this->start = $startTime;
		$this->end = $endTime;
	}

	public function start(TimePoint $startTime)
	{
		$this->start = $startTime;
	}

	public function end(TimePoint $endTime)
	{
		$this->end = $endTime;
	}

	public function startTime()
	{
		return $this->start;
	}

	public function endTime()
	{
		return $this->end;
	}
}


class TemporalResourceAllocation extends SpecificResourceAllocation
{
  	public $timePeriod;//Time record - specific

  	public function __construct($eventId, AssetType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $type, $quantity);
  	}

  	public function bookResource(TimePoint $startTime, TimePoint $endTime)
	{
		$this->$timePeriod = new TimePeriod($startTime, $endTime);
	}

	public function durationOfUse()
	{
		return new Quantity(($this->timePeriod->endTime() - $this->timePeriod->startTime()), Unit::getUnitByName('second'));
	}
}

?>