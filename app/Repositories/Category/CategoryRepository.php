<?php
namespace App\Repositories\Category;

use App\Entities\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * @var
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
     * @return Category[]|\Illuminate\Database\Eloquent\Collection
     */
    public function fetchCategoryList()
    {
        return $this->category->all();
    }
}
