<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategorySimpleResource;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Class CategoryController
 * @package App\Http\Controllers\API
 */
class CategoryController extends Controller
{
    /**
     * @var CategoryService
     */
    private $categoryService;

    /**
     * CategoryController constructor.
     * @param CategoryService $categoryService
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * @return BaseResource
     */
    public function index(): BaseResource
    {
        $categoryList = $this->categoryService->fetchCategoryList();
        return new BaseResource(CategoryResource::collection($categoryList), config('const.message.category.index'));
    }

    /**
     * @param Request $request
     * @return CategoryResource
     * @throws \Exception
     */
    public function store(Request $request): CategoryResource
    {
        $createCategory = $this->categoryService->createCategory($request->all(), $request->image);
        return new CategoryResource($createCategory, config('const.message.category.store'));
    }

    /**
     * @param Request $request
     * @param $id
     * @return CategoryResource
     * @throws \Exception
     */
    public function update(Request $request, int $id): CategoryResource
    {
        $updateCategory = $this->categoryService->updateCategory($id, $request->all(), $request->image);
        return new CategoryResource($updateCategory, config('const.message.category.update'));
    }

    /**
     * @param $id
     * @return CategoryResource
     * @throws \Exception
     */
    public function destroy(int $id): CategoryResource
    {
        $deleteCategory = $this->categoryService->deleteCategory($id);
        return new CategoryResource($deleteCategory, config('const.message.category.delete'));
    }

    /**
     * @param int $id
     * @return CategorySimpleResource
     */
    public function categoryListWithSalons(int $id): CategorySimpleResource
    {
        $categoryListWithSalons = $this->categoryService->fetchCategoryListwithSalons($id);
        return new CategorySimpleResource($categoryListWithSalons);
    }
}
