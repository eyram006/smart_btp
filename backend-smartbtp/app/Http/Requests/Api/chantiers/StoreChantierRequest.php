<?php

namespace App\Http\Requests\Api\chantiers;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class StoreChantierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'name' => ['required', 'string', 'max:255'],

        'location' => ['required', 'string', 'max:255'],

        'surface' => ['nullable', 'numeric', 'min:0'],

        'start_date' => ['required', 'date'],

        'status' => [
            'required',
            Rule::in([
                'planning',
                'active',
                'paused',
                'done' ])],


        ];
    }
}
