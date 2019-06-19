<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\Post;
use App\Http\Resources\BaseResource;
use App\Http\Resources\PostResource;
use App\Services\PostService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Stripe\Error\Base;

class PostController extends Controller
{
    private $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index(?int $salonId = NULL): BaseResource
    {
        $posts = $this->postService->fetchPostList($salonId);
        return new BaseResource(PostResource::collection($posts), config('const.post.index'));
    }

    public function store(Request $request): PostResource
    {
        $post = $this->postService->createPost($request->all());
        return new PostResource($post, config('const.post.store'));
    }

    public function update(Request $request, $id): PostResource
    {
        $post = $this->postService->updatePost($id, $request->all());
        return new PostResource($post, config('const.post.update'));
    }
}
