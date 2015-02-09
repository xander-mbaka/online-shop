<?php

require_once 'Accounting.php';

/**
* 
*/

class ProductEntry extends ConsumableResourceAllocation
{//5th dimension
  
  public function __construct($eventId, Inventory $account, ConsumableType $type, Quantity $quantity)
    {
      parent::__construct($eventId, $account, $type, $quantity);
    }
}

class ProductTransfer extends Transaction
{//5th dimension composite of account entries
  
  public function __construct(Inventory $sourceAcc, Inventory $destinationAcc, TransactionType $ttype, ResourceType $rtype, Quantity $quantity, $description)
    {
      parent::__construct($sourceAcc, $destinationAcc, $ttype, $rtype, $quantity, $description);
      //e.g supplier account, warehouse account, 'Goods Received Inwards', Samsung Fridge BF-X450, 14 items, 'delivery from supplier xxxx'
    }
}

class Inventory extends StockAccount
{
  //public $resourceType;
  //public $unit;/
  //public $balance;//Quantity
  //public $actualBalance;//Quantity
  //public $availableBalance;//Quantity
  
    function __construct($name, ConsumableType $type, Unit $unit)
    {
        parent::__construct($name, $type, $unit)
    }

    public function receivePurchasedGoods(Supplier $supplier, ProductEntry $entry)
    {
        $this->decreaseStock($entry)
    }

    public function issueGoods(Party $party, ProductEntry $entry)
    {// may be employee, department, branch etc
        if ($this->verifyAvailability($entry)) {
            $this->decreaseStock($entry);
        }    
    }

    public function receivePurchasedGoods(Supplier $supplier, ProductEntry $entry)
    {
        $this->balance = intval($this->balance) + $entry;
        $this->saveBalance();
    }

    private function increaseStock(ProductEntry $entry)
    {
        $this->balance = intval($this->balance) + ($entry->resource)->amount;
        $this->updateBalance();
    }

    private function decreaseStock(ProductEntry $entry)
    {
        $this->balance = intval($this->balance) - $entry;
        $this->updateBalance();
    }
}
?>