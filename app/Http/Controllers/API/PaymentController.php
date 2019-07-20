<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
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
     * @var User
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
     * @param int $salonId
     * @return SubscriptionResource
     */
    public function paymentByCard(Request $request, int $salonId): SubscriptionResource
    {
        $subscription = $this->paymentService->paymentByCard($this->user, $salonId, $request->all());
        return new SubscriptionResource($subscription, config('const.message.payment.payment_by_card'));
    }

    /**
     * @return string
     */
    public function cancelPaymentByCard(): JsonResponse
    {
        $result = $this->paymentService->cancelPaymentByCard($this->user);
        return response()->json([
            'data' => $result,
            'message' => config('const.message.payment.cancel_payment_by_card'),
        ]);
    }
}
