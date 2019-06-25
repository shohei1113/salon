<?php
declare(strict_types=1);

namespace App\Repositories\Category;

use App\Entities\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

interface CategoryRepositoryInterface
{
    /**
     * @return Collection
     */
    public function fetchCategoryList(): Collection;

    /**
     * @param array $attribute
     * @return Category
     */
    public function create(array $attribute): Category;

    /**
     * @param int $id
     * @param array $attribute
     * @return Category
     */
    public function update(int $id, array $attribute): Category;

    /**
     * @param int $id
     * @return Category
     */
    public function delete(int $id): Category;
}
