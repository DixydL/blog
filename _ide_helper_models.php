<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Model{
/**
 * App\Model\PostCatalog
 *
 * @property int $post_id
 * @property int $catalog_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog whereCatalogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog whereUpdatedAt($value)
 */
	class PostCatalog extends \Eloquent {}
}

namespace App\Model{
/**
 * App\Model\Comment
 *
 * @property int $id
 * @property string $author
 * @property string|null $content
 * @property int $post_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereUpdatedAt($value)
 */
	class Comment extends \Eloquent {}
}

namespace App\Model{
/**
 * App\Model\Catalog
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Post[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereUpdatedAt($value)
 */
	class Catalog extends \Eloquent {}
}

namespace App\Model{
/**
 * App\Model\Post
 *
 * @property int $id
 * @property string $name
 * @property string|null $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $catalog_id
 * @property int|null $file_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Catalog[] $catalog
 * @property-read int|null $catalog_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read \App\Model\File|null $file
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereCatalogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereFileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereUpdatedAt($value)
 */
	class Post extends \Eloquent {}
}

namespace App\Model{
/**
 * App\Model\File
 *
 * @property int $id
 * @property string $path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File whereUpdatedAt($value)
 */
	class File extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read int|null $clients_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

