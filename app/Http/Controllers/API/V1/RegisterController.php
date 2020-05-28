<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\API\BaseController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = $request->validate(
            [
                'name'     => 'required',
                'email'    => 'required|email',
                'password' => 'required',
            ]
        );

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $success['token'] = $user->createToken('MyApp')->accessToken;

//        $user->remember_token = $success['token'];
//        $user->api_token = $success['token'];

        $user = User::create($input);
        $success['name'] = $user->name;
        $success['auth'] = 1;

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            $success['token'] = $user->createToken('MyApp')->accessToken;

            $user->remember_token = $success['token'];
            $user->api_token = $success['token'];
            $user->save();

            $success['name'] = $user->name;
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
            $success['auth'] = 1;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
