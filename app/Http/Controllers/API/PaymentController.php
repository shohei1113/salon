<?php

namespace App\Http\Controllers\API;

use App\Entities\User;
use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use Illuminate\Http\Request;

/**
 * Class PaymentController
 * @package App\Http\Controllers\API
 */
class PaymentController extends Controller
{
    /**
     * @var PaymentService
     */
    private $payment;

    /**
     * @var
     */
    private $user;

    /**
     * PaymentController constructor.
     * @param PaymentService $payment
     */
    public function __construct(PaymentService $payment)
    {
        $this->payment = $payment;
        $this->user = User::find(3);
    }

    /**
     * @param Request $request
     */
    public function paymentByCard(Request $request)
    {
        $this->payment->paymentByCard($this->user, $request);
    }

    /**
     * @return string
     */
    public function cancelPaymentByCard()
    {
        return $this->payment->cancelPaymentByCard($this->user);
    }
}
