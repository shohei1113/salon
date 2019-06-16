<?php

namespace App\Services;

use App\Entities\User;
use App\Repositories\Salon\SalonRepository;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Token;

/**
 * Class PaymentService
 * @package App\Services
 */
class PaymentService
{
    private $salon;

    public function __construct(SalonRepository $salon)
    {
        $this->salon = $salon;
    }

    /**
     * @param $user
     * @param $request
     * @return mixed
     */
    public function paymentByCard(User $user, $salonId, $attribute)
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
        $stripeToken = Token::create([
            'card' => [
                'number' => $attribute['number'],
                'exp_month' => $attribute['exp_month'],
                'exp_year' => $attribute['exp_year'],
                'cvc' => $attribute['cvc'],
                'name' => $attribute['email'] ?? NULL,
            ],
        ]);

        $salon = $this->salon->fetchSalonById($salonId);
        return $user->newSubscription('main', $salon->plan_id)
            ->create($stripeToken->id);
    }

    /**
     * @param $user
     * @return string
     */
    public function cancelPaymentByCard(User $user)
    {
        try {
            $user->subscription('main')->cancelNow();
            return 'success';
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}