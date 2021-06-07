<?php

namespace App\Listeners;

use App\Data\NovelCacheData;
use App\Events\NovelEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SymbolCountListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  NovelEvent  $event
     * @return void
     */
    public function handle(NovelEvent $event)
    {
        $symbolCount = 0;
        if ($event->novel->chapters()->exists()) {
            if ($event->novel->cycle) {
                foreach ($event->novel->chapters as $chapter) {
                    $symbolCount +=iconv_strlen($chapter->text);
                }
            }
        }

        $event->novel->cache = new NovelCacheData([
                'chaptersSymbolCounter' => $symbolCount,
                'chaptersCount' => $event->novel->chapters()->count()
            ]);

        $event->novel->save();
    }
}
