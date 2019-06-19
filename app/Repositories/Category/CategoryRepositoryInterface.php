<?php
declare(strict_types=1);

namespace App\Repositories\Category;

use Illuminate\Database\Eloquent\Collection;

interface CategoryRepositoryInterface
{
    /**
     * @return Collection
     */
    public function fetchCategoryList(): Collection;
}
