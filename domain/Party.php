 <?php
require_once 'SixthDimension.php';

class PartyType extends SixthDimension
{
 	public $name;
 	
 	function __construct($name)
 	{
 		$this->name = $name;
 		$sql = 'INSERT IGNORE INTO party_types (name) VALUES ("'.$this->name.'")';
 		DatabaseHandler::Execute($sql);
 	}
}
 
class Party extends SixthDimension
{
  	public $parentAccountabilities = array();
  	public $childAccountabilities = array();
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

  	public function friendAddChildAccountability(Accountability $childAccountability)
  	{
      	array_push($this->childAccountabilities, $childAccountability);
  	}

  	public function friendAddParentAccountability(Accountability $parentAccountability)
  	{
      	array_push($this->parentAccountabilities, $parentAccountability);
  	}

    public function accountableTo(AccountabilityType $accountabilityType = null)
    {
        $result = array();

        if ($accountabilityType != null) {
            foreach ($this->parentAccountabilities as $parentAccountability) {
                if ($parentAccountability->type() == $accountabilityType) {
                  array_push($result, $parentAccountability->parent());;
                }
            }
        } else {
            foreach ($this->parentAccountabilities as $parentAccountability) {
                array_push($result, $parentAccountability->parent());;
            }
        }        
        return array_unique($result);        
    }

    public function ancestorsInclude(Party $party, AccountabilityType $accountabilityType)
    {
        foreach ($this->accountableTo($accountabilityType) as $parent) {
            if ($party == $parent) {
                return true;
            } elseif ($parent->ancestorsInclude($party, $accountabilityType)) {
                return true;
            }

            return false;
        }
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