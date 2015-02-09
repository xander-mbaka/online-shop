 <?php
require_once 'FourthDimension.php';
require_once 'Protocol.php';
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

class ConvertionRatio
{	
	public $name;
	public $number;
	public $fromUnit;
	public $toUnit;
	public static $cache;

	function __construct(Unit $fromUnit, Unit $toUnit, $ratio)
	{
		$this->name = $name;
		$this->number = $ratio;
		$this->fromUnit = $fromUnit;
		$this->toUnit = $toUnit;
	}

	public function create()
	{

	}

	public function update()
	{

	}

	public function delete()
	{

	}

	public static function clearRegistry()

	public static function getConversionRatio($name)

	public static function initialize($args)
}

class Unit
{
	public $unitId;
	public $phenomena;
	public $symbol;
	public $name;
	public $isSIUnit = false;//boolean
	public static $cache;

	//e.g new Unit('Time', 'Seconds', 's'), new Unit('Time', 'Minutes', 'm') ... etc.
	//e.g new Unit('Items', 'Integer', '') ... etc.
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

	public function save()
	{
		
	}

	public function convertTo($name)
	{
		var $phenomena = self::getUnitByName($name);
		if ($this->phenomena != $phenomena->phenomena) {
			return false; //Error: Cannot convert between different phenomena
		} else {
			# code...
		}
		
	}

	public static function getUnitByName($name)

	public static function getUnitByPhenomena()

	public static function getUnitBySIUnit()

	public static function initialize($args)
}


class Currency extends Unit
{
	
	function __construct($name, $symbol)
	{
		parent::__construct('Money', $name, $symbol);
	}

	public static function getCurrencyBySymbol($symbol)
	{

	}

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

class Money extends Quantity
{
	
	function __construct($amount, Currency $currency)
	{
		parent::__construct($amount, $currency);
	}
}

//$timeQty = new Quantity($timeInSeconds, Unit.getUnitByName('seconds'));
//$timeQty2 = new Quantity($timeInMinutes, Unit.getUnitByName('seconds'));
 
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

class TransactionType extends Protocol
{
	public $postingRule;// - associated proposed action [source = destination inc. fees]
	public $sourceAccountTypes;
	public $destinationAccountTypes;
	function __construct()
	{
		parent::__construct();
	}

	public static function create($paymentMethod)
	{

	}

	public function verifyPreconditions()
	{
		
	}

	public function makePayment()
	{
		
	}
}

class Transaction extends Action
{
	public $transactionId;
	public $transactionType;// defines: Protocol/PaymentMethod/Transaction Type/Posting Rules	$this->transactionType->protocol
	public $sourceAccount;
	public $destinationAccount;
	public $resourceType;
	public $amount;
	public $description;

	function __construct(Account $source, Account $destination, TransactionType $ttype, ResourceType $rtype, Quantity $quantity, $description)
	{
		parent::__construct();
		$this->transactionId = 'TX-'.$this->eventId;
		$this->transactionType = $ttype;
		$this->sourceAccount = $source;
		$this->destinationAccount = $destination;		
		$this->resourceType = $rtype;
		$this->amount = $quantity;
		$this->description = $description;
	}

	public function commit()
	{

	}
}


class Account extends FourthDimension
{
	public $accountName;
	public $accountNumber;
	public $resourceType;
	public $unit;
	public $entries = array();
	public $balance;//Quantity
	public $actualBalance;//Quantity
	public $availableBalance;//Quantity

	function __construct($name, ResourceType $type, Unit $unit)
	{
		$this->accountName;
		$this->resourceType = $type;
		$this->unit = $unit;
		//add to accounts/journals ledger
		//retrieve generated account number
	}

	public function initializeBalance(Quantity $balance)
	{
	    $this->balance = $balance->amount;
	    //update with accountNumber as key;
	}

	private function updateBalance()
	{
	    //update with accountNumber as key;
	}

	private function credit(ResourceEntry $resourceEntry)
	{
		$this->balance = intval($this->balance) + intval(($resourceEntry->resource)->amount);
        $this->updateBalance();
	}

	private function debit(ResourceEntry $resourceEntry)
	{
		$this->balance = intval($this->balance) - intval(($resourceEntry->resource)->amount);
        $this->updateBalance();
	}

	public function getHistory($limit = 5)
	{
	    $this->balance = $balance->amount;
	    //update with accountNumber as key;
	}
}

//Inventory - consumables, stock, customer
class HoldingAccount extends Account
{
	function __construct($name, ConsumableType $type, Unit $unit)
	{
		parent::__construct($name, $type, $unit)
	}

}

class StockAccount extends HoldingAccount
{
	function __construct($name, ConsumableType $type, Unit $unit)
	{
		parent::__construct($name, $type, $unit)
	}

}

//Fixed/Temporal Assets - furniture, machines, buildings, employees.
class AssetAccount extends Account
{
	function __construct($name, AssetType $type, Unit $unit)
	{
		parent::__construct($name, $type, $unit)
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

	function __construct($eventId, Account $account, EntryType $entryType, ResourceType $type, Quantity $quantity)
	{
		parent::__construct();
		$this->resource = new Resource($type, $quantity)
		$this->eventId = $eventId;
		$this->accountNumber = $account->$accountNumber;
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
 
  	function __construct($eventId, Account $account, ResourceType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $account, $type, $quantity);
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
  	public function __construct($eventId, Account $account, ResourceType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $account, $type, $quantity);
  	}
}

class SpecificResourceAllocation extends ResourceAllocation
{
  	public $name;//unique identifier e.g serial number or name of person

  	public function __construct($eventId, Account $account, ResourceType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $account, $type, $quantity);
  	}
}

class ConsumableResourceAllocation extends SpecificResourceAllocation
{
  	public function __construct($eventId, Account $account, ConsumableType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $account, $type, $quantity);
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

  	public function __construct($eventId, $account, AssetType $type, Quantity $quantity)
  	{
     	parent::__construct($eventId, $account, $type, $quantity);
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