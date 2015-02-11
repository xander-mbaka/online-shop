<?php

require_once 'Accounting.php';

class ProductType extends ConsumableType
{   
    public $costPrice;
    public $salesPrice;
    public $status;
    public $description;
    public $display;
    public $attributeTypes; // array() -- color, material, options of the same type
    // [attributeId, {attributeType, [{attributeName, value}*]}*]
    public $category;
    public $taxCode;
    public $manufacturer;
    public $make;
    public $model;
    public $packageContents; //array() to string/ strexplode/ json object


    function __construct($typeName, Unit $unit)
    {
        parent::__construct($typeName, $unit);
    }

    public static function getProductType($name) 
    {

    }

}

class ProductItem extends Resource
{
    
    public $itemId; //serial number
    public $batchNumber;
    public $serialNumber;
    public $features = array();
 
    public function __construct(ProductType $type, Quantity $quantity)
    {
        parent::__construct($type, $quantity);
    }

    public function addFeature($name, $key, $value)
    {
        //check if is in the list of allowable features
        //name - key => value
        //image - 'blue' => blue_watch.jpg
        //appearance - strap => 'leather'
        //appearance - color => 'red'
        //

        //???????
        $party = array($key=>$value);
        $this->features[$name][count($this->features)] = $value;

    }

    public function getFeature($key)
    {
        $this->features[$key] = $value;
    }

    public function save(){

    }
}

class ProductEntry extends ConsumableResourceAllocation
{//5th dimension
  
  public function __construct($eventId, Inventory $account, ProductItem $item)
    {
        //$item = new ProductItem();
        parent::__construct($eventId, $account, $item);
    }
}

class TransactionType extends Protocol
{
    public $txCode;
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

class ProductTransfer extends Transaction
{//5th dimension composite of account entries
    public function __construct(Inventory $sourceAcc, Inventory $destinationAcc, TransactionType $ttype, ResourceType $rtype, Quantity $quantity, $description)
    {
      parent::__construct($sourceAcc, $destinationAcc, $ttype, $rtype, $quantity, $description);
      //e.g supplier account, warehouse account, 'Goods Received Inwards', Samsung Fridge BF-X450, 14 items, 'delivery from supplier xxxx'
    }

    public function createEntry($account)
    {
        $item = new ProductItem($this->resourceType, $this->amount);
        return new ProductEntry($this->transactionId, $account, $item);
    }
}

class Inventory extends StockAccount
{
    //An inventory links a product type with 
    public $alertBalance;
  
    //should this account contain both stock balance and a monetary equivalent?
    //should provide link to receipt or invoice/delivery

    function __construct(ProductType $type, Unit $unit)
    {
        parent::__construct($type->type.'Account', $type, $unit)
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