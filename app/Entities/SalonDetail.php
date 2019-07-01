<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SalonDetail
 * @package App\Entities
 */
class SalonDetail extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'salon_id', 'contents', 'message', 'target',
    ];

    /**
     * @param $value
     * @return string
     */
    public function convertUrlText($value): string
    {
        return mb_ereg_replace('(https?://[-_.!~*\'()a-zA-Z0-9;/?:@&=+$,%#]+)', '<a href="\1" target="_blank">\1</a>', $value);
    }

    /**
     * @param $value
     * @return string
     */
    public function getContentsAttribute($value): string
    {
        return $this->convertUrlText($value);
    }

    /**
     * @param $value
     * @return string
     */
    public function getMessageAttribute($value): string
    {
        return $this->convertUrlText($value);
    }

    /**
     * @param $value
     * @return string
     */
    public function getTargetAttribute($value): string
    {
        return $this->convertUrlText($value);
    }
}
