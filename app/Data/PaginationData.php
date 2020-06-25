<?php

namespace App\Data;

use Spatie\DataTransferObject\DataTransferObject;

/**
 * @OA\Schema()
 * Class PaginationDto
 * @package App\Dto\Response
 */
class PaginationData extends DataTransferObject
{
    /**
     * @OA\Property(property="current_page")
     * @var int Номер текущей страницы
     */
    public int $current_page;

    /**
     * @OA\Property(property="data", @OA\Items())
     * @var array Даные
     */
    public array $data;

    /**
     * @OA\Property(property="first_page_url")
     * @var string|null ССылка на первую страницу
     */
    public ?string $first_page_url;

    /**
     * @OA\Property(property="from")
     * @var int|null От
     */
    public ?int $from;

    /**
     * @OA\Property(property="last_page")
     * @var int Номер последней страници
     */
    public int $last_page;

    /**
     * @OA\Property(property="last_page_url")
     * @var string Ссылка на последнюю страницу
     */
    public string $last_page_url;

    /**
     * /**
     * @OA\Property(property="next_page_url")
     * @var string|null Ссылка на следующую страницу
     */
    public ?string $next_page_url;

    /**
     * @OA\Property(property="path")
     * @var string Базовый путь
     */
    public string $path;

    /**
     * @OA\Property(property="per_page")
     * @var int Количество елементов на странице
     */
    public int $per_page;

    /**
     * @OA\Property(property="prev_page_url")
     * @var string|null ССылка на предидущею страницу
     */
    public ?string $prev_page_url;

    /**
     * @OA\Property(property="to")
     * @var int|null До
     */
    public ?int $to;

    /**
     * @OA\Property(property="total")
     * @var int Всего елементов
     */
    public int $total;
}
