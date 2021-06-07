<?php

namespace App\Console\Commands;

use App\Events\NovelEvent;
use App\Model\Post as ModelPost;
use Illuminate\Console\Command;
use Post;

class NovelCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'novel-cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $novels = ModelPost::all();

        foreach ($novels as $novel) {
            NovelEvent::dispatch($novel);
        };
    }
}
