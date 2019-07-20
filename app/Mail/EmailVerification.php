<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class EmailVerification
 * @package App\Mail
 */
class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var string
     */
    private $token;

    /**
     * @var string
     */
    private $blade;

    /**
     * @var string
     */
    private $title;

    /**
     * EmailVerification constructor.
     * @param string $token
     * @param string $blade
     * @param $title
     */
    public function __construct(string $token, string $blade, $title)
    {
        $this->token = $token;
        $this->blade = $blade;
        $this->title = $title;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.' . $this->blade)
            ->subject($this->title)
            ->with(['token' => $this->token]);
    }
}
