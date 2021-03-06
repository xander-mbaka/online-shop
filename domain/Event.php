<?php

require_once 'FifthDimension.php';

class Event extends FifthDimension
{
	public $eventId;
	public $timestamp;// whenNoticed/whenRecorded
	public $whenOccured;

	function __construct($eventId)
	{
		if (empty($eventId)) {			
			$timestamp = new DateTime();
			$this->timestamp = $timestamp->format('YmdHis');
			$this->eventId = substr(md5(microtime()),rand(0,26),5).'-'.$timestamp->format('YmdHis');//or autoincrement
		}else{
			$this->eventId = $eventId;
			$this->load();
		}

	}

	public static function getEventById($eventId){
		$sql = 'SELECT * FROM events WHERE id = "'.$eventId.'"';
		// Execute the query and return the results
		$res =  DatabaseHandler::GetRow($sql);

		return self::initialize($res);
	}

	private static function initialize($args)
  	{
     	$event = new Event($args['id']);

      	foreach($args as $key=>$value){
			$event->$key = $value;
		}
      	return $event;
  	}

  	private function load()
  	{	
  		$sql = 'SELECT * FROM events WHERE id = "'.$this->eventId.'"';
		// Execute the query and return the results
		$res =  DatabaseHandler::GetRow($sql);
     	foreach($res as $key=>$value){
			$this->$key = $value;
		}
  	}

  	function __set($propName, $propValue)
  	{
  		$this->$propName = $propValue;
  	}
}

/**
* 
*/

class Behaviour extends Event
{
	
	function __construct(argument)
	{
		# code...
	}
}

/*class MentalEvent extends Event
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Thinking extends MentalEvent
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Intention extends MentalEvent
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Believing extends MentalEvent
{
	
	function __construct(argument)
	{
		# code...
	}
}*/



class Action extends Event
{
	
	function __construct()
	{
		parent::__construct();
	}
}

/*A plan is a wrapper for complex/composite actions*/
class Plan extends Action
{
	
	function __construct(argument)
	{
		# code...
	}
}


class Command extends Action
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Query extends Action
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Observation extends Action
{
	
	function __construct(argument)
	{
		# code...
	}
}

class CategoryObservation extends Observation
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Measurement extends Observation
{
	
	function __construct(argument)
	{
		# code...
	}
}

class ActiveObservation extends Observation
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Projection extends Observation
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Hypothesis extends Observation
{
	
	function __construct(argument)
	{
		# code...
	}
}

?>