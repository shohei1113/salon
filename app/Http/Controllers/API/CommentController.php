<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Resources\CommentResource;
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
     * @return CommentResource
     */
    public function store(Request $request): CommentResource
    {
        $createComment = $this->commentService->createComment($request->all(), $this->user->id);
        return new CommentResource($createComment);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return CommentResource
     */
    public function update(Request $request, int $id): CommentResource
    {
        $updateComment = $this->commentService->updateComment($id, $request->all());
        return new CommentResource($updateComment);
    }

    /**
     * @param $id
     * @return CommentResource
     * @throws \Exception
     */
    public function destroy(int $id): CommentResource
    {
        $deleteComment = $this->commentService->deleteComment($id);
        return new CommentResource($deleteComment);
    }
}
