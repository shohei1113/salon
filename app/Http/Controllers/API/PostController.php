<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\BaseResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostSimpleResource;
use App\Services\PostService;
use Illuminate\Http\Request;

/**
 * Class PostController
 * @package App\Http\Controllers\API
 */
class PostController extends Controller
{
    /**
     * @var PostService
     */
    private $postService;

    /**
     * PostController constructor.
     * @param PostService $postService
     */
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * @param int|null $salonId
     * @return BaseResource
     */
    public function index(?int $salonId = NULL): BaseResource
    {
        $postList = $this->postService->fetchPostList($salonId);
        return new BaseResource(PostResource::collection($postList), config('const.post.index'));
    }

    /**
     * @param Request $request
     * @return PostSimpleResource
     * @throws \Exception
     */
    public function store(Request $request): PostSimpleResource
    {
        $createPost = $this->postService->createPost($request->all(), $request->image);
        return new PostSimpleResource($createPost, config('const.post.store'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return PostSimpleResource
     * @throws \Exception
     */
    public function update(Request $request, int $id): PostSimpleResource
    {
        $updatePost = $this->postService->updatePost($id, $request->all(), $request->image);
        return new PostSimpleResource($updatePost, config('const.post.update'));
    }

    /**
     * @param int $id
     * @return PostSimpleResource
     */
    public function destroy(int $id): PostSimpleResource
    {
        $deletePost = $this->postService->deletePost($id);
        return new PostSimpleResource($deletePost, config('const.post.delete'));
    }
}
