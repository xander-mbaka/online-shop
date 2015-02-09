<?php

require_once 'Accounting.php';

/**
* 
*/
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

class ProductType extends ConsumableType
{   
    
    public $productId;
    public $purchasePrice;
    public $salesPrice;
    public $status;
    public $description;
    public $display;
    public $variety; // array() -- color, material, options of the same type
    public $category;

    function __construct($name, Unit $unit)
    {
        parent::__construct($name, $unit);
    }

    public static function getProductType($name) 
    {

    }
}

class ProductItem extends Resource
{
    
    public $batchNumber;
    public $serialNumber;
 
    public function __construct(ProductType $type, Quantity $quantity)
    {
        parent::__construct($type, $quantity);
    }   

}

class ProductEntry extends ConsumableResourceAllocation
{//5th dimension
  
  public function __construct($eventId, Inventory $account, ProductItem $item)
    {
        $item = new ProductItem()
        parent::__construct($eventId, $account, $item);
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
    public $alertBalance;
  
    //should this account contain both stock balance and a monetary equivalent?
    //should provide link to receipt or invoice/delivery

    function __construct($name, ProductType $type, Unit $unit)
    {
        parent::__construct($name, $type, $unit)
    }

    public function receivePurchasedGoods(Supplier $supplier, ProductEntry $entry)
    {
        //refactor to Transaction: [Transaction Type - Receive Purchased Goods]
        //affectes a 2 financial accounts [accounts payable/purchases and supplier account] and this holding account
        $this->decreaseStock($entry)
    }

    public function receiveReturnedGoods(Party $party, ProductEntry $entry)
    {//party: customer or sales agent
        //refactor to Transaction: [Transaction Type - Receive Returned Goods]
        //affectes a 2 financial accounts [accounts receivable/sales and customer account] 
        //and 2 holding accounts [this and goods issued account]

        $customerAccount = self::getAccount($customer->stockAccountNumber);
        $this->increaseStock($entry);
        $purchasesAccount->decreaseSales($entry);
    }

    public function issueGoods(Party $party, ProductEntry $entry)
    {// may be employee, customer, department, branch etc
        //refactor to Transaction: [Transaction Type - Receive Returned Goods]
        //affectes a 2 holding accounts [this and customer account] and this holding account
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