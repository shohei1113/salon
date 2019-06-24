<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $categoryList = $this->categoryService->fetchCategoryList();
        return CategoryResource::collection($categoryList);
    }

    /**
     * @param Request $request
     * @return CategoryResource
     * @throws \Exception
     */
    public function store(Request $request): CategoryResource
    {
        $createCategory = $this->categoryService->createCategory($request->all(), $request->image);
        return new CategoryResource($createCategory);
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
        return new CategoryResource($updateCategory);
    }

    /**
     * @param $id
     * @return CategoryResource
     * @throws \Exception
     */
    public function destroy(int $id): CategoryResource
    {
        $deleteCategory = $this->categoryService->deleteCategory($id);
        return new CategoryResource($deleteCategory);
    }
}
