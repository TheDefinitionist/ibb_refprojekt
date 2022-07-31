<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premium extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', 'expiration_date', 'subscription_date', 'description'
    ];

    public $timestamps = false;
}
