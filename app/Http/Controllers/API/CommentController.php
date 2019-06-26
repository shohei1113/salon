<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostSimpleResource;
use App\Services\CommentService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * Class CommentController
 * @package App\Http\Controllers\API
 */
class CommentController extends Controller
{
    /**
     * @var CommentService
     */
    private $commentService;

    /**
     * @var \App\Entities\User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    private $user;

    /**
     * CommentController constructor.
     * @param CommentService $commentService
     */
    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
        $this->user = Auth::user();
    }

    /**
     * @param Request $request
     * @return PostSimpleResource
     */
    public function store(Request $request): PostSimpleResource
    {
        $post = $this->commentService->createComment($request->all(), $this->user->id);
        return new PostSimpleResource($post, config('const.comment.store'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return PostSimpleResource
     */
    public function update(Request $request, int $id): PostSimpleResource
    {
        $post = $this->commentService->updateComment($id, $request->all());
        return new PostSimpleResource($post, config('const.comment.update'));
    }

    /**
     * @param int $id
     * @return PostSimpleResource
     * @throws \Exception
     */
    public function destroy(int $id): PostSimpleResource
    {
        $post = $this->commentService->deleteComment($id);
        return new PostSimpleResource($post, config('const.comment.delete'));
    }
}
