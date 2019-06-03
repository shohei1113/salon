<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class EmailAlreadyExistsException extends Exception
{
    protected $email;

    /**
     * EmailAlreadyExistsException constructor.
     * @param $email
     */
    public function __construct($email)
    {
        parent::__construct('This Email already exists.');
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }
}