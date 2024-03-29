<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\Salon;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseResource;
use App\Http\Resources\SalonResource;
use App\Http\Resources\SalonSimpleResource;
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
     * @var \App\Entities\User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    private $user;

    /**
     * SalonController constructor.
     * @param SalonService $salonService
     */
    public function __construct(SalonService $salonService)
    {
        $this->middleware('can:update,salon')->only('update');
        $this->middleware('can:delete,salon')->only('destroy');
        $this->salonService = $salonService;
        $this->user = Auth::user();
    }

    /**
     * @param int|null $categoryId
     * @return BaseResource
     */
    public function index(?int $categoryId = NULL): BaseResource
    {
        $salonList = $this->salonService->fetchSalonList($categoryId);
        return new BaseResource(SalonResource::collection($salonList), config('const.message.salon.index'));
    }

    /**
     * @param Request $request
     * @return SalonResource
     * @throws \Exception
     */
    public function store(Request $request): SalonResource
    {
        $createSalon = $this->salonService->createSalon(Auth::id(), $request->all(), $request->image);
        return new SalonResource($createSalon, config('const.message.salon.store'));
    }

    /**
     * @param int $id
     * @return Salon
     */
    public function show(int $id): SalonSimpleResource
    {
        $salon = $this->salonService->fetchSalonById($id);
        return new SalonSimpleResource($salon, config('const.message.salon.show'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return SalonResource
     * @throws \Exception
     */
    public function update(Request $request, Salon $salon): SalonResource
    {
        $updateSalon = $this->salonService->updateSalon($salon->id, $request->all(), $request->image);
        return new SalonResource($updateSalon, config('const.message.salon.update'));
    }

    /**
     * @param Salon $salon
     * @return SalonResource
     * @throws \Exception
     */
    public function destroy(Salon $salon)
    {
        $deleteSalon = $this->salonService->deleteSalon($salon->id);
        return new SalonResource($deleteSalon, config('const.message.salon.delete'));
    }

    /**
     * @param int $id
     * @return SalonResource
     */
    public function preview(Salon $salon): SalonResource
    {
        $salon = $this->salonService->fetchSalonById($salon->id);
        return new SalonResource($salon, config('const.message.salon.preview'));
    }
}
