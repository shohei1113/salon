<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Resources\CommentResource;
use App\Services\CommentService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    private $commentService;

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
    public function store(Request $request)
    {
        $createComment = $this->commentService->createComment($request->all(), $this->user->id);
        return new CommentResource($createComment);
    }

    public function update(Request $request, int $id)
    {
        dd($request->all());
        $updateComment = $this->commentService->updateComment($id, $request->all());
        return new CommentResource($updateComment);
    }
}
