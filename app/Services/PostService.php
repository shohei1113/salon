<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Image;
use App\Entities\Post;
use App\Repositories\Image\ImageRepository;
use App\Repositories\Post\PostRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

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
     * PostService constructor.
     * @param ImageRepository $imageRepository
     * @param PostRepository $postRepository
     * @param S3Service $s3Service
     */
    public function __construct(
        ImageRepository $imageRepository,
        PostRepository $postRepository,
        S3Service $s3Service
    ) {
        $this->image = $imageRepository;
        $this->postRepository = $postRepository;
        $this->s3Service = $s3Service;
    }

    /**
     * @param int|null $postId
     * @return Collection
     */
    public function fetchPostList(?int $postId = NULL): Collection
    {
        return $this->postRepository->fetchPostList($postId);
    }

    /**
     * @param array $attribute
     * @param UploadedFile $image
     * @return Post
     * @throws Exception
     */
    public function createPost(array $attribute, ?UploadedFile $image): Post
    {
        DB::beginTransaction();
        try {
            $post = $this->postRepository->create($attribute);
            if (!empty($image)) {
                $imagePath = $this->s3Service->uploadImage($image);
                $this->image->updateImage($post->id, $imagePath, Image::TYPE_POST);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
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
            if (isset($image)) {
                $imagePath = $this->s3Service->uploadImage($image);
                $this->image->updateImage($post->id, $imagePath, Image::TYPE_POST);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('error');
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