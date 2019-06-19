<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\Category\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;

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
     * CategoryService constructor.
     * @param CategoryRepository $categoryRepository
     */
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->category = $categoryRepository;
    }

    /**
     * @return Collection
     */
    public function fetchCategoryList(): Collection
    {
        return $this->categoryRepository->fetchCategoryList();
    }
}