<?php

namespace App\Http\Controllers\API;

use App\Entities\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class PaymentController
 * @package App\Http\Controllers\API
 */
class PaymentController extends Controller
{
    /**
     * @var PaymentService
     */
    private $paymentService;

    /**
     * @var
     */
    private $user;

    /**
     * PaymentController constructor.
     * @param PaymentService $payment
     */
    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
        $this->user = Auth::user();
    }

    /**
     * @param Request $request
     */
    public function paymentByCard(Request $request, $salonId)
    {
        $subscription = $this->paymentService->paymentByCard($this->user, $salonId, $request->all());
        return new SubscriptionResource($subscription);
    }

    /**
     * @return string
     */
    public function cancelPaymentByCard()
    {
        return $this->paymentService->cancelPaymentByCard($this->user);
    }
}
