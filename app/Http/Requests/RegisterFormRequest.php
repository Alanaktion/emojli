<?php

namespace App\Http\Requests;

use Kozz\Components\Emoji\EmojiParser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $emoji = new EmojiParser();
        $emoji->setPrepend('^');
        $emoji->setAppend('$');
        return [
            'username' => [
                'required',
                'string',
                'unique:users',
                'regex:' . $emoji->getPattern(),
            ],
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ];
    }
}
