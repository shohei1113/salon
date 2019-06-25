<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Category;
use App\Entities\Image;
use App\Repositories\Category\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Exception;

/**
 * Class CategoryService
 * @package App\Services
 */
class CategoryService
{
    /**
     * @var CategoryRepository
     */
    private $categoryRepository;

    /**
     * @var ImageService
     */
    private $imageService;

    /**
     * CategoryService constructor.
     * @param CategoryRepository $categoryRepository
     * @param ImageService $imageService
     */
    public function __construct(
        CategoryRepository $categoryRepository,
        ImageService $imageService
    ) {
        $this->categoryRepository = $categoryRepository;
        $this->imageService = $imageService;
    }

    /**
     * @return Collection
     */
    public function fetchCategoryList(): Collection
    {
        return $this->categoryRepository->fetchCategoryList();
    }

    /**
     * @param array $attribute
     * @param UploadedFile|null $image
     * @return Category
     * @throws Exception
     */
    public function createCategory(array $attribute, ?UploadedFile $image): Category
    {
        DB::beginTransaction();
        try {
            $category = $this->categoryRepository->create($attribute);
            $this->imageService->upload($image, $category->id, Image::S3_DIR_CATEGORY, Image::TYPE_CATEGORY);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }

        return $category;
    }

    /**
     * @param int $id
     * @param array $attribute
     * @param UploadedFile|null $image
     * @return Category
     * @throws Exception
     */
    public function updateCategory(int $id, array $attribute, ?UploadedFile $image): Category
    {
        DB::beginTransaction();
        try {
            $category = $this->categoryRepository->update($id, $attribute);
            $this->imageService->upload($image, $category->id, Image::S3_DIR_CATEGORY, Image::TYPE_CATEGORY);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }

        return $category;
    }

    /**
     * @param int $id
     * @return Category
     * @throws \Exception
     */
    public function deleteCategory(int $id): Category
    {
        return $this->categoryRepository->delete($id);
    }
}