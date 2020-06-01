<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\API\BaseController;
use App\Http\Requests\LoginRequest;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;

class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;

        $user->remember_token = $success['token'];
        $user->api_token = $success['token'];

        $user->save();


        $success['name'] = $user->name;
        $success['user_id'] = $user->id;
        $success['role'] = 5;
        $success['auth'] = 1;

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            $success['token'] = $user->createToken('MyApp')->accessToken;

            $user->remember_token = $success['token'];
            $user->api_token = $success['token'];
            $user->save();

            $success['name'] = $user->name;
            $success['user_id'] = $user->id;
            $success['role'] = 5;
            $success['auth'] = 1;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Пароль чи емейл введено некоректно'], 302);
        }
    }


    /**
     * Login through token
     *
     * @return \Illuminate\Http\Response
     */
    public function token(Request $request)
    {
        if ($user = User::where(['remember_token' => $request->token])->first()) {
            $success['token'] = $user->createToken('MyApp')->accessToken;

            $user->remember_token = $success['token'];
            $user->api_token = $success['token'];
            $user->save();

            $success['name'] = $user->name;
            $success['user_id'] = $user->id;
            $success['role'] = 5;
            $success['auth'] = 1;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
