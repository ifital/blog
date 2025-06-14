<?php
namespace App\Models\Post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author',
        'image'
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
