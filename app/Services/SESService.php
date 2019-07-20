<?php
declare(strict_types=1);

namespace App\Services;

use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Mail;

/**
 * Class S3Service
 * @package App\Services
 */
class SESService
{
    /**
     * @param string $email
     * @param string $token
     * @param string $blade
     * @param $title
     */
    public function sendEmailVerifyMail(string $email, string $token, string $blade, $title): void
    {
        $emailVerify = new EmailVerification($token, $blade, $title);
        Mail::to($email)->send($emailVerify);
    }
}