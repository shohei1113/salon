<?php

namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseRequest extends FormRequest
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
     * @param Validator $validator
     */
    public function failedValidation(Validator $validator)
    {
        $response = [
            'message' => 'Validation Failed',
            'errors' => $validator->errors()->toArray(),
        ];
        throw new HttpResponseException(
            response()->json($response, 422)
        );
    }
}
