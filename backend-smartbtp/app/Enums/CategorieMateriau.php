<?php

namespace App\Enums;

enum CategorieMateriau :string
{
    case LIANTS = 'liants';
    case METAUX = 'metaux';
    case AGREGATS = 'agregats';
    case MACONNERIE = 'maconnerie';
    case FINITION='finition';
    case Autres='autres';
}
