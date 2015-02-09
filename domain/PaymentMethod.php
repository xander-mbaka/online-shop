<?php

require_once 'Accounting.php';

class FinancialAccount extends FinancialTransaction
{
	public $name;
	function __construct($name)
	{
		parent::__construct();
		$this->name = $name;
	}
}

class FinancialTransaction extends Transaction
{
	function __construct(Account $source, Account $destination, TransactionType $ttype, Money $amount, $description)
	{
		$rtype = new ConsumableResourceType('Money', $amount->unit);
		parent::__construct($source, $destination, $ttype, $rtype, $amount, $description);
		$this->transactionId = 'TX-'.$this->eventId;
		$this->sourceAccount = $source;
		$this->destinationAccount = $destination;
	}

	public function commit()
	{
		//verify account and entry is of the same resource type;
	}
}

class Payment extends FinancialTransaction
{
	public $name;
	function __construct($name)
	{
		parent::__construct();
		$this->name = $name;
	}
}
//means: [ money, credit, debit, cheque, bank transfer, stock ] asset ::: payer and payee.
//before: invoice, after: receipt
class Credit extends Payment
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Debit extends Payment
{
	
	function __construct(argument)
	{
		# code...
	}
}


class Cash extends Payment
{
	
	function __construct(argument)
	{
		# code...
	}
}

class Cheque extends Payment
{
	
	function __construct(argument)
	{
		# code...
	}
}

class ElectronicPayment extends Payment
{
	protected $provider;

	protected static $providers = array();

	function __construct(argument)
	{
		//First check whether the provider is valid from the authorized payment methods
		parent::__construct();
		$this->provider = $provider;
	}

	protected static function checkValidity($provider)
	{

	}

	
}

class MobileTransfer extends ElectronicPayment
{
	
	function __construct($provider)
	{
		$this->provider = $provider;
	}
}

class EmailPayment extends ElectronicPayment
{
	
	function __construct($provider)
	{
		$this->provider = $provider;
		//e.g paypal
	}
}

class CreditCard extends ElectronicPayment
{
	
	function __construct(argument)
	{
		# code...
	}
}

class DebitCard extends ElectronicPayment
{
	
	function __construct(argument)
	{
		# code...
	}
}
?>