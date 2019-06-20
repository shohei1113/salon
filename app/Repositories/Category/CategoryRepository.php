<?php
declare(strict_types=1);

namespace App\Repositories\Category;

use App\Entities\Category;
use Illuminate\Database\Eloquent\Collection;

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
}
