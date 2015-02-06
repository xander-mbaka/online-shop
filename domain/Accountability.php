<?php

/**
* Accountabilities define contracts which parties/agents get into
*
*/
require_once 'SeventhDimension.php';

class AccountabilityType extends SeventhDimension
{
 	public $name;
 	public $hierarchic = false;
 	
 	function __construct($name)
 	{
 		$this->name = $name;
 		$sql = 'INSERT INTO accountabilitytypes (name) VALUES ("'.$this->name.'")';
 		DatabaseHandler::Execute($sql);
 	}

 	public function beHierarchic()
  	{
  		$this->hierarchic = true;
  	}
}

class Accountability extends SeventhDimension
{
 	private $parent;
 	private $child;
 	private $type;
 	
 	function __construct(Party $parent, Party $child, AccountabilityType $accountabilityType)
 	{
 		$this->parent = $parent;
 		$this->child = $child;
 		$this->type = $accountabilityType;
        $parent->friendAddChildAccountability($this);
      	$child->friendAddParentAccountability($this);
 	}

 	public static function create(Party $parent, Party $child, AccountabilityType $accountabilityType)
  	{
  		if (!self::canCreate($parent, $child, $accountabilityType)) {
  			return false;
  		} else {
  			return new $this($parent, $child, $accountabilityType);
  		}
  	}

  	public static function canCreate(Party $parent, Party $child, AccountabilityType $accountabilityType)
  	{
  		if ($parent == $child)) {
  			return false;
  		} elseif ($parent->ancestorsInclude($child, $accountabilityType))) {
  			return false;
  		}else {
  			return $accountabilityType->canCreateAccountability($parent, $child);
  		}
  	}

  	public function parent()
  	{
  		return $this->parent;
  	}

  	public function child()
  	{
  		return $this->child;
  	}

  	public function type()
  	{
  		return $this->type;
  	}
}

?>