<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\User;
use App\Repositories\Salon\SalonRepository;
use App\Repositories\User\UserRepository;
use Exception;
use Laravel\Cashier\Subscription;
use Stripe\Stripe;
use Stripe\Token;

/**
 * Class PaymentService
 * @package App\Services
 */
class PaymentService
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var SalonRepository
     */
    private $salonRepository;

    /**
     * PaymentService constructor.
     * @param UserRepository $userRepository
     * @param SalonRepository $salonRepository
     */
    public function __construct(
        UserRepository $userRepository,
        SalonRepository $salonRepository
    ) {
        $this->userRepository = $userRepository;
        $this->salonRepository = $salonRepository;
    }

    /**
     * @param User $user
     * @param int $salonId
     * @param array $attribute
     * @return Subscription
     */
    public function paymentByCard(User $user, int $salonId, array $attribute): Subscription
    {
        $stripeToken = $this->createStripeToken($attribute);
        $salon = $this->salonRepository->fetchSalonById($salonId);
        $this->userRepository->createUserSalon($user, $salon);

        return $user->newSubscription('main', $salon->plan_id)
            ->create($stripeToken->id);
    }

    /**
     * @param User $user
     * @return string
     */
    public function cancelPaymentByCard(User $user): string
    {
        try {
            $user->subscription('main')->cancelNow();
            return 'success';
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * @param array $attribute
     * @return Token
     */
    public function createStripeToken(array $attribute): Token
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
        return Token::create([
            'card' => [
                'number' => $attribute['number'],
                'exp_month' => $attribute['exp_month'],
                'exp_year' => $attribute['exp_year'],
                'cvc' => $attribute['cvc'],
                'name' => $attribute['name'] ?? NULL,
            ],
        ]);
    }
}