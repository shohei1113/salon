<?php

namespace App\Services;

use Exception;
use Stripe\Stripe;

/**
 * Class PaymentService
 * @package App\Services
 */
class PaymentService
{
    /**
     * @param $user
     * @param $request
     * @return mixed
     */
    public function paymentByCard($user, $request)
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
        return $user->newSubscription('main', 'plan_FDvXAUzFpwwHoy')
            ->create($request->stripeToken);
    }

    /**
     * @param $user
     * @return string
     */
    public function cancelPaymentByCard($user)
    {
        try {
            $user->subscription('main')->cancelNow();
            return 'success';
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}