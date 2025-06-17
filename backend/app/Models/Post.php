<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment; // 👈 utile si pas encore importé

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
