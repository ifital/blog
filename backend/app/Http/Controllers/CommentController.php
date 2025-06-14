<?php
namespace App\Http\Controllers\Api\CommentController;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'author' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $comment = Comment::create($request->all());
        return response()->json($comment, 201);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json(['message' => 'Commentaire supprimé avec succès']);
    }
}
