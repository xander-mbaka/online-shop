<?php

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

?>