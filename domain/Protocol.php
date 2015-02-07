<?php

require_once 'FifthDimension.php';

/*A protocol refers to a type of event*/
class Protocol extends FifthDimension
{
	protected $steps = array();

	function __construct(argument)
	{
		# code...
	}
}

class ProtocolReference
{
	
	function __construct(argument)
	{
		# code...
	}
}

class ProtocolDependency
{
	
	function __construct(argument)
	{
		# code...
	}
}

/**
* 
*/
class MeasurementProtocol extends Protocol
{
	
	function __construct(argument)
	{
		# code...
	}
}

class SourceMeasurementProtocol extends MeasurementProtocol
{
	
	function __construct(argument)
	{
		# code...
	}
}

class CalculatedMeasurementProtocol extends MeasurementProtocol
{
	
	function __construct(argument)
	{
		# code...
	}
}

class ComparativeCalculation extends CalculatedMeasurementProtocol
{
	
	function __construct(argument)
	{
		# code...
	}
}

class CausalCalculation extends CalculatedMeasurementProtocol
{
	
	function __construct(argument)
	{
		# code...
	}
}
?>