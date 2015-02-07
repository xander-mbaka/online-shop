<?php

require_once 'FifthDimension.php';

class Event extends FifthDimension
{
	
	function __construct(argument)
	{
		# code...
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
	
	function __construct(argument)
	{
		# code...
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