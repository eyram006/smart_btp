<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case OWNER = 'owner';
    case MANAGER = 'manager';
    case STOREKEEPER = 'storekeeper';
}
