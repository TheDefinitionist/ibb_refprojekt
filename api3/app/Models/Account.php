<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'username', 'password', 'email', 'token'
    ];
    
    public $timestamps = false;

    public function premium()
    {
        return $this->hasOne(Premium::class);
    }
}
