<?php
declare(strict_types=1);

namespace App\Repositories\Category;

use App\Entities\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * @var Category
     */
    private $category;

    /**
     * CategoryRepository constructor.
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    /**
     * @return Collection
     */
    public function fetchCategoryList(): Collection
    {
        return $this->category->all();
    }

    /**
     * @param array $attribute
     * @return Category
     */
    public function create(array $attribute): Category
    {
        return $this->category->create($attribute);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Category
     */
    public function update(int $id, array $attribute): Category
    {
        $category = $this->category->findOrFail($id);
        $category->update($attribute);
        return $category;
    }

    /**
     * @param int $id
     * @return Category
     * @throws \Exception
     */
//    public function delete(int $id): Category
//    {
//        $category = $this->category->findOrFail($id);
//        $category->delete();
//        return $category;
//    }
}
