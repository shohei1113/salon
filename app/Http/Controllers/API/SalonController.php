<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\Salon;
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
     * @param int|null $categoryId
     * @return BaseResource
     */
    public function index(?int $categoryId = NULL): BaseResource
    {
        $salons = $this->salonService->fetchSalonList($categoryId);
        return new BaseResource(SalonResource::collection($salons), config('const.salon.index'));
    }

    /**
     * @param Request $request
     * @return SalonResource
     * @throws \Exception
     */
    public function store(Request $request): SalonResource
    {
        $salon = $this->salonService->createSalon(Auth::id(), $request->all(), $request->image);
        return new SalonResource($salon, config('const.salon.store'));
    }

    /**
     * @param int $id
     * @return Salon
     */
    public function show(int $id): SalonResource
    {
        $salon = $this->salonService->fetchSalonById($id);
        return new SalonResource($salon, config('const.salon.show'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return SalonResource
     * @throws \Exception
     */
    public function update(Request $request, int $id): SalonResource
    {
        $salon = $this->salonService->updateSalon($id, $request->all(), $request->image);
        return new SalonResource($salon, config('const.salon.update'));
    }
}
