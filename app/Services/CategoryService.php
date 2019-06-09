<?php

namespace App\Services;

use App\Repositories\Category\CategoryRepository;

class CategoryService
{
    /**
     * @var CategoryRepository
     */
    private $category;

    /**
     * CategoryService constructor.
     * @param CategoryRepository $category
     */
    public function __construct(CategoryRepository $category)
    {
        $this->category = $category;
    }

    /**
     * @return \App\Entities\User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function fetchCategoryList()
    {
        return $this->category->fetchCategoryList();
    }
}