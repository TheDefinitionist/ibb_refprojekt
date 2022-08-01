<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premium extends Model
{
    use HasFactory;

    /*protected $fillable = [
        'status', 'expiration_date', 'subscription_date', 'description', 'accounts_id'
    ];

    public $timestamps = false;*/

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
