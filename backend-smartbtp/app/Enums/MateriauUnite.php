<?php

namespace App\Enums;

enum MateriauUnite: string
{
    case SAC = 'sac';
    case PIECE = 'piece';
    case TIGE = 'tige';
    case KG = 'kg';
    case TONNE = 'tonne';
    case M3 = 'm³';
    case M2 = 'm²';
    case ML = 'ml';
    case L  = 'litre';
    case CAMION = 'camion';

    case AUTRE = 'autre';
}
