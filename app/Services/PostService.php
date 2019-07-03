<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Image;
use App\Entities\Post;
use App\Repositories\Post\PostRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Class PostService
 * @package App\Services
 */
class PostService
{
    /**
     * @var
     */
    private $imageRepository;

    /**
     * @var PostRepository
     */
    private $postRepository;

    /**
     * @var S3Service
     */
    private $s3Service;

    /**
     * @var ImageService
     */
    private $imageService;

    /**
     * PostService constructor.
     * @param PostRepository $postRepository
     * @param ImageService $imageService
     * @param S3Service $s3Service
     */
    public function __construct(
        PostRepository $postRepository,
        ImageService $imageService,
        S3Service $s3Service
    ) {
        $this->postRepository = $postRepository;
        $this->imageService = $imageService;
        $this->s3Service = $s3Service;
    }

    /**
     * @param int|null $postId
     * @return Collection
     */
    public function fetchPostList(?int $salonId = NULL): Collection
    {
        return $this->postRepository
            ->fetchPostList($salonId)
            ->sortByDesc('created_at');
    }

    /**
     * @param array $attribute
     * @param UploadedFile $image
     * @return Post
     * @throws Exception
     */
    public function createPost(array $attribute, ?UploadedFile $image): Post
    {
        Log::debug('$attribute="'.print_r($attribute, true).'"');
        Log::debug('$image="'.print_r($image, true).'"');
        DB::beginTransaction();
        try {
            $post = $this->postRepository->create($attribute);
            $this->imageService->upload($image, $post->id, Image::S3_DIR_POST, Image::TYPE_POST);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $post;
    }

    /**
     * @param int $id
     * @param array $attribute
     * @param UploadedFile|null $image
     * @return Post
     * @throws Exception
     */
    public function updatePost(int $id, array $attribute, ?UploadedFile $image): Post
    {
        DB::beginTransaction();
        try {
            $post = $this->postRepository->update($id, $attribute);
            $this->imageService->upload($image, $post->id, Image::S3_DIR_POST, Image::TYPE_POST);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
        return $post;
    }

    /**
     * @param int $id
     * @return Post
     */
    public function deletePost(int $id): Post
    {
        return $this->postRepository->delete($id);
    }
}