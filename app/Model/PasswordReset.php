<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\PasswordReset
 *
 * @property int $id
 * @property string $email
 * @property int $secret
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset whereSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PasswordReset whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PasswordReset extends Model
{
    protected $table = "password_reset";

    protected $fillable = [
        'email', 'secret'
    ];
}
