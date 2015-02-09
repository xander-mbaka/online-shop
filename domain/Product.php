<?php

require_once 'Accounting.php';

/**
* 
*/

class ProductEntry extends ConsumableResourceAllocation
{
  
  public function __construct($eventId, Inventory $account, ConsumableType $type, Quantity $quantity)
    {
      parent::__construct($eventId, $account, $type, $quantity);
    }
}

class ProductTransfer extends Transaction
{
  
  public function __construct(Inventory $sourceAcc, Inventory $destinationAcc, TransactionType $ttype, ResourceType $rtype, Quantity $quantity, $description)
    {
      parent::__construct($sourceAcc, $destinationAcc, $ttype, $rtype, $quantity, $description);
      //e.g supplier account, warehouse account, 'Goods Received Inwards', Samsung Fridge BF-X450, 14 items, 'delivery from supplier xxxx'
    }
}

class Inventory extends HoldingAccount
{
  public $postingRule;// - associated proposed action [source = destination inc. fees]
  public $sourceAccounts;
  public $destinationAccounts;
  
  function __construct(ConsumableType $type, Unit $unit)
  {
    parent::__construct($type, $unit)
  }

  public static function receiveProduct(ProductEntry $product)
  {
    $this->balance = 
  }

  public function verifyPreconditions()
  {
    
  }

  public function makePayment()
  {
    
  }
}
?>