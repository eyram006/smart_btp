<?php

namespace App\Enums;

enum ChantierStatut: string
{
    case PLANNING = 'planning';
    case ACTIVE = 'active';
    case PAUSED = 'paused';
    case DONE = 'done';
}
