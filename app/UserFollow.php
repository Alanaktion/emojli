<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserFollow extends Pivot
{
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_id', 'followed_user_id', 'updated_at',
    ];
}
