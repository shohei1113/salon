<?php

namespace App\Http\Controllers\API;

use App\Services\SalonService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;

class SalonController extends Controller
{
    private $salonService;

    public function __construct(SalonService $salonService)
    {
        $this->salonService = $salonService;
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $salon = $this->salonService->createSalon($user, $request->all());
        return $salon;
    }
}
