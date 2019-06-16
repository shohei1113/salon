<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\BaseResource;
use App\Http\Resources\SalonResource;
use App\Services\SalonService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class SalonController
 * @package App\Http\Controllers\API
 */
class SalonController extends Controller
{
    /**
     * @var SalonService
     */
    private $salonService;

    /**
     * SalonController constructor.
     * @param SalonService $salonService
     */
    public function __construct(SalonService $salonService)
    {
        $this->salonService = $salonService;
    }

    /**
     * @return BaseResource
     */
    public function index($categoryId = NULL)
    {
        $salons = $this->salonService->fetchSalonList($categoryId);
        return new BaseResource(SalonResource::collection($salons), config('const.salon.index'));
    }

    /**
     * @param Request $request
     * @return SalonResource
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $salon = $this->salonService->createSalon(Auth::id(), $request->all());
        return new SalonResource($salon, config('const.salon.store'));
    }

    /**
     * @param $id
     * @return SalonResource
     */
    public function show($id)
    {
        $salon = $this->salonService->fetchSalonById($id);
        return new SalonResource($salon, config('const.salon.show'));
    }

    /**
     * @param Request $request
     * @param $id
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        $salon = $this->salonService->updateSalon($id, $request->all());
        return new SalonResource($salon, config('const.salon.update'));
    }
}
